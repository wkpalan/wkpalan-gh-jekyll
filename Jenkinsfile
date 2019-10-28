pipeline {
    agent { label 'master'}
    stages {
        stage('Build') {
            steps {
                echo 'Building the site'
                sh '''
                    make site
                    ls -lh site/
                '''
                echo 'Site successfully built'
            }
        }
    
    stage('Post') {
            steps {
                echo 'Copying the site files'
                sh '''
                    make publish
                '''
                echo 'Website Updated'
            }
        }
    }
}