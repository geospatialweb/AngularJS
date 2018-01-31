pipeline {
  agent {
    docker {
      image 'node:carbon-alpine'
      args '-p 8000:8000'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
    stage('deploy') {
      steps {
        sh 'npm start'
      }
    }
  }
}