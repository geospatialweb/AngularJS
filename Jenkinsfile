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
      environment {
        CI = 'true'
      }
      steps {
        sh './jenkins/scripts/deploy.sh'
      }
    }
  }
}