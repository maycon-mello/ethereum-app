/// <reference path="../../config/types/store.d.ts" />

/* istanbul ignore file */
import Router from '../modules/RouterModule';
import ExchangeRates from '../modules/ExchangeRatesModule';
import ContractList from '../modules/ContractListModule';
import LayoutModule from '../modules/LayoutModule';
import AddContract from '../modules/AddContractModule';
import EditContract from '../modules/EditContractModule';
import Message from '../modules/MessageModule';
import Web3 from '../modules/Web3Module';

export default {
  modules: {
    router: new Router(),
    exchangeRates: new ExchangeRates(),
    contractList: new ContractList(),
    layout: new LayoutModule(),
    addContract: new AddContract(),
    editContract: new EditContract(),
    message: new Message(),
    web3: new Web3(),
  },
};
