This guide relates to changes implemented in  [PR 1058](https://github.com/sendgrid/sendgrid-nodejs/pull/1058).

The [request](https://github.com/request/request#deprecated) HTTP client was deprecated as of Feb 11th 2020. We have updated this helper library with the [axios](https://www.npmjs.com/package/axios) HTTP client.

In version 6.X.X, our `ClientRequest` and `ClientResponse` types exposed the raw interfaces from the `request` module directly. In version 7.X.X, the [`ClientRequest`](../../packages/helpers/classes/request.d.ts) and [`ClientResponse`](../../packages/helpers/classes/response.d.ts) objects untethers from a specific HTTP client implementation. We have maintained the core request and response interfaces exposed in test cases and usage examples, but mask everything else. 

If you are passing in request options, outside of what’s documented, to the HTTP request client, this may be a breaking change for you. Please check the [`RequestOptions` interface](../../packages/helpers/classes/request.d.ts) to inspect the updated options. If you rely on HTTP response data [previously available](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/HEAD/types/request/index.d.ts#L319), this may also be a breaking change for you. Please see the [`ClientResponse`](../../packages/helpers/classes/response.d.ts) object for details about what data is now exposed.

## Action steps:

1. Locate any areas in your code that utilizes request and response properties that are no longer exposed in the new interfaces.
1. Update the response values to use the new [`Response`](../../packages/helpers/classes/response.d.ts) object.
1. Update the request values to use the new options exposed in the [`RequestOptions`](../../packages/helpers/classes/request.d.ts) object.
