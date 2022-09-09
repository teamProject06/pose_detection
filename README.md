# FITBACK
tensorflow.js의 blazepose model을 활용하여 실시간 자세 감지로 운동 자세 교정과 운동루틴을 기록할 수 있는 웹페이지.


<br>

---------------------

<br>

## 프로젝트 계획의도
팬데믹 시대에 온라인으로 헬스 트레이닝 지도를 받을 수 있는 교정 웹 서비스가 있다면 유용할 것이라는 생각을 기반으로 개발하게 되었습니다. 

<br>
<br>

## 멤버

| Name   |  이승연 | 이나영 |  최유림                   |
| ------ | --------------------------- | -------------------------- | ---------------------------- |
| Github | https://github.com/seungyyy | https://github.com/lnalice | https://github.com/yuulee112 |

<br>
<br>

## 실행
### client
```
npm install
npm start
```
### server
```
nodemon app.js
```
--------------------------

<br>

## 주요 기능 <br>
  * 비회원 -  운동 자세 교정 이용 가능합니다.
  * 운동 루틴을 기록하고 실시간 루틴 업데이트, 회원 루틴도 볼 수 있습니다.
  * 운동 루틴 기록을 서버에서 가져와 캘린더로 볼 수 있고 루틴 개수에 따라 난이도를 측정하여 보여줍니다.
  

 <br>


## 배포환경
- ### URL : https://www.fitback.site
- ### 배포여부: O
- ### HTTPS 적용: O


<br>
<br>
<br>


# 프로젝트 명세

## 개발환경

### Front-end
* React
* Recoil
* Styled-components
* React-Router

### Back-end
* NodeJS
* Express
* MongoDB
* Mongoose


<br>
<br>

## 프로젝트 구성도

![workflow](https://user-images.githubusercontent.com/54584337/189062277-ad4ab347-c438-4a32-b6ff-e916f3616a6b.png)

<br>
<br>

## 구현한 방법과 이유에 대한 간략한 내용
## <승연님>

### 구현한 내용
* src/pages/MyCalendar.js
* src/pages/PoseCam.js
* src/pages/Feedback.js
* src/components/routine/AddRoutineItem.js
* src/components/routine/MyRoutine.js
* src/components/routine/EditRoutineItem.js
* src/components/routine/NoInputModal.js
* src/components/poseCam/PoseCamGuide.js
* src/pages/ErrPage.js


## tensorflow.js model을 사용하여 실시간으로 몸 전체의 키포인트 x,y 포지션 값을 이용하여 올바른 자세인지 측정 
- 메인페이지에서 운동을 선택을 하면 사용방법을 안내해주는 가이드 페이지로 이동합니다.
- 가이드 페이지에서 모델을 이용하여 관절 키포인트를 캔버스로 그려서 화면에 보이고 15초동안 운동하는 동작을 감지하여 계산합니다.
- 15초동안 0.02초마다 모델이 움직이면서 포지션 값을 이용하여 필요한 각도를 계산하고 상체 움직임 등을 운동마다 필요한 값을 계산하여 배열에 저장하고 최종 값은 로컬 스토리지에 저장합니다.


## 자세를 측정한 데이터를 이용하여 피드백 화면에서 보여주기
- 로컬에 저장한 데이터를 이용하여 피드백 결과를 보여주게 됩니다.
- 피드백 페이지에서 15초동안 운동한 영상을 화면에서 같이 볼 수 있고 운동을 올바르게 했는지 알려주고 회원일 경우 피드백을 저장할 수 있습니다.
<br>
<br>

<div>
  <img width="1440" alt="웹페이지이미지" src="https://user-images.githubusercontent.com/54584337/189289628-642c77fe-4535-4c03-b4c4-1d3be4f641e4.png">
   - 자세교정페이지
</div>


<br>
<br>


<div>
<img width="1440" alt="웹페이지이미지" src="https://user-images.githubusercontent.com/54584337/189289923-3ef81f03-eaf5-4596-9791-c4d93a7c6f33.png">
  - 루틴캘린더페이지
</div>

<br>
<br>
<br>

## 개발 중 어려웠던 점 && 해결
  <br>

- 1. 텐서플로우 모델을 사용해서 15초동안만의 데이터를 가져와서 계산하여 결과값을 넘겨줘야하는데 상태변화가 일어나면 값이 원치않게 바뀌게 되어서 텐서플로우를 사용하는 페이지 자체에서 상태가 변화하는 것이 없도록 하면서 값을 계산하고 저장한다는 것이 어려웠습니다. <br>
  * 1. 해결
  상태가 바뀌지 않으면서 하기 위해서 settimeout, setinteval을 순서에 맞게 사용하여 해결하였고, 데이터를 저장하여 다음 페이지에서 사용하기 위해 로컬에 저장할 수 있도록 하여 해결하였습니다. 상태변화와 자바스크립트의 동기적인 처리 방식에 대해서 더 알 수 있게 되었습니다.

- 2. 비디오 녹화 데이터의 값이 처음에만 값이 들어오고 그 다음부터는 계속 값이 들어오지 않는 문제가 있었습니다.
  * 2. 해결
  가이드 페이지에서 로더를 상태변화를 사용하여 보여주는데 텐서플로우 모델을 사용하는 페이지에서 배열을 만들어서 사용하니 처음에만 값이 들어오고 그 다음은 값이 들어오지 않아서 상위인 app.js에서 비디오 녹화를 담을 배열을 props로 보내서 값이 변화되어도 데이터가 제대로 들어올 수 있도록 하여 해결하였습니다.

- 3. 운동 루틴 정보를 가공해서 캘린더로 보여주는 부분에서 데이터가 제대로 보여지지 않아서 어려움이 있었지만 서버에서 가져온 데이터를 함수로 보내서 데이터의 갯수만큼 for문을 돌려, 캘린더에 맞는 데이터로 가공하여 해결하였습니다. <br>
<br>
