import Client = require("@sendgrid/client");

// Test setApiKey() method
Client.setApiKey("MY_SENDGRID_API_KEY");

// Test setDefaultHeader() method
Client.setDefaultHeader("X-Testing", "yes")
      .setDefaultHeader("X-Testing-Type", "TypeScript");

// Test setDefaultRequest() method
Client.setDefaultRequest("method", "POST");
Client.setDefaultRequest("method", "POST")
      .setDefaultRequest("url", "/test");

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
