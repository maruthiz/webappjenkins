pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub repository
                checkout scm
            }
        }
        
        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        // Unix commands
                        sh 'node -v || (curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs)'
                        sh 'node tests/test.js'
                    } else {
                        // Windows commands
                        bat 'node -v || powershell -Command "iwr https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi -OutFile node-setup.msi && msiexec /i node-setup.msi /quiet"'
                        bat 'node tests/test.js'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        // Unix commands
                        sh 'docker build -t simple-webapp:${BUILD_NUMBER} .'
                        sh 'docker tag simple-webapp:${BUILD_NUMBER} simple-webapp:latest'
                    } else {
                        // Windows commands
                        bat 'docker build -t simple-webapp:%BUILD_NUMBER% .'
                        bat 'docker tag simple-webapp:%BUILD_NUMBER% simple-webapp:latest'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        // Unix commands
                        sh 'docker stop simple-webapp-container || true'
                        sh 'docker rm simple-webapp-container || true'
                        sh 'docker run -d -p 8090:80 --name simple-webapp-container simple-webapp:latest'
                    } else {
                        // Windows commands
                        bat 'docker stop simple-webapp-container || (exit 0)'
                        bat 'docker rm simple-webapp-container || (exit 0)'
                        bat 'docker run -d -p 8090:80 --name simple-webapp-container simple-webapp:latest'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}