import React from 'react';
import styled from 'styled-components';

const NoAddModal = ({ isAdd }) => {
    return (
        <ModalWrapper>
            <Modal>
                <div>
                    <p className="modal-txt">확인을 눌러주세요.</p>
                </div>
                <button onClick={isAdd} className="modal-check-btn">
                    확인
                </button>
            </Modal>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    width: 348px;
    background-color: #fff;
    padding: 30px 24px 24px;
    box-sizing: border-box;
    border-bottom: 3px solid #07f;
    .modal-check-btn {
        width: 50px;
        height: 32px;
        margin-top: 15px;
        float: right;
        font-size: 12px;
        color: #fff;
        background-color: #07f;
    }
`;

export default NoAddModal