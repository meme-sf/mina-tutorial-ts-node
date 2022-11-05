# Mina zkApp: 01 Hello World

Mina zkApp sample that works with ts-node

Just run

```
yarn ts-node src/main.ts
```

## Deployment

- Add `"type": "module"` in package.json
- Change `"module": "CommonJS"` to `"module": "ESNext"`
- Setup a wallet(follow the [guide](https://docs.minaprotocol.com/zkapps/tutorials/deploying-to-a-network))

```
yarn run build
yarn node build/src/deploy.js tomo-test
```

## License

[Apache-2.0](LICENSE)
