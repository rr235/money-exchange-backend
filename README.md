# Money Exchange Server Backend

# To run Project

1. Checkout repository
2. Make a copy of `.env-sample` and rename it to `.env`. Set correct value for `OPEN_EXCHANGE_API_KEY=your-api-key`.
3. Install dependencies

```
yarn install
```

4. Run server

```
yarn start:dev
```

> NOTE: You can set the desired polling rate by setting `FETCH_INTERVAL` in the `.env` file. The open exchange api only allows 1000 request for the basic account.
