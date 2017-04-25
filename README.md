## Synopsis

Express middleware that adds sendStatusJson helper method to the Express's response object.

## Quick start

Start with running `npm install send-status-json --save` for your app. Then, set it as a middleware to express app:

```js
import * as express from 'express';
import { sendStatusJsonMiddleware } from 'send-status-json';

const app = express();

app.use(sendStatusJsonMiddleware());

```

Then you can use it to return simple response with status envelope.

```js

app.get('/path/to/api', (req, res) => {
    res.sendStatusJson(200, {
        payload: {
            your: 'data'
        },
        customPropsToEnvelope: 'custom'
    })
});

```

And this will result to json response (also with http status code 200)

```json
{
    "status": 200,
    "statusText": "Ok",
    "payload": {
        "your": "data"
    },
    "customPropsToEnvelope": "custom"
}
```

And without added custom properties

```js
app.get('/path/to/api', (req, res) => {
    res.sendStatusJson(401);
});

```

You will get simple json response

```json
{
    "status": 401,
    "statusText": "Unauthorized"
}
```

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)