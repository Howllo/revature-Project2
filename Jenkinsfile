pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')
        DB_USERNAME = credentials('DB_USERNAME')
        DB_PASSWORD = credentials('DB_PASSWORD')
        HCAPTCHA = credentials('HCAPTCHA')
        JWT_SECRET = credentials('JWT_SECRET')
        INSTANCE_ID = credentials('INSTANCE_ID')
        S3_DEPLOY_BUCKET = credentials('S3_DEPLOY_BUCKET')
        S3_BUCKET = credentials('S3_BUCKET')
    }

    stages {
        stage('Inject Application Properties') {
            steps {
                dir('project2-back'){
                    sh """
                        echo "spring.datasource.url=${DB_URL}" >> src/main/resources/application.properties
                        echo "spring.datasource.username=${DB_USERNAME}" >> src/main/resources/application.properties
                        echo "spring.datasource.password=${DB_PASSWORD}" >> src/main/resources/application.properties
                        echo "hcaptcha.secret=${HCAPTCHA}" >> src/main/resources/application.properties
                        echo "jwt.secret=${JWT_SECRET}" >> src/main/resources/application.properties
                        echo "s3.bucket${S3_BUCKET}" >> src/main/resources/application.properties
                    """
                }
            }
        }

        stage('Build Jar'){
            steps {
                sh '''
                    cd project2-back
                    /opt/maven/bin/mvn clean install
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    cd project2-back
                    /usr/bin/docker build -t project2 .
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    cd project2-back

                    # Save the docker image to a tar file
                    /usr/bin/docker save project2 > project2.tar

                    # Use a temp directory in S3
                    aws s3 cp project2.tar s3://${S3_DEPLOY_BUCKET}/temp/project2.tar

                    aws ssm send-command \
                        --instance-ids "${INSTANCE_ID}" \
                        --document-name "AWS-RunShellScript" \
                        --parameters '{"commands": [
                            "aws s3 cp s3://${S3_DEPLOY_BUCKET}/temp/project2.tar .",
                            "/usr/bin/docker load < project2.tar",
                            "/usr/bin/docker stop project2 || true",
                            "/usr/bin/docker rm project2 || true",
                            "/usr/bin/docker run -d -p 8080:8080 --name project2 project2",
                            "rm project2.tar"
                        ]}'

                    # Clean up both locally and in S3
                    rm project2.tar
                    aws s3 rm s3://${S3_DEPLOY_BUCKET}/temp/project2.tar
                '''
            }
        }
    }

     post {
        always {
            cleanWs()
        }
     }
}
