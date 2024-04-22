import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from '../../features/userdetailSlice';
import { Link, useNavigate } from 'react-router-dom';
import ShowViewModal from "../../Components/UserCreation/CustomViewModal/CustomViewModal"

const UserCreationUtility = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.app);
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  const handleCreateClicked = () => {
    navigate("/createuser");
  };

  const handleRowDoubleClick = (userId) => {
    navigate(`/edit/${userId}`);
  };

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      {showPopup && (
        <ShowViewModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <div className='' style={{ "float": "left", marginLeft: "410px" }}>
        <button className="btn btn-success" onClick={handleCreateClicked}>
          CREATE +
        </button>
      </div>
      <h1 className='container'>All Posts</h1>

      <table className="table container table-bordered table-striped">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((ele) => (
            <tr key={ele.id} onDoubleClick={() => handleRowDoubleClick(ele.id)}>
              <td>
                <button className="btn btn-primary mr-2" onClick={(e) => [setId(ele.id), setShowPopup(true)]}>
                  View
                </button>
                <Link to={`/edit/${ele.id}`} className="btn btn-warning mx-2">
                  Edit
                </Link>
                <button onClick={() => {
                  if (window.confirm('Are you sure you want to delete this record?')) {
                    dispatch(deleteUser(ele.id));
                  }
                }} className="btn btn-danger">
                  Delete
                </button>

              </td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.age}</td>
              <td>{ele.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCreationUtility;
