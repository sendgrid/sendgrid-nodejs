# Introduction

This is an example project for using a Docker container as a webhook receiver.

# Prerequisites

* Docker CE 18
* SendGrid Account with inbound parse enabled
* Ngrok or Internet accessible URL

# Usage

* `cd <project>`
* `docker-compose build && docker-compose up`

At the moment, the `app.js` only prints data to the console.  You can extend this project by adding more business logic to the `/parse_webhook` route.

# License

See [LICENSE](LICENSE)

