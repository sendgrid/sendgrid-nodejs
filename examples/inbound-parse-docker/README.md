# Introduction

This is an example project for using a Docker container as a webhook receiver.

# Prerequisites

* Docker CE 18
* SendGrid Account with inbound parse enabled to send form data (default)
* Ngrok or Internet accessible URL

# Usage

* `cd <project>`
* `docker-compose build && docker-compose up`

At the moment, the `app.js` only prints data to the console.  You can extend this project by adding more business logic to the `/parse_webhook` route.

# Deploy to Kubernetes

* The container must be built and stored in a container registry.  In this example, the Kubernetes (k8s) manifest uses the `imagePullPolicy: IfNotPresent` to pull from a local registry on the dev machine running docker-for-desktop.
* Once your k8s installation is running, from the root of the project execute: `kubectl apply -f k8s/inbound-parse.yml`

# License

See [LICENSE](LICENSE)

