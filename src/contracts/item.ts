import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode, toNano } from 'ton-core';
import { generateItemContent } from '../utils/helpers';
import { ItemContent } from '../utils/types';


export class Item implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
  }

  static createFromAddress(address: Address) {
    return new Item(address);
  }

  async sendEditContent(provider: ContractProvider, via: Sender, content: ItemContent) {
    await provider.internal(via, {
      value: toNano('0.1'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0x1a0b9d51, 32)
        .storeUint(0, 64)
        .storeRef(generateItemContent(content))
        .endCell(),
    });
  }

  async getNftData(provider: ContractProvider): Promise<[boolean, bigint, Address, Address, Cell]> {
    const result = await provider.get('get_nft_data', []);
    return [result.stack.readBoolean(), result.stack.readBigNumber(), result.stack.readAddress(), result.stack.readAddress(), result.stack.readCell()];
  }
}
