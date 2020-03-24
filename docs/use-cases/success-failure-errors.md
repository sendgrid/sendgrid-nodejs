# Handling Success/Failure/Errors

The `send` and `sendMultiple` methods return a `Promise`, so you can handle success and capture errors:

```js
sgMail
  .send(msg)
  .then(() => {
    //Celebrate
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  });
```

Alternatively, pass a callback function as the last parameter:

```js
sgMail
  .send(msg, (error, result) => {
    if (error) {
      //Do something with the error
    }
    else {
      //Celebrate
    }
  });
```
