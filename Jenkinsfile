
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Check Project Files') {
            steps {
                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js
                    echo "All project files are present"
                '''
            }
        }

        stage('Validate JavaScript') {
            steps {
                sh 'node --check script.js'
            }
        }

        stage('Build Verification') {
            steps {
                sh '''
                    grep -q "My Calculator" index.html
                    echo "Calculator project validation passed"
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Calculator CI pipeline passed!'
        }
        failure {
            echo 'FAILURE: Please check the Console Output.'
        }
    }
}
