pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        dir(path: '/var/jenkins_home/workspace/devops_6_master-E54A4XY6LZJMKJ3HPFVEEKYHYGHYYBJA5YML4LO5SWKJ5AYZALYA')
        sh 'docker-compose up'
      }
    }
  }
}