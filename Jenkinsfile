pipeline {
  agent {
    docker {
      image 'node:carbon-alpine'
      args '-p 80:80'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Deploy') {
      steps {
        sh 'npm start &'
      }
    }
  }
  environment {
    CI = 'true'
  }
}