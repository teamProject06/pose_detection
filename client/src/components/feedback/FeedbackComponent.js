import React from 'react';


const FeedbackComponent = () => {
    const resultData = JSON.parse(window.localStorage.getItem("bodyData")) 
    console.log(resultData)

  return (
    <div>FeedbackComponent</div>
  )
}

export default FeedbackComponent