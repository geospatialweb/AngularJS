pipeline {
  agent {
    docker {
      image 'node:carbon-alpine'
      args '-p 3000:3000'
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