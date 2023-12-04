import React from 'react';
import { Modal } from 'antd';
import './thanks.css';
const NoItems = (props) => {
    const isModalOpen = props.status;
    return (
        <Modal open={isModalOpen} footer={null} closable={false} width={620} centered={true} className='loading'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p className='words'>Your cart has no items.</p>
                <img src='./images/loading.gif' width={100} height={100} alt='loading' />
                <p className='words'>We are directing you to home page</p>
            </div>
        </Modal>
    );
};
export default NoItems;