# express-boilerplate

Minimal express.js server to get things started.

Includes:

- Middleware and `Error` class based error responses.
- Zod parser middleware.
- Request/ response context.

## Running

```bash
npm i
npm run build
npm run start
```

Use the following to test the example endpoint.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"bar": "bar"}' "http://localhost:3000/baz?foo=foo"
```

## Development

```bash
npm run dev
```

## TODO

- [ ] Linting and formatting.
- [ ] Docker image.
- [ ] Tests.
- [ ] Make it a template?
