# Start SonarQube scanner
echo "Starting SonarQube scanner..."
docker run \
    --rm \
    --network="host" \
    -e SONAR_HOST_URL="http://localhost:2348" \
    -v ".:/usr/src" \
    sonarsource/sonar-scanner-cli
