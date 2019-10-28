pipeline {
    agent { label 'master'}
    stages {
        stage('Build') {
            steps {
                echo 'Building the site'
                sh '''
                    make site
                    ls -lh
                '''
                echo 'Site successfully built'
            }
        }
    
    stage('Post') {
            steps {
                echo 'Copying the site files'
                sh '''
                    rsync -auv --no-owner --no-group --no-times * /var/www/blunderingbioinformatics.org/html/
                '''
                echo 'Website Updated'
            }
        }
    }
}