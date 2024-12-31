pipeline {
    agent any

    environment {
        DB_URL = credentials('DB_URL')
        DB_USERNAME = credentials('DB_USERNAME')
        DB_PASSWORD = credentials('DB_PASSWORD')
        HCAPTCHA = credentials('HCAPTCHA')
        JWT_SECRET = credentials('JWT_SECRET')
    }

    stages {
        stage('Change to Backend Directory') {
            steps {
                sh 'cd project2-back'
            }
        }

        stage('Inject Application Properties') {
            steps {
                sh """
                        echo "spring.datasource.url=${DB_URL}" >> src/main/resources/application.properties
                        echo "spring.datasource.username=${DB_USERNAME}" >> src/main/resources/application.properties
                        echo "spring.datasource.password=${DB_PASSWORD}" >> src/main/resources/application.properties
                        echo "hcaptcha.secret=${HCAPTCHA}" >> src/main/resources/application.properties
                        echo "jwt.secret=${JWT_SECRET}" >> src/main/resources/application.properties
                    """
            }
        }

        stage('Build Jar'){
            steps {
                sh '''
                    cd project2-back
                    mvn clean install'
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    cd project2-back
                    docker build -t project2 .
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    cd project2-back

                    # Save the docker image to a tar file
                    docker save project2 > project2.tar

                    # Use a temp directory in S3
                    aws s3 cp project2.tar s3://project2-deployments-bucket--use2-az1--x-s3/temp/project2.tar

                    aws ssm send-command \
                        --instance-ids "{your-instance-id}" \
                        --document-name "AWS-RunShellScript" \
                        --parameters commands=[\
                            "aws s3 cp s3://project2-deployments-bucket--use2-az1--x-s3/temp/project2.tar .",\
                            "docker load < project2.tar",\
                            "docker stop project2 || true",\
                            "docker rm project2 || true",\
                            "docker run -d -p 8080:8080 --name project2 project2",\
                            "rm project2.tar"\
                        ]

                    # Clean up both locally and in S3
                    rm project2.tar
                    aws s3 rm s3://project2-deployments-bucket--use2-az1--x-s3/temp/project2.tar
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