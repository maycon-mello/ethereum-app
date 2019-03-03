const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Contracts = require('./compile-contracts');

const LotteryContract = Contracts[':Lottery'];

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  process.env.TRUFFLE_PROVIDER_URL,
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(JSON.parse(LotteryContract.interface));
  const deployTransaction = contract.deploy({ data: '0x' + LotteryContract.bytecode });
  const estimatedGas = await deployTransaction.estimateGas({
    from: accounts[0],
  });

  const result = await deployTransaction.send({
    gas: estimatedGas,
    from: accounts[0] 
  });

  console.log('Contract deployed to', result.options.address);
};

// Deployed contracts
// 0x7E595fb17e36F8c8B4CBD3e12215596d1142A224
// 0x5C98Fb7e6ba54c0184C1Bc253a17bF3010df9689

deploy();