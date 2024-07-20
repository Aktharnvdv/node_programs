pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build('my-node-app')
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image('my-node-app').inside {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Add your deployment steps here
                    echo 'Deploying application...'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}
