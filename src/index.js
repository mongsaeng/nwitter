import React from "react";
import ReactDOM from "react-dom/client";
import App from "comp/App";
import "assets/style.css";
/*
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);

/* fontawsome package
1. Font Awesome의 SVG 기반 아이콘을 활성화 시키기 위한 기본 패키지 설치
npm i @fortawesome/fontawesome-svg-core

2. 무료로 제공되는 Solid, Regular Brands 3개의 카테고리에 대한 패키지 설치
npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons

3. Font Awesome을 React 컴포넌트 형태로 사용할 수 있도록 해주는 @fortawesome/react-fontawesome 이라는 패키지는 설치
npm i @fortawesome/react-fontawesome
*/
