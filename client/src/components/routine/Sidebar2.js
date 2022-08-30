import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $ from 'jquery';
import { theme } from '../../theme'
import UserRoutine from "./UserRoutine";
import MyRoutineSide from "./MyRoutineSide";

const Sidebar2 = () => {

    let count = 0;
    let count2 = 0;
    useEffect(()=>{
        if(count2%2==count%2){
            $('')
        }
    },[count2])
    // Open/Close menu event
    const menuButton = () => {
        count = count + 1
        // if ($(".pannel").length) {
            // var speed =  $('.panel').attr('data-df-animation-speed');
                // offset = pannel.attr('data-df-offset');

            // var width = $(".hide").width(); 
            // var minus = '-' + width;
            
            if (count%2 == 0) $('.panel').animate({ left: '-500px' }, '100'); //<<
            else $('.panel').animate({ left: '0' }, '100'); //>>
            //Rotate arrow
            // $('#icon-arrow').toggleClass('open');
        // }
    }
    const menuButton2 = () => {
        count2 = count2 + 1
            if (count2%2 == 0) $('.panel2').animate({ left: '-500px' }, '100'); //<<
            else $('.panel2').animate({ left: '0' }, '100'); //>>

    }

    return (<>
        <Container>
        <div class="panel">
                    <Userhide class = "hide">
                    <UserRoutine/>
                    </Userhide>
                    <div class="menu-button" style = {{"backgroundColor" : `${theme.colors.green}`}} onClick={menuButton}>
                        <a href="#">Other Routine</a>
                    </div>
                </div>
            {/* <div class="panel2">
                    <Myhide class = "hide">
                    <MyRoutineSide/>
                    </Myhide>
                    <div class="menu-button" onClick={menuButton2}>
                        <a href="#">My Routine </a>
                    </div>
                </div> */}
                
                        {/* <TmpButton/> */}
                
            </Container>
    </>
    );
};

/*__________________________________________________________________________ */

const Userhide = styled.div`
    float : left;
    margin : 0;
    background-color:  ${theme.colors.green};
    height: 50%;
    width: 500px;
    padding : 20px;
    border-radius: 0 0 20px 0;
    `

const Myhide = styled.div`
    float : left;
    margin : 0;
    /* margin-top: 210px; */
    background-color:  ${theme.colors.pointColor};
    height: 50%;
    width: 500px;
    padding : 20px;
    border-radius: 0 0 20px 0;
    `

const Container = styled.section`
    /* height:100vh; */
    /* display: flex;  */
    /* flex-direction: column; */
    /* justify-content: center; */
    
    .panel {
        position: absolute;
        display: inline-block;
        /* float : left; */
    	left: -500px;
    }
    
    .panel2 {
        position: absolute;
        display: inline-block;
        /* pointer-events: none;  */
        /* float : left; */
    	left: -500px;
    }
    .menu-button{
        width:70px;
        height:200px;
        float:left;
        /* background: linear-gradient(0deg, ${theme.colors.grey} 0%, #e22232 100%); */
        background-color: ${theme.colors.grey};
        position:relative;
        cursor:pointer;
        border-radius: 0 10px 50px 0;
}
.menu-button a{
  display:block;
  position: absolute;
  top: 40%;
  left: auto;
  color: #fff;
  font-size:14px;
  font-weight:600;
	text-decoration: none;
    /* -ms-transform: rotate(-90deg); */
    /* -webkit-transform: rotate(-90deg);  */
  transform: rotate(-90deg);
}
`

export default Sidebar2;

// useEffect(() => {
//     try{
//         if($( ".panel" ).length){
//           //Rotate arrow 
//           //Rotate arrow
//                 // Select button
//                 $("ul.models li a").click(function (e) {
//                     e.preventDefault();
//                     $("ul.models li a.active").removeClass("active");
//                     $(this).addClass("active");
//                 });
//           // Select button
//           $("ul.models li a").click(function ( e ) {
//             e.preventDefault();
//             $("ul.models li a.active").removeClass("active");  
//             $(this).addClass("active"); 
//           });
//         }}catch(e){console.log(e);}
// }, [])