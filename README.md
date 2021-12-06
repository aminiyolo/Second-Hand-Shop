# 프로젝트 이름 : 2nd Hand (Second Hand)

## 사이트 주소: https://aminiyo-second-hand-market.herokuapp.com/

---

## 프로젝트 계획 이유

> ### 당근마켓을 자주 사용하는 이용자로서, 당근마켓 처럼 중고 제품을 거래하고자 하는 사람들을 연결 시켜주는 웹사이트를 진행해보면 좋은 공부가 될 것 같다는 생각이 들었습니다.

> ### 또한, 문서나 사진을 웹사이트에 올리는 기능과 채팅 기능을 만들어 보고 싶다는 생각이 들어 계획하게 되었습니다.

---

## 풀스택 프로젝트 (개인 프로젝트)

<img src="https://user-images.githubusercontent.com/73641636/144237483-1cd485b1-07db-4679-a9fc-ddc65a65288b.png" width="525px" height="450px" title="홈" alt="홈"></img><br/>

### 클라이언트(React), 서버(express, mongoDB) 모두 혼자서 진행하여 완성하였습니다.

### 프로젝트에 사용한 주요 라이브러리 / 프레임워크

- 클라이언트
  - React, React-redux, react-router, @reduxjs/toolkit, Styled-components, Antd, Axios, dayjs, react-toastify, @loadable/component, redux-persist, react-image-gallery, react-dropzone, firebase, http-proxy-middleware, socket.io-client
- 서버
  - express, mongoose, jsonwebtoken, nodemailer, crypto-js, cookie-parser, dotenv, socket.io

## 파일 구조

---

- 프론트(client 폴더)

  - client/src/index.js 에서 App.js(모든 컴포넌트가 렌더링 되는 파일) 렌더링, 페이지 로딩 시 첫 화면의 컴포넌트는 pages/Landing/index.js 입니다. pages 폴더에는 주요 화면단 컴포넌트들이 위치해 있습니다(로그인, 회원가입 등) 주요 화면단 컴포넌트들의 세부 컴포넌트들은 src/components 파일 안에 위치하고 있습니다.

- 백(server 폴더)
  - server/index.js(main), server/models(DB), server/routes(RestAPI)

---

## 주요기능

---

### 단어 검색 기능 및 카테고리를 이용한 필터링 기능

1. 랜딩페이지 Input창을 통해 원하는 단어 검색 기능
2. 랜딩페이지 카테고리 박스를 통해 원하는 카테고리 필터링 기능
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144235636-d40a77ed-c3e2-41b5-a3b0-a288402f98c5.png" width="525px" height="450px" title="검색기능" alt="검색기능"></img><br/>

---

### 장바구니 담기 기능 및 채팅방 만들기 기능

1. 판매자가 올린 상품 세부 내용과 더불어 장바구니 담기 기능, 판매자와 채팅 기능
2. 장바구니에 담은 사람들의 숫자
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236964-12d03c32-e06b-4bb4-9fe1-fec26d8553dd.png" width="525px" height="450px" title="장바구니 및 채팅 기능" alt="장바구니 및 채팅 기능"></img><br/>

---

### 채팅 기능 및 알림 기능

1. 실시간 채팅 및 메세지 전송 기능
2. 메세지가 전송된 날짜 별로 묶기 기능
3. 채팅방 입장, 채팅 전송 및 수신시 자동 스크롤 다운 기능
4. 메세지 수신 시 Navbar 알람 아이콘에 발신자와 개수 및 메세시 도착 알림
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236378-65867a14-7ec1-45f8-a48d-79c8c1a160eb.png" width="600px" height="450px" title="메신저 화면" alt="메신저 화면"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144236659-3176a662-9bf3-4438-b689-73aa586da9a1.png" width="600px" height="450px" title="실시간 채팅" alt="실시간 채팅"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144237688-9fa4788d-a61c-4860-8b6e-07a57ecf37e5.png" width="600px" height="450px" title="채팅 날짜 정렬" alt="채팅 날짜 정렬"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144236219-b2ac60e5-7572-4865-a44c-6d93be54a5ae.png" width="600px" height="450px" title="알림확인" alt="알림확인"></img><br/>

---

### 사용자들이 업로드한 게시물 목록 인피니티 스크롤 기능

1. intersection observer와 useRef를 이용하여 스크롤 다운 시 게시물 목록 더 불러오기
2. 더이상 불러올 게시물 없을 시 서버에 데이터 요청 멈추기

---

### 로그인 및 회원가입 기능

1. 이메일을 통한 인증확인 (nodemailer 사용)
2. 중복 이메일을 통한 회원가입 방지
3. 회원가입 시 정규표현식을 사용하여 유효성 검사
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236850-d492daaa-279c-4b6a-be29-058ea2a35fce.png" width="525px" height="450px" title="이메일 인증" alt="이메일 인증"></img><br/>

---

### 장바구니 관리 기능

1. 장바구니 목록 확인 및 세부내용 확인
2. 장바구니 목록 삭제 기능
3. 장바구니에 담긴 상품의 수를 장바구니 아이콘에 보여주기
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144237723-d4588805-e7e0-47c6-89c6-db4a64c47048.png" width="600px" height="450px" title="장바구니" alt="장바구니"></img><br/>

---

### 상품 업로드 기능

1. React Dropzone과 firebase를 사용하여 사진 업로드 기능
2. 현재까지 업로드한 사진 목록 확인 및 삭제 기능
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236589-2719dc9a-2edc-4941-b3ac-d144e2a4373a.png" width="600px" height="450px" title="상품 업로드" alt="상품 업로드"></img><br/>

---

### 마이페이지 기능

1. 내가 올린 게시물 목록 확인
2. 업로드한 게시물 삭제 및 수정 기능
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236087-5e57a055-539f-41b1-8e6e-f0d4e3b13236.png" width="600px" height="450px" title="마이페이지" alt="마이페이지"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144235216-75ee5d18-1d21-4f96-a4f4-f248b01d229f.png" width="600px" height="450px" title="게시물 수정" alt="게시물 수정"></img><br/>

---

### 관리자 기능 (유저관리 및 게시물 관리)

1. 가입한 총 사용자 수 및 사용자 목록, 사용자 정보 확인
2. 사용자들이 업로드한 게시물 목록 확인 및 삭제 기능
   </br>
   </br>
   <img src="https://user-images.githubusercontent.com/73641636/144236725-816ba1d4-9a64-41bb-9a69-1012fed7a978.png" width="600px" height="450px" title="회원관리" alt="회원관리"></img><br/>
   <img src="https://user-images.githubusercontent.com/73641636/144235563-8c050baf-8f35-428f-b292-4effa95cd509.png" width="600px" height="450px" title="게시물 관리" alt="게시물 관리"></img><br/>

---

# 프로젝트를 진행하며 어려웠던 점 및 느낀점

---

> 1. ### 랜딩페이지의 검색 기능과 카테고리 필터링 기능을 구현하는 부분에서 여러 어려움이 있었다. 이전 진행했던 레시피 프로젝트는 API 요청을 할때 쿼리값만 변경해주면 알아서 필터링된 데이터를 받을 수 있었다. 하지만, 이번 프로젝트에서는 스스로 서버 부분에서 프론트에서 받아온 데이터를 가공해서 필터링한 결과를 보여줘야 하다보니 그러한 점에서 어려움이 있었다. -> 결과적으로, 이번 경험을 통해 클라이언트 사이드와 서버의 데이터 통신 흐름의 구조를 이전보다 더 이해할 수 있게 되었고, 이전까지는 잘 몰랐던 HTTP의 구조 및 흐름 등 여러 지식들을 공부하며 성장할 수 있었다.

> 2. ### 이전까지는 axios의 여러 기능들에 대해 자세히 모르고 단순 기능만을 사용했었다. 하지만, 이번 프로젝트를 통해 axios 인스턴스 활용의 유용성, axios 요청 config 설정(header 설정 등)과 여러 기능에 대해 공부하고 사용하는 법에 알 수 있는 좋은 기회가 되었다. 또한, 서버로 부터 받아온 데이터들을 어떤식으로 가공 해야하는지 어느 정도 감을 잡을 수 있는 좋은 시간이었다.

> 3. ### 실시간 채팅을 구현하기 위해 socket을 사용해야 했다. 하지만, 한번도 socket을 공부해본적도 없고 사용해본적도 없었기 때문에 이번 프로젝트에서 가장 큰 어려움으로 다가왔다. 이를 위해 socket 공식 문서를 살펴보며 공부하는 등 수없이 많은 구글링을 통한 결과 소켓의 흐름과 사용법에 대해 배울 수 있었다.

> 4. ## 이번 프로젝트를 통해 React, Javascript, CSS, HTML, nodeJS등 웹의 전반적인 흐름에 대해 경험을 쌓을 수 있었다. 이번 프로젝트에서 antd을 사용했지만 antd 보단 material-ui가 npm 트렌드에서 우세하기 때문에 다음 프로젝트에는 antd 대신 material-ui를 한번 사용해보고 싶다는 생각이 들었다.

> 5. ## React Dev tool과 Redux Dev tool들을 사용해보며 디버깅에 대한 경험을 쌓을 수 있었고, 개발을 하며 발생하는 버그들을 어떠한 방식으로 해결해야 할 지 배울 수 있는 뜻 깊은 시간이었다.

---
