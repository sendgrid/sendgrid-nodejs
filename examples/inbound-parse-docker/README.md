# Introduction

This is an example project for using a Docker container as a [SendGrid](https://sendgrid.com) [inbound parse email](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/) webhooks.

# Prerequisites

* [Docker CE 18](https://www.docker.com/get-started)
* (Optional for development) A local Kubernetes installation
* SendGrid Account with inbound parse enabled to send form data (default)
    * [Setup Inbound Parse Webhook](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/)
* [Ngrok](https://ngrok.com/) or Internet accessible URL

# Usage Locally (aka for Development)

* `mkdir <project>`
* `cd <project>`
* `git clone https://github.com/sendgrid/sendgrid-nodejs.git`
* `cp -R sendgrid-nodejs/examples/inbound-parse-docker/* .`
* `rm -rf sendgrid-nodejs/`
* Build the container: `docker-compose build`
* Run the container: `docker-compose up`
* (Optional to save your self both commands above) Build & Run the container: `docker-compose build && docker-compose up`
* Run ngrok: `ngrok http 3000`
* Create an entry in the [Settings > Inbound Parse](https://app.sendgrid.com/settings/parse) with the ngrok URL.  Use the `https` ngrok entry.
* Send an email to your inbound parse email address.

NOTE: ngrok has a "replay" feature so you don't have to keep sending emails to yourself.  You can access that when ngrok is running at [http://127.0.0.1:4040/inspect/http](http://127.0.0.1:4040/inspect/http)

# Run nodejs server locally

* `cd examples/inbound-parse-docker/`
* `npm install`
* `npm run start:server`

* The node server will start running on localhost:3000

# Modifying the application

At the moment, the `app.js` only prints data to the console.  You can extend this project by adding more business logic to the `/parse_webhook` route.

## A note on processing events
 
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

# Deployment to Kubernetes

* In order for Kubernetes to use the container described in this project, the container must be built and stored in a container registry.  You can choose to use a private registry in your cloud provider or a public registry (e.g., Docker Hub).  You can also run a development environment of Kubernetes via [Docker for Mac or Windows](https://www.docker.com/get-started)
* In this project, the [Kubernetes (k8s) manifest](k8s/inbound-parse.yml) uses the `imagePullPolicy: IfNotPresent` to pull from a local registry on the dev machine running Kubernetes as part of Docker.  If you were deploying to Google Cloud, for example, you should disable that option.
* `kubectl` is used to deploy.  You should already have a working `kubectl context`.  From the root of the project execute: `kubectl apply -f k8s/inbound-parse.yaml`

# Deployment to minikube

```
   minikube start

   kubectl apply -f k8s/namespace.yaml

   kubectl apply -f k8s/inbound-parse.yaml

   kubectl apply -f k8s/inbound-parse-svc.yaml

```

  * check the deployment

```
  kubectl get pod -n inbound-parse -o wide

  NAME                                        READY     STATUS             RESTARTS   AGE       IP           NODE
  inbound-parse-deployment-765956bc6b-kbpx4   0/1       ImagePullBackOff   0          35s       172.17.0.3   minikube
  inbound-parse-deployment-765956bc6b-zvstc   0/1       ImagePullBackOff   0          35s       172.17.0.2   minikube

```  
* check the service
 
 ```
  kubectl get svc -n inbound service

```  

# Resources

* [Kubernetes Developer Docs](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Install Kubernetes UI in Docker for Windows/Mac](https://www.ntweekly.com/2018/05/25/deploy-kubernetes-web-ui-dashboard-docker-windows/)
* [Deploy and Expose Apps in Kubernetes](https://www.ntweekly.com/2018/06/10/deploy-expose-applications-kubernetes-docker-windows/)
* [Download Docker](https://www.docker.com/get-started)


# License

See [LICENSE](LICENSE)

