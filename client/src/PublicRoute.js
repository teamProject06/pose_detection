import React, { useState, useEffect } from 'react';
import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PublicRoute = ({ element: Element, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    // 헤더 버튼을 변경하기 위한 useState
    const [view, setView] = useState({
       SignIn: false
   });


   // home 화면으로 가기
   useEffect(() => {
       if (cookies.userInfo === undefined) {
         setView({
           SignIn: false
         })
     }else{
       setView({
           SignIn: true
       }) 
       }

   }, [cookies]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return view.SignIn ? <Navigate to="/" /> : <Navigate to="/home" />;
      }}
    />
  );
};

export default PublicRoute;
