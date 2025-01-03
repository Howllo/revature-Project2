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
                        echo "s3.bucket=${S3_BUCKET}" >> src/main/resources/application.properties
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
                    /usr/bin/docker build -t project2 . || { echo "Docker build failed"; exit 1; }
                    /usr/bin/docker images | grep project2 || { echo "Image not found after build"; exit 1; }
                '''
            }
        }

        stage('Upload File to S3'){
            steps {
                sh '''
                    cd project2-back

                    # Save and upload Docker image
                    docker save project2 > project2.tar
                    aws s3 cp project2.tar s3://${S3_DEPLOY_BUCKET}/temp/project2.tar
                  '''
            }
        }

        stage('Deploy to EC2 Docker') {
            steps {
                sh '''
                    # Capture the command ID
                    COMMAND_ID=$(aws ssm send-command \
                        --instance-ids "${INSTANCE_ID}" \
                        --document-name "AWS-RunShellScript" \
                        --output text \
                        --parameters '{"commands":[
                            "aws s3 cp s3://'${S3_DEPLOY_BUCKET}'/temp/project2.tar ./project2.tar",
                            "docker load < project2.tar",
                            "docker stop project2 || true",
                            "docker rm project2 || true",
                            "docker run -d -p 8080:8080 --name project2 project2"
                        ]}' \
                        --query "Command.CommandId")

                    # Wait for SSM command to complete
                    aws ssm wait command-executed --command-id "$COMMAND_ID" --instance-id "${INSTANCE_ID}"
                '''
            }
        }

        stage('Cleaning up the S3'){
            steps {
                sh '''
                    aws s3 rm s3://${S3_DEPLOY_BUCKET}/temp/project2.tar
                '''
            }
        }
    }

    post {
        always {
            cleanWs()

            sh '''
                docker system prune -af
                docker volume prune -f
                docker builder prune -af
            '''
        }
    }
}