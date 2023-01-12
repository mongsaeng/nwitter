import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import React, { useState } from "react";

const NweetEl = ({ nweetObj, attachUrl, isOwner }) => {
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`); // 변수로 설정
  const [edit, setEdit] = useState(false); // Edit mode 확인 = boolean
  const [newNweet, setNewNweet] = useState(nweetObj.text); // 입력된 text update
  const deleteRef = ref(storageService, nweetObj.attachUrl); // 삭제하려는 이미지 파일의 ref
  const onDelClick = async () => {
    const delConfirm = window.confirm(
      "Are you sure you want to delete this nweet?",
    );
    if (delConfirm) {
      try {
        // 삭제1 - 파이어스토어
        await deleteDoc(NweetTextRef);

        // 삭제2 - 이미지가 있으면 파일 스토리지에서 삭제
        if (nweetObj.attachUrl !== "") {
          await deleteObject(deleteRef);
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev); //서로 반대로 설정
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet, // input에 입력된 값으로 Update
    });
    setEdit(false); // Edit mode 종료
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              onChange={onChange}
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachUrl && <img src={nweetObj.attachUrl} alt="" />}
          {isOwner && (
            <div className="nweet__actions">
              <button onClick={onDelClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NweetEl;
