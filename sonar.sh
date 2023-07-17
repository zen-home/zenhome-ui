# Description: SonarQube scanner
echo "Getting ready to start SonarQube scanner..."

# Start docker
echo "Starting Docker..."
open -a Docker

# Start SonarQube
echo "Starting SonarQube..."
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest

# Start SonarQube scanner
echo "Starting SonarQube scanner..."
docker run \
    --rm \
    --network="host" \
    -e SONAR_HOST_URL="http://localhost:9000" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=zenhome" \
    -e SONAR_TOKEN="sqp_ac952255ecacaf5b1b8184e2a58d2b817e1174eb" \
    -v ".:/usr/src" \
    sonarsource/sonar-scanner-cli
