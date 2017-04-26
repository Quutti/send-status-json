## Synopsis

Express middleware that adds sendStatusJson helper method to the Express's response object.

## Quick start

Start with running `npm install send-status-json --save` for your app. Then, register it as a middleware to express app:

```js
import * as express from 'express';
import { sendStatusJsonMiddleware } from 'send-status-json';

const app = express();

app.use(sendStatusJsonMiddleware());

```

Then you can use it to return simple response. First parameter is status code and second is an object with wanted custom properties. Properties passed in second parameter are assigned to the root of response.

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

Response above result to the json response like this. Status code of http response is also set.

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

Usage without custom properties is simple.

```js
app.get('/path/to/api', (req, res) => {
    res.sendStatusJson(401);
});

```

```json
{
    "status": 401,
    "statusText": "Unauthorized"
}
```

If you are using TypeScript, you can extend Express Response interface with your own and set types for sendStatusJson method.

```javascript
import * as express from 'express';
import { SendStatusJsonFunction } from 'send-status-json';

interface Response extends express.Response { 
    sendStatusJson: SendStatusJsonFunction;
}
```


## Build

Run `npm run build` to compile typescript files to javascript es5. Builded content will be inserted in ./dist folder.

## Tests

Run `npm test` to run tests in mocha.

## License

MIT.