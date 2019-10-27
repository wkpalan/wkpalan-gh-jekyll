pipeline {
    agent Master
    stages {
        stage('Build') {
            steps {
                sh '''
                    rsync -auv --no-owner --no-group --no-times * /var/www/blunderingbioinformatics.org/html/
                '''
            }
        }
    
    stage('Post') {
            steps {
                echo 'Website Updated'
            }
        }
    }
}