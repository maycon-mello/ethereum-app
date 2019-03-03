import axios from 'axios';
import Contract from "../model/Contract";

class ContractService {
  static instance: ContractService;

  createContract(contract: Contract):Promise<Contract> {
    return axios.post(`/contract`, contract).then((res: any) => res.data);
  }

  removeContract(contractId: string):Promise<any> {
    return axios.delete(`/contract/${contractId}`).then((res: any) => res.data);
  }

  async findContracts(): Promise<Array<Contract>> {
    const { data } = await axios.get(`/contract`);
    return data.filter((item: Contract) => !!item.user);
  }

  getById(id: string): Promise<Contract> {
    return axios.get(`/contract/${id}`).then((res: any) => res.data);
  }

  updateContract(id: string, contract: Contract): Promise<Contract> {
    return axios.put(`/contract/${id}`, contract).then((res: any) => res.data);
  }

  static getInstance(): ContractService {
    if (!ContractService.instance)  {
      ContractService.instance = new ContractService();
    }

    return ContractService.instance;
  }

}

export default ContractService;
