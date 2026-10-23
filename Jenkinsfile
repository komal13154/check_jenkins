
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/komal13154/cal-ci-cd.git'
            }
        }

        stage('Verify Files') {
            steps {
                sh '''
                    test -f index.html
                    test -f script.js
                    test -f style.css
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                    sudo install -m 644 index.html /var/www/html/index.html
                    sudo install -m 644 script.js /var/www/html/script.js
                    sudo install -m 644 style.css /var/www/html/style.css
                '''
            }
        }

        stage('Verify Website') {
            steps {
                sh 'curl -f http://localhost/'
            }
        }
    }

    post {
        success {
            echo 'Calculator deployed successfully!'
        }
        failure {
            echo 'Deployment failed. Check Console Output.'
        }
    }
}
