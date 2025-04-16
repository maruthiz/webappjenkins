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
                // Install Node.js if not already available
                sh 'node -v || (curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs)'
                
                // Run the test
                sh 'node tests/test.js'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t simple-webapp:${BUILD_NUMBER} .'
                sh 'docker tag simple-webapp:${BUILD_NUMBER} simple-webapp:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                // Stop any existing container
                sh 'docker stop simple-webapp-container || true'
                sh 'docker rm simple-webapp-container || true'
                
                // Run the new container
                sh 'docker run -d -p 8080:80 --name simple-webapp-container simple-webapp:latest'
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