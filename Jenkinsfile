pipeline {
  agent {
    docker {
      image 'node:carbon-alpine'
      args '-p 80:80'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
  }
}