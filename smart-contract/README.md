# Mina zkApp: Smart contract for MINA Universe

This template uses TypeScript.

## How to build

1. Install or update the zkApp CLI

```
  npm install -g zkapp-cli

```
2.Configure your zkApp.
```sh
  zk config
```

```sh
  npm run build
```

## How to run tests

```sh
  npm run test
  npm run testw # watch mode
```

## How to run coverage

```sh
  npm run coverage
```

## deploy smart contract 
```sh
  npm run deploy-sc-main
```
List test accounts for the Merkle Tree. No use these in production!
```sh
  private key; :>> EKFF8DqaDvJ61dcofJcv2NqzY6D3BLtYFjq4aW47fkaY12R3Be6j
  public key :>> B62qiVmjkRqnFoQEBRtBs7jsFQq43f4FkPtNFvt3VM7xmtU7oxgox5R

  private key; :>> EKDyusGx1qjdcqWCHwhStxsR9mgER2wL1Q2Z8cTt45NKGGai5kvH
  public key :>> B62qro7UZZAGFdKEHvgLSrcGh8FQejDwJiw1N5jKkGQpqfocu8dMt9z

  private key; :>> EKEPGBhNhCk625HK5JcxWqB2xhCMKCypKYfDnfvJhdtLiFaiVmKP
  public key :>> B62qp5mEnmEfaKhxKi8FcbcmXc6wjFzpQLnHJsDpytxi66R6YRmMVEc

  private key; :>> EKEBXbgjmCL9JakzqU27GM2gugRaE5rQs2uJegFT5Lh7eL4kqeoe
  public key :>> B62qoWswa1b4Fr6iiT9XfpT6kEH5fgCkPRfZhCwkdspN3WvEfZ362Qi

  private key; :>> EKEP7T4fGsLa2EFu35Po9yiGwhLctj4pmC8ZGArp3VdCLbavnJeN
  public key :>> B62qp1pkE3xP6cMhj2MG5pT32yLHDv6S9CqwCwuQSFjGY6jkbph8qUV
```
### set root of Merkle tree
```sh
npm run set-root
```

### Check membership in smart contract
```sh
npm run get-membership
```


## License

[Apache-2.0](LICENSE)




 

 