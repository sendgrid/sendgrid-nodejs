This docker image helps you test out your changes quickly.

### First clone the repo
```sh
$ git clone git@github.com:sendgrid/sendgrid-nodejs.git
```

### Inside the repo create an example file
```sh
$ touch example.js
```
Copy the desired code into `example.js`. For this example, I'm assuming you create this file in the root of this project

Change the path to the Sendgrid library to the reletive path, for example: `./packages/mail/mail`.

Change the `baseUrl` to `http://localhost:4010/` as that's where prism is running.
Here's an example how to do that
```javascript
const client = require('./packages/client');
client.setDefaultRequest('baseUrl', 'http://localhost:4010/');
```

### run docker images
```sh
# cd into the repo directory and run
$ docker run --rm -it -v $PWD:/mnt/source sendgrid-node.js:latest
```

This will give you a bash terminal where node.js is installed and prism is running on the background at `http://localhost:4010/`


## execute example
```sh
$ node example.js
```
If you want to change the code in `example.js` you can change it on the host, it will be reflected inside the container.
