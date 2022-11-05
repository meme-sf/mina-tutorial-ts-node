import { Square } from './Square';
import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'snarkyjs';

(async function main() {
  await isReady;
  console.log('SnarkyJS loaded');
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  // eslint-disable-next-line no-unused-vars
  const deployerAccount = Local.testAccounts[0].privateKey;

  // The public key is our address and where we will deploy to
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();

  const contract = new Square(zkAppAddress);
  const deployTxn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    contract.deploy({ zkappKey: zkAppPrivateKey });
    contract.init();
    contract.sign(zkAppPrivateKey);
  });
  await deployTxn.send().wait();
  const num0 = contract.num.get();
  console.log(' after init', num0.toString());
  console.log('Shutting down');
  await shutdown();
})();
