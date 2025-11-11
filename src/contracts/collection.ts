import { Address, Cell, Contract, ContractProvider } from '@ton/core';

export class Collection implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
  }

  static createFromAddress(address: Address) {
    return new Collection(address);
  }

  async getMap(provider: ContractProvider): Promise<Cell> {
    const result = await provider.get('get_map', []);
    return result.stack.readCell();
  }
}
