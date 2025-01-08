# Running Project 2


## Step One Jenkins
The ability to interact with the overall system requires injection into the through several 

```
dir('project2-back'){
    sh """
        echo "" >> src/main/resources/application.properties
        echo "spring.datasource.url=${DB_URL}" >> src/main/resources/application.properties
        echo "spring.datasource.username=${DB_USERNAME}" >> src/main/resources/application.properties
        echo "spring.datasource.password=${DB_PASSWORD}" >> src/main/resources/application.properties
        echo "hcaptcha.secret=${HCAPTCHA}" >> src/main/resources/application.properties
        echo "jwt.secret=${JWT_SECRET}" >> src/main/resources/application.properties
        echo "s3.bucket=${S3_BUCKET}" >> src/main/resources/application.properties
    """
}
```

You will need to create Jenkins credentials for each of these injection sources. The captcha source isn't needed 
since the system doesn't actually verify the captcha state, but you can find HCAPTCHA at: https://www.hcaptcha.com/.

When it comes to the interaction between Jenkins and Docker, this system uses SSM as a middleman:
```
sh '''
    # Capture the command ID
    COMMAND_ID=$(aws ssm send-command \
        --instance-ids "${INSTANCE_ID}" \
        --document-name "AWS-RunShellScript" \
        --output text \
        --parameters '{"commands":[
            "sudo rm -f /usr/bin/project2.tar || true",
            "sudo rm -f ./project2.tar || true",
            "docker image prune -a -f || true",
            "docker stop project2 || true",
            "docker rm -f project2 || true",
            "docker rmi project2:latest || true",
            "aws s3 cp s3://'${S3_DEPLOY_BUCKET}'/temp/project2.tar ./project2.tar",
            "docker load < project2.tar",
            "docker run -d -p 8080:8080 --name project2 project2"
        ]}' \
        --query "Command.CommandId")

    # Wait for SSM command to complete
    aws ssm wait command-executed --command-id "$COMMAND_ID" --instance-id "${INSTANCE_ID}"
'''
```

This command involves multiple components. It requires an S3 deployment bucket and the instance ID of the Docker EC2.

One missing credential is the S3_DEPLOY_BUCKET, which needs to be set to point to the correct bucket.

### With Jenkins, make sure you do not change the file location of anything. It should remain a Mono Repo.

## IAM Roles

This system relies heavily on AWS IAM roles. You must provide the exact roles that the system requires.

### The Roles

The roles within AWS uses:
- AmazonEC2FullAccess
- AmazonS3FullAccess
- AmazonSSMFullAccess
- CloudWatchLogsFullAccess
- Technically also AmplifyBackendDeployFullAccess, but that is unused.

### EC2 Set up

Jenkins is set up on its own EC2 instance, and Docker is set up on a separate EC2 instance. I have found that Jenkins 
consumes a significant amount of storage and processing power, so it must be hosted on its own system. The version of 
Jenkins I am using is not containerized. Each instance is configured with an IAM role that allows interaction between 
the systems. Once the Docker EC2 instance is set up, you will need to copy its instance ID and add it as a Jenkins 
credential.

After both Jenkins and Docker are set up, all you need to do is run the build pipeline, and it will create the images
and containers for you.

## Backend Setup

When you first use the application, everything will be set up for https://api.devature.dev. This is our primary domain 
since I prefer shorter URLs. I will not go into the specifics of setting up a custom domain; AWS provides documentation
for that process.

All you need to do is grab the URL provided by Amazon as an endpoint and set it up.

In order to upload large files with a NGINX system you might need to do something like this:
```
client_max_body_size 200M;
```
in the config of NGINX.

If you use a custom domain with Cloudflare as the host, you need to and NGINX setup is if you want to do custom domain:
```
server {
    listen 80;
    listen 443 ssl;
    server_name api.devature.dev;

    # SSL configuration
    ssl_certificate /etc/nginx/ssl/cloudflare.crt;
    ssl_certificate_key /etc/nginx/ssl/cloudflare.key;

    # SSL parameters
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS settings
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # File Upload Size
    client_max_body_size 200M;

    location / {
        # Removed CORS headers to prevent duplication

        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

So in frontend you would need to do:


```javascript
// axios.js
import axios from "axios";
import Cookies from "js-cookie";

export const projectApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL  || 'https://api.devature.dev/api/v1',
    withCredentials: true,
});

// To

export const projectApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL  || 'https://ec2-{your-ip}.us-east-2.compute.amazonaws.com/api/v1',
    withCredentials: true,
});
```

### Docker
You will also need set up a Docker EC2 instance on it own EC2. While Spring Boot backend is lightweight it is usually 
best to keep it to its own instance. You will need take this instance and set the 

## Frontend Setup

Frontend is just hosted on Amplify. It will literally tell you exactly what to do.

SecurityConfig.java
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "https://devature.dev",
            "https://www.devature.dev",
            "https://master.d26tmtgdit1rgx.amplifyapp.com"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

// To 

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "https://master.{your-amplify}.amplifyapp.com"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

AWS will provide all the necessary steps for this, and then give you the Amplify link.

##