import { Button, Input, Modal } from 'antd';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Address } from '@ton/core';
import { SetOwnerAddressFn } from '../Home';

export const GiftButton = (props: { setOwnerAddress: SetOwnerAddressFn }) => {
  const [address, setAddress] = useState('');

  const isValidAddress = useMemo(() => {
    try {
      return !!Address.parse(address);
    } catch (e) {
      return false;
    }
  }, [address]);
  const onChangeAddress = useCallback((event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value), []);

  const [modalIsOpened, setModalIsOpened] = useState(false);
  const openModal = useCallback(() => setModalIsOpened(true), []);
  const closeModal = useCallback(() => setModalIsOpened(false), []);

  const goToEditor = useCallback(() => address ? props.setOwnerAddress(Address.parse(address)) : null, [props, address]);

  return <>
    <Modal centered open={modalIsOpened} onCancel={closeModal} onOk={goToEditor} okButtonProps={{ disabled: !isValidAddress }}>
      <Input
        status={!address ? 'warning' : (!isValidAddress ? 'error' : '')}
        className={'destination'}
        size={'small'}
        placeholder="Paste address here"
        value={address}
        onChange={onChangeAddress}
      />
    </Modal>
    <Button block type={'primary'} onClick={openModal}>Mint NFT as a gift for friend</Button>
  </>
}