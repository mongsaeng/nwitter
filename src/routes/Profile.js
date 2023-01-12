import React, { useEffect } from "react";
import { authService, dbService } from "fBase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
  // 유저 정보 확인을 위해 Obj 호출
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName); // user 정보를 담은 state
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 createrId 가진 모든 문서를 내림차순(desc)으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, "nweets"),
      where("createrId", "==", userObj.uid),
      orderBy("createdAt", "desc"),
    ); // DB필터링
    // getDocs() 메서드로 쿼리 결과 값 가져오기
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  });
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // 업데이트가 될때만 실행
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshUser(); // 업데이트된 User 정보 넘기기
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
          className="formInput"
        />
        <input type="submit" className="formBtn" value="Update Profile" />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
