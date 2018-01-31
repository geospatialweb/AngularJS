pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        dir(path: '/var/jenkins_home/workspace/devops/src')
        sh 'docker-compose up'
      }
    }
  }
}