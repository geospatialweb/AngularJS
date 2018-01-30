pipeline {
  agent {
    dockerfile {
      filename 'docker-compose.yml'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker-compose up'
      }
    }
  }
}