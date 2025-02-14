pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker-compose run jenkins npm run test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d jenkins'
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito!'
        }
        failure {
            echo 'Pipeline falló!'
        }
    }
}