pipeline {
  agent {
    docker {
      image 'node:carbon-alpine'
      args '-p 8000:8000'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Deploy') {
      environment {
        CI = 'true'
      }
      steps {
        sh 'npm start &'
      }
    }
  }
}