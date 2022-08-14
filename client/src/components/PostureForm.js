import React from 'react'
import styled from 'styled-components';

const PostureForm = () => {

  return (
    <Block>
        <p className='font'>교정 자세 선택</p>
        <div className="d-flex gap-5 justify-content-center">
            <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-4000px">
                <li><a className="dropdown-item rounded-2" href="/#">스쿼트</a></li>
                <li><a className="dropdown-item rounded-2" href="/#">플랭크</a></li>
                <li><a className="dropdown-item rounded-2" href="/#">브릿지</a></li>
            </ul>
        </div>
    </Block>
  );
}

const Block = styled.div`
  .font{
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 20px;
    margin-bottom: 20px;
  }
`


export default PostureForm;
