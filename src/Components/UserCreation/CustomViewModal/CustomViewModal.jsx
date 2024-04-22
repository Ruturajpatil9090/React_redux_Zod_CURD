import React from "react";
import { useSelector } from "react-redux";
import "./CustomViewModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log("singleuser", singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={() => setShowPopup(false)}>X</button>
        <h4>Name : <span>{singleUser[0].name}</span></h4>
        <h4>Email :<span>{singleUser[0].email}</span></h4>
        <h4>Age : <span>{singleUser[0].age}</span></h4>
        <h4>Gender :<span>{singleUser[0].gender}</span></h4>
      </div>
    </div>
  );
};

export default CustomModal;