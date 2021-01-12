import Client = require("@sendgrid/client");
import * as https from 'https';

// Test setApiKey() method
Client.setApiKey("MY_SENDGRID_API_KEY");

// Test setDefaultHeader() method
Client.setDefaultHeader({
  "X-Testing-Type": "TypeScript",
}).setDefaultHeader("X-Testing", "yes");

// Test setDefaultRequest() method
Client.setDefaultRequest({
  url: "/test",
}).setDefaultRequest("method", "POST")
  .setDefaultRequest('httpsAgent', new https.Agent())

// Test createHeaders() method
Client.createHeaders({
  "X-Testing": "yes"
});

// Test createRequest() method
const req = Client.createRequest({
  url: "/test"
});

// Test request() method
Client.request({
  url: "/test"
}).then(res => {
  res[0].statusCode;
});
