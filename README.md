# FITBACK
tensorflow.js의 blazepose model을 활용하여 실시간 자세 감지로 운동 자세 교정과 운동루틴을 기록할 수 있는 웹페이지.

---------------------

## 프로젝트 계획의도
팬데믹 시대에 온라인으로 헬스 트레이닝 지도를 받을 수 있는 교정 웹 서비스가 있다면 유용할 것이라는 생각을 기반으로 개발하게 되었습니다. 


--------------------
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



# 구현한 기능, gif img 넣기
# 어려웠던 점 해결방안 적기



## Description

원티드 프리온보딩 코스에서 프로젝트로 **충청북도 휴앙림 중 마음에 드는 곳을 저장하는 서비스** 모바일 웹페이지를 개발하였습니다.
이 페이지는 시작화면, 전체 데이터 목록 조회 화면으로 있으며, 데이터 목록 조회 시 api가 호출되고 목록은 무한 스크롤로 조회됩니다. 유저가 휴양림 목록 중에 선택하여 메모를 남기고 저장하면 첫 화면에 저장한 장소 리스트가 나오게 됩니다. 

* 주요 기능 <br>
  * 휴양림 데이터 조회는 한번에 10개씩 무한 스크롤로 조회
  * 유저는 이름, 주소, 메모 중 하나를 선택해 검색 가능
  * 유저가 휴양림을 저장할 때 메모를 반드시 작성
  * 데이터 저장 브라우저 로컬 스토리지에 저장
  * 저장된 정보 중 하나를 선택해 수정 혹은 삭제 가능

 <br>

## Usage(자세한 실행 방법)

1. git clone
```
git clone https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-08.git
```

2. wanted_pre_onboarding 폴더를 인터프린터나 컴파일러로 열기
3. 필요한 라이브러리 설치

```
npm install
```

4. 실행

```
npm run start
```

5. 모바일 웹 페이지 확인
   chrome 브라우저에서 f12 로 개발자도구를 열고, 기준 모바일 화면크기 iphoneXR(414\*896)로 페이지를 랜더링합니다. maxwidth를 800px로 잡았으며, iphone SE(375\*667) 과 tablet(768\*1024) 화면에서도 반응형 디자인을 구현하였습니다.


**<참고화면>**

<img width="1440" alt="웹페이지이미지" src="https://user-images.githubusercontent.com/54584337/158796571-845e4ba6-38e4-42ee-9ae5-a7edbf44249a.png">

## 기술스택

- React.js 사용
- React-router 페이지 이동
- Redux Toolkit로 상태관리 (저장, 수정, 삭제)
- CSS는 styled-component를 사용하여, theme로 자주 사용하는 변수를 설정해 주었습니다.
- 배포는 netlify 을 이용하여 진행했습니다

<배포링크>
https://wanted-codestates-project-05-08.netlify.app/

<br>


## 구현한 방법과 이유에 대한 간략한 내용
## <승연님>

### 구현한 내용
* src/pages/Home.js
* src/components/Button.js
* src/components/SearchInp.js
* src/components/Selected.js
## 로컬 스토리지 데이터 리스트 화면에 보이게 하고 데이터 정보 검색 기능
- 로컬 스토리지에 데이터 정보가 있으면 메인 화면에 보여줍니다.
- 저장된 데이터가 없을 시에는 화면에 데이터가 없다는 문구가 나옵니다.
- 데이터 리스트의 이름, 주소, 메모 중 하나를 선택하여 검색어를 입력하여 정보를 찾을 수 있습니다.
- 라우터를 넣어 페이지 전환이 됩니다. 
- 검색 시 'Enter' 또는 아이콘 클릭시 검색이 가능합니다.
<br>

<img width="1440" alt="웹페이지이미지" src="https://user-images.githubusercontent.com/54584337/158800895-ccc41989-b7bd-48b3-8e92-0ef584cdbdc5.png">

<img width="1440" alt="gif" src="https://user-images.githubusercontent.com/54584337/158815778-7fd312b0-3e83-4b7c-b995-b23e6e49d0d6.gif">

### 개발 중 어려웠던 점 && 해결

- 검색어를 입력받을 때 로컬에 있는 정보가 있는지 필터를 주기 위해서 includes를 사용하여 글자가 있으면 찾을 수 있게 하였습니다.
- 로컬의 정보가 있는지 확인할때 사용자가 입력한 값에 따라 달라져야 한다는 점이 어려웠습니다. Home.js 에서 props로 넘겨주어 입력한 값을 얻을 수 있었고, 사용자가 입력할때에 찾는 방법은 debounce를 주는 것도 있었지만 사용자가 원하던 검색어와 다를 시에도 리스트 정보가 나오는 것을 방지하고자  onkeypree 이벤트로 Enter 입력이거나 아이콘 클릭시 검색이 되도록 하였습니다.
- 전체 데이터 리스트로 갈 수 있는 페이지로 이동하는 버튼을 하단에 고정을 해야하는데 화면 크기에 따라 전체화면일 경우 원하는 위치에 고정이 안되는 문제가 있었습니다. `display: flex` 로 하고 원하는 아이템을 `flex: none`, 하단으로 고정하기 위해 `margin-top: auto`를 주어 해결해였습니다.

<br>
