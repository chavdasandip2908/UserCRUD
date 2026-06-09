pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t my-node-app .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop my-node-container
                docker rm my-node-container
                exit 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                docker run -d ^
                --name my-node-container ^
                -p 3001:3001 ^
                my-node-app
                '''
            }
        }
    }
}
