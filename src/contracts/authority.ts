import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode, toNano } from '@ton/core';
import { generateItemContent } from '../utils/helpers';
import { ItemContent } from '../utils/types';

export class Authority implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
  }

  static createFromAddress(address: Address) {
    return new Authority(address);
  }

  async sendDeployItem(provider: ContractProvider, via: Sender, ownerAddress: Address, content: ItemContent) {
    await provider.internal(via, {
      value: toNano('1.1'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0x5c57d048, 32)
        .storeUint(0, 64)
        .storeAddress(ownerAddress)
        .storeRef(generateItemContent(content))
        .endCell(),
    });
  }

  async sendUpgradeItem(provider: ContractProvider, via: Sender, content: ItemContent) {
    await provider.internal(via, {
      value: toNano('0.1'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(0x242cc4be, 32)
        .storeUint(0, 64)
        .storeRef(generateItemContent(content))
        .endCell(),
    })
  }

  async getLatestVersion(provider: ContractProvider): Promise<{ address: Address, countriesCount: number } | null> {
    const result = await provider.get('get_latest_version', []);
    const collectionData = result.stack.readCellOpt();
    if (collectionData) {
      const collectionDataSlice = collectionData.beginParse();
      return {
        address: collectionDataSlice.loadAddress(),
        countriesCount: collectionDataSlice.loadUint(10),
      };
    }
    return null;
  }

  async getNftIndexByOwnerAddress(provider: ContractProvider, owner: Address): Promise<bigint> {
    const result = await provider.get('get_nft_index_by_owner_address', [{ type: 'slice', cell: beginCell().storeAddress(owner).endCell() }]);
    return result.stack.readBigNumber();
  }

  async getItemPrice(provider: ContractProvider): Promise<bigint> {
    const result = await provider.get('get_item_price', []);
    return result.stack.readBigNumber();
  }

  async getItemAddressByOwnerAddress(provider: ContractProvider, ownerAddress: Address): Promise<Address> {
    const result = await provider.get('get_item_address_by_owner_address', [{ type: 'slice', cell: beginCell().storeAddress(ownerAddress).endCell() }]);
    return result.stack.readAddress();
  }
}
