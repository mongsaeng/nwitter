import React, { useState, useEffect } from "react";
import { dbService } from "fBase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import NweetEl from "comp/Nweet";
import NweetFactory from "comp/NweetFactory";

const Home = ({ userObj }) => {
  // user 정보를 prop
  const [nweets, setNweets] = useState([]); // 컬렉션 정보
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
    ); // snapshot에 필요한 인자
    onSnapshot(q, (snapshot) => {
      // Realtime 설정 (onSnapshot)
      const nweetArr = snapshot.docs.map((doc) => ({
        // 스냅샷 시점에 배열 생성
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div className="nweet_wrap">
        {nweets.map((nweet) => (
          <NweetEl
            key={nweet.id}
            nweetObj={nweet} // nweet의 모든 데이터
            isOwner={nweet.createrId === userObj.uid} // 본인이 만들었는지 확인
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
