import { uuidv4 } from "@firebase/util";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // 입력한 nweet
  const [attach, setAttach] = useState(""); // image data
  const onSubmit = async (e) => {
    if (nweet === "") {
      return;
    }
    e.preventDefault();
    let attachUrl = ""; // 조건문 사용을 위해 선언
    if (attach !== "") {
      // 이미지 업로드가 없을 경우
      const attchRef = ref(storageService, `${userObj.uid}/${uuidv4()}`); // 레퍼런스 생성
      await uploadString(attchRef, attach, "data_url"); // 파일 데이터를 레퍼런스로 전송(attach의 string)
      attachUrl = await getDownloadURL(ref(storageService, attchRef)); // 이미지 파일 Url
    }
    const nweetObj = {
      // 저장되는 nweet의 object
      text: nweet, // state nweet value
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachUrl,
    };
    try {
      await addDoc(collection(dbService, "nweets"), nweetObj); // nweets 컬렉션에 nweetObj 정보를 추가
    } catch (e) {
      //console.log("Error adding document: ", e);
    }
    // 서브밋이 끝난 뒤 초기화 과정
    setNweet("");
    setAttach("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader(); // FileReader API
    reader.onloadend = (finishedE) => {
      const {
        currentTarget: { result },
      } = finishedE;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttach = () => {
    setAttach("");
  };
  return (
    <div className="Routes_wrap">
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            value={nweet}
            onChange={onChange}
            className="factoryInput__input"
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add Photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          type="file"
          id="attach-file"
          accept="image/*"
          onChange={onFileChange}
          className="hide"
        />
        {attach && (
          <div className="factoryForm__attachment">
            <img src={attach} alt="" style={{ backgroundImage: attach }} />
            <button className="factoryForm__clear" onClick={onClearAttach}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NweetFactory;
