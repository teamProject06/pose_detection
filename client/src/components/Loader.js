import React from 'react';
import { Triangle } from 'react-loader-spinner';
import styled from 'styled-components';

const Loader = () => {
    return (
        <LoaderComponent>
            <Triangle
            height="130"
            width="130"
            color="#2c2c2c"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
            {/* <Label>{message}</Label> */}
        </LoaderComponent>
    );
}

const LoaderComponent = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background: #ffffffb7;
`;

 const Label = styled.p`
`

export default Loader;