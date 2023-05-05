import { Button, Input, Modal } from 'antd';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address } from 'ton-core';

export const GiftButton = () => {
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

  const navigate = useNavigate();
  const goToEditor = useCallback(() => navigate(`/${address}`), [navigate, address]);

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