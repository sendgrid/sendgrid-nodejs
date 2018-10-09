# Introduction

This is an example project for using a Docker container as a webhook receiver.

# Prerequisites

* [Docker CE 18](https://www.docker.com/get-started)
* SendGrid Account with inbound parse enabled to send form data (default)
* Ngrok or Internet accessible URL

# Usage

* `cd <project>`
* Build the container: `docker-compose build`
* Run the container: `docker-compose up`
* Build & Run the container: `docker-compose build && docker-compose up`

At the moment, the `app.js` only prints data to the console.  You can extend this project by adding more business logic to the `/parse_webhook` route.

# A note on processing events
 
This project uses the [express-formidable](https://github.com/utatti/express-formidable) middleware to process the form data sent by SendGrid's Inbound Parse Webhook.  

The events are available in the `/parse_webhook` route in the `req.fields` object.  The [app.js](app.js) contains logging statements for the elements that are available to you.  It may be useful to review the [example-webhook-payload.txt](example-webhook-payload.txt) for what the form data looks like when extending this application.

Attachments: `express-formidable` automatically decodes and stores the images to the `/tmp` directory in the container.  This is configurable by passing a configuration object to the middleware:

```js
app.use(formidable({
  encoding: 'utf-8',
  uploadDir: '/my/dir',
  multiples: true, // req.files to be arrays of files
});
```

Additionally, the [docker-compose](docker-compose.yml) has a volume mapping commented out if you'd prefer to store them in persistent storage outside of the container.

# Deploy to Kubernetes

* In order for Kubernetes to use the container described in this project, the container must be built and stored in a container registry.  You can choose to use a private registry in your cloud provider or a public registry (e.g., Docker Hub).  You can also run a development environment of Kubernetes via [Docker for Mac or Windows](https://www.docker.com/get-started)
* In this project, the [Kubernetes (k8s) manifest](k8s/inbound-parse.yml) uses the `imagePullPolicy: IfNotPresent` to pull from a local registry on the dev machine running Kubernetes as part of Docker.  If you were deploying to Google Cloud, for example, you should disable that option.
* `kubectl` is used to deploy.  You should already have a working `kubectl context`.  From the root of the project execute: `kubectl apply -f k8s/inbound-parse.yml`

# Resources

* [Kubernetes Developer Docs](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Install Kubernetes UI in Docker for Windows/Mac](https://www.ntweekly.com/2018/05/25/deploy-kubernetes-web-ui-dashboard-docker-windows/)
* [Deploy and Expose Apps in Kubernetes](https://www.ntweekly.com/2018/06/10/deploy-expose-applications-kubernetes-docker-windows/)
* [Download Docker](https://www.docker.com/get-started)


# License

See [LICENSE](LICENSE)

