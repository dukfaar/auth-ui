pipeline {
    environment {
        mountTarget = "/static_www"
        baseDir = "${mountTarget}/auth"
    }
    agent {
        docker {
            image 'node:8-alpine'
            args "-v static_www:${mountTarget}"
        }
    }
    stages {
        stage('Install') {
            sh 'npm install'
        }

        /*
        stage('Test') {
            sh 'npm run test'
        }
        */

        stage('Build') {
            sh 'npm run build'
            sh 'ls ./bundle'
        }

        stage('Copy to www_dir') {
            steps {
                sh "mkdir ${baseDir}"
                sh "cp static/index.html ${baseDir}/index.html"
                sh "cp bundle/* ${baseDir}/"
                sh "ls ${baseDir}"
            }
        }
    }
}