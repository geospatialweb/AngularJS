pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        dir(path: '/var/jenkins_home/jobs/test_1')
        sh 'docker-compose up'
      }
    }
  }
}