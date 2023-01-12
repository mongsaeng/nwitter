import React, { useState, useEffect } from "react";
import AppRouter from "comp/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  // userObj : uid를 사용하기 위해 컴포넌트마다 공유한다.
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => { // 로그인, 로그아웃 시에 작동
      //user ? setUserObj(user) : setUserObj(null); // null 반환
      if(user){
        setUserObj(user);
        /*
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (argu) => user.updateProfile(argu),
        });
        */
        if(user.displayName == null){ // 이메일 가입 시 displayName = null이 된다.
          // 이메일 앞자리를 displayName 으로 지정
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => { // 변경된 사항 업데이트를 위해 유저 새로고침
    /*
      방법 1. 리렌더를 위해 데이터가 많은(방대한) object의 크기를 줄여주어야 한다.
      방법 2. 처음 데이터를 불러올 때 설정한다. ex) onAuthStateChanged
    */
   /*
   setUserObj({
     displayName: user.displayName,
     uid: user.uid,
     updateProfile: (argu) => user.updateProfile(argu),
    });
    */
    const user = authService.currentUser;
    setUserObj({...user});
  }
  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
        ) : ( 
         "initializing.."
      )}
      {/* userObj을 불리언 형태로 받아 로그인 여부 확인 */}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
