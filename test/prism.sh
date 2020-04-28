#!/bin/bash
set -eu

install() {
  echo "Installing Prism..."

  UNAME=$(uname)
  ARCH=$(uname -m)
  if [ "$UNAME" != "Linux" ] && [ "$UNAME" != "Darwin" ] && [ "$ARCH" != "x86_64" ] && [ "$ARCH" != "i686" ]; then
    echo "Sorry, OS/Architecture not supported: ${UNAME}/${ARCH}. Download binary from https://github.com/stoplightio/prism/releases"
    exit 1
  fi

  if [ "$UNAME" = "Darwin" ]; then
    OSX_ARCH=$(uname -m)
    if [ "${OSX_ARCH}" = "x86_64" ]; then
      PLATFORM="darwin_amd64"
    fi
  elif [ "$UNAME" = "Linux" ]; then
    LINUX_ARCH=$(uname -m)
    if [ "${LINUX_ARCH}" = "i686" ]; then
      PLATFORM="linux_386"
    elif [ "${LINUX_ARCH}" = "x86_64" ]; then
      PLATFORM="linux_amd64"
    fi
  fi

  mkdir -p prism/bin
  URL="https://github.com/stoplightio/prism/releases/download/v0.6.21/prism_$PLATFORM"
  DEST=prism/bin/prism

  curl -L $URL -o $DEST
  chmod +x $DEST
}

run() {
  echo "Running prism..."
  prism/bin/prism run --mock --list --spec https://raw.githubusercontent.com/sendgrid/sendgrid-oai/master/oai_stoplight.json
}

if [ -f prism/bin/prism ]; then
  echo "Prism is already installed."
  run
else
  echo "Prism is not installed."
  install
  run
fi
