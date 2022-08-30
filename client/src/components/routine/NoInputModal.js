import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const NoInputModal = ({ isAdd }) => {
    return (
        <ModalWrapper onClick={isAdd}>
            <Modal>
                <div>
                    <p className="modal-txt">동작을 입력해주세요.</p>
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
    height: 100%;
    display: flex;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
    width: 100%;
    position: relative;
    max-width: 348px;
    height: 130px;
    padding: 30px 24px 24px;
    box-sizing: border-box;
    font-weight: 400;
    border-radius: 6px;
    top: 25%;
    background-color: ${theme.colors.grey};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .modal-check-btn {
        position: absolute;
        bottom: 1em;
        right: 1em;
        font-size: 16px;
        color: ${theme.colors.pointColor};
    }
    .modal-txt {
        text-align: left;
    }
`;

export default NoInputModal