import { expect } from 'chai';
import Contract from 'web3/eth/contract';
import Contracts from './contracts.json';
const web3 = global.web3;
const LotteryContract = Contracts[':Lottery'];

let lottery: Contract;
let accounts: string[];

describe('Lottery Contract', () => {
  
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    lottery = await new web3.eth.Contract(JSON.parse(LotteryContract.interface))
      .deploy({ data: LotteryContract.bytecode, arguments: [] })
      .send({ from: accounts[0], gas: '1000000' });
  });

  it('expect to compile', () => { 
    expect(LotteryContract.interface).to.exist;
  });

  it('expect to deploy contract', () => { 
    expect(lottery.options.address).to.exist;
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
  
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    expect(accounts[0]).to.be.equal(players[0]);
    expect(players.length).to.be.equal(1);
  });

  it('expect to allow multiple accounts to enter', async () => {
    for (let i = 0; i < 3; i++) {
      await lottery.methods.enter().send({
        from: accounts[i],
        value: web3.utils.toWei('0.02', 'ether')
      });
    }

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    players.forEach((player: string, idx: number) => {
      expect(player).to.be.equal(accounts[idx]);
    });

    expect(players).to.have.lengthOf(3);
  });


  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      expect(false);
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      expect(false);
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('sends money to the winner and resets the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance: number = parseFloat(await web3.eth.getBalance(accounts[0]));
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance: number = parseFloat(await web3.eth.getBalance(accounts[0]));
    const difference: number = finalBalance - initialBalance;

    expect(difference > parseFloat(web3.utils.toWei('1.8', 'ether'))).to.be.true;
  });
});