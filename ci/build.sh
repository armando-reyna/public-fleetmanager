#!/bin/bash
set -o errexit
set -o nounset

RAMA=`git branch -a| grep \* | cut -d ' ' -f2`;

echo "Rama->${RAMA}";

if [[ "${RAMA}" == *"HEAD"* ]] || [[ "${RAMA}" == *"detached"* ]]; then
  RAMA=${TRAVIS_BRANCH}
fi

echo "Current branch is: ${RAMA}";

if [ "${RAMA}" = "qc" ]; then
  BRANCH=qc
  DOMAIN=airsoftware.solutions
  DIRECTORY=/var/www/vhosts/airsoftware-qc.com/checklist.airsoftware-qc.com/
elif [ "${RAMA}" = "prod" ]; then
  BRANCH=prod
  DOMAIN=flotasirel.com.mx
  DIRECTORY=/var/www/vhosts/flotasirel.com.mx/httpdocs/
elif [ "${RAMA}" = "climatic-prod" ]; then
  BRANCH=climatic-prod
  DOMAIN=autosclimatic.com.mx
  DIRECTORY=/var/www/vhosts/autosclimatic.com.mx/httpdocs/
elif [ "${RAMA}" = "effekt-prod" ]; then
  BRANCH=effekt-prod
  DOMAIN=vehiculoseffekt.com.mx
  DIRECTORY=/var/www/vhosts/vehiculoseffekt.com.mx/httpdocs/
fi

echo "$BRANCH env detected: $DOMAIN";
echo $BRANCH > branch
echo $DOMAIN > domain

build_api(){
    echo "Fetching changes..."
	git pull;
    grunt build;
    scp -i "deploy_rsa" -r dist/* root@"$DOMAIN":"$DIRECTORY"
}

build_api

exit $?
