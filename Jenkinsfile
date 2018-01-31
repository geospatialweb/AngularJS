node {
  stage 'Checkout'
    checkout scm

  stage 'Build'
    dir(path: '/var/jenkins_home/jobs/test_1')
    sh 'docker-compose up'
}
