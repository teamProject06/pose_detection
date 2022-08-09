import React from 'react'
import styled from 'styled-components';


const Headerb = styled.div`

.boxtool{
width: 100%;
height: 7%;
display: inline-flex;
padding: 10px 20px;
margin-top:1%;
margin-left: 1%;
border-radius: 0px 0px 30px 30px;
align-items: center;
position: fixed;
}
`

const Logo = styled.div`
justify-content: center;
width: 80px;
height: 80px;
padding: 1%;
`

const Menuli = styled.div`
text-align: center;
font-size: 16px;
margin-right: 2%;
`

const Box = styled.div`
visibility: hidden;
width: 80%;
`
const Header = () => {
    return(
        <header>
            <Headerb>
                <div className='boxtool'>
                    <Logo>
                        <img src="https://cdn-icons-png.flaticon.com/512/2840/2840214.png" alt="임시 로고" />
                    </Logo>
                    <Box/>
                    <Menuli>LOGIN</Menuli>
                    <Menuli>SIGNUP</Menuli>
                </div>
            </Headerb>
        </header>
    )
}

export default Header;
