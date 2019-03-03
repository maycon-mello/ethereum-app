import { expect } from 'chai';
import ContractService from './ContractService';
import Contract from '../model/Contract';
import axiosMock from '../core/axiosMock';

const contracts: Array<Contract> = [{
    id: '1',
    user: {
      name: 'Maycon',
      surname: 'Tester',
    },
    config: {},
  }, {
    id: '2',
    user: {
      name: 'Maycon 2',
      surname: 'Tester',
    },
    config: {},
  },
];

const invalidContracts = [{
  id: 'some-invalid-data',
  user: undefined,
}];


axiosMock.onGet('/contract').reply(200, [
  ...contracts,
  ...invalidContracts,
]);

axiosMock.onPost('/contract').reply(200, contracts[0]);
axiosMock.onDelete(/\/contract\/\d+/).reply(200, contracts[0]);
axiosMock.onPut(/\/contract\/\d+/).reply(200, contracts[0]);

describe('Services', () => {
  describe('ContractService', () => {
    let service: ContractService;

    beforeEach(() => {
      service = ContractService.getInstance();
    });

    it('expect to create service instance', () => {
      expect(service).to.exist;
    });

    it('expect to get contract list', async () => {
      const data = await service.findContracts();
      expect(data.length).to.equal(contracts.length);
    });

    it('expect to create contract', async () => {
      const data = await service.createContract(contracts[0]);
      expect(data).to.deep.equal(contracts[0]);
    });

    it('expect to update contract', async () => {
      const data = await service.updateContract("1", contracts[0]);
      expect(data).to.deep.equal(contracts[0]);
    });

    it('expect to remove contract', async () => {
      const data = await service.removeContract("1");
      expect(data).to.deep.equal(contracts[0]);
    });
  });
});