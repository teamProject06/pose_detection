import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from '../../theme'


const Sidebar = () => {
    useEffect(()=>{

    },[])
    return (
        <>
            <Container>
                <BookLabel onClick={()=>{
                    Hide.toggleClass('show');
                    this.toggleClass('active');
                }}/>
                <BookLabel2 />
            </Container>
            <Hide>
                <nav>
                    <ul>
                        <li><a href="#">Link One</a></li>
                        <li><a href="#">Link Two</a></li>
                        <li><a href="#">Link Three</a></li>
                        <li><a href="#">Link Four</a></li>
                    </ul>
                </nav>
            </Hide>
        </>
    );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;

const BookLabel = styled.div`
  background-color:  ${theme.colors.grey};
  width: 2.8rem;
  height: 30vh;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 100;
  cursor : pointer;
  transition : all .6s ease-in-out;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  
  .active{
    left : 345px;
    transition: all 600ms ease-in-out;
    background-color: ${theme.colors.grey};
  }
  
  `;

const BookLabel2 = styled.div`
background-color: ${theme.colors.grey};
width: 2.8rem;
height: 32vh;
margin-top: -2.5em;
border-radius: 20px 0 0 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

/*______________________________________________________________ */

const Hide = styled.div`
  width: 345px;
  left: -345px;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0px;
  transition: all .6s ease-in-out;
  
  nav{
      ul{
          li{
              height: 70px;
              list-style-type: none;
        text-align: center;
        line-height: 70px;
        transition: all .5s ease;
        
        &:hover{
            background-color: $red;
            transition: all .5s ease;
        }
        
        a{
            padding: 30px 25px;
            text-decoration: none;
            color: $white;
            font-weight: 800;
            
        }
    }/*end of li*/
}/*end of ul*/
}/*end of nav*/
/*end of menu-hide*/
.show{
    left: 0px;
    background-color: rgba(255,255,255,0.2);
    transition: all .6s ease-in-out;
}
`

export default Sidebar;