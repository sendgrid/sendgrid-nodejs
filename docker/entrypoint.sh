#! /bin/bash

# check for + link mounted libraries:
if [ -d /mnt/source ]
then
  rm -rf /root/source
  ln -s /mnt/source
  echo "Linked mounted sendgrid-nodejs's code to /root/source"

  cd /root/source
  # install deps
  yarn
  ./node_modules/.bin/lerna bootstrap
fi

echo "Welcome to sendgrid-nodejs docker"
echo

if [ "$1" != "--no-mock" ]
then
  echo "Starting Prism in mock mode. Calls made to Prism will not actually send emails."
  echo "Disable this by running this container with --no-mock."
  prism run --mock --spec $OAI_SPEC_URL 2> /dev/null &
else
  echo "Starting Prism in live (--no-mock) mode. Calls made to Prism will send emails."
  prism run --spec $OAI_SPEC_URL 2> /dev/null  &
fi
echo "To use Prism, make API calls to localhost:4010."
echo

bash
