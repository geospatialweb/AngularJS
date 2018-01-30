pipeline {
  agent { dockerfile true }
  stages {
    stage('Build') {
      steps {
        sh 'docker-compose up'
      }
    }
  }
}