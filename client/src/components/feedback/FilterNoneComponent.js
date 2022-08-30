import React from 'react'
import { theme } from '../../theme';
import styled from 'styled-components';

const FilterNoneComponent = ({result}) => {
  return (
    <Container>
      <div className='flex'>
        <div className='left-box'>
          <div className="checkbox">
                    <input id="checkbox-3"  type="checkbox" />
                    <label htmlFor="checkbox-3">
                        <img src={'/img/cross.png'} />
                    </label>
            </div>
        </div>
          <div className='rigth-box'>
            <p className='nofeedback-title'>측정불가</p>
              <p className='part-feedback'>{result === 'none' ? '움직임이 느껴지지 않아 측정이 되지 않았습니다. 운동을 다시 해주세요' : '카메라에 전신이 나오지 않았습니다. 전신이 나오도록 카메라 서주신 다음 다시 운동을 해주세요.'}</p>
          </div>
            </div>
    </Container>
  )
}

const Container = styled.div`
  ${theme.common.feedbackBoxStyle}
  ${theme.common.feedbackBoxInnerStyle}
  .rigth-box {
        .nofeedback-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .part-feedback {
        letter-spacing: -1.5px;
        font-size : 14px;
        line-height: 1.3;
    }
  }
`;

export default FilterNoneComponent