pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        dir(path: '/var/jenkins_home/jobs/test_1')
        git(url: 'git clone https://github.com/geospatialweb/devops.git', branch: 'master')
        sh 'docker-compose up'
      }
    }
  }
}