pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        dir(path: '/usr/src/app') {
          sh 'docker-compose up'
        }
        
      }
    }
  }
}