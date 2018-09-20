pipeline {
    environment {
        mountTarget = "/static_www"
        baseDir = "/static_www/auth"
    }
    agent {
        docker {
            image 'node:8-alpine'
            args "-v static_www:/static_www"
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        /*
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        */

        stage('Build Relay') {
            steps {
                sh 'npm run relay'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'ls ./bundle'
            }
        }

        stage('Copy to www_dir') {
            steps {
                sh "mkdir -p ${baseDir}"
                sh "cp static/index.html ${baseDir}/index.html"
                sh "cp -R bundle/* ${baseDir}/"
                sh "ls ${baseDir}"
            }
        }
    }
}