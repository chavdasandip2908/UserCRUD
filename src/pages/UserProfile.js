// src/pages/UserProfile.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { fetchUser } from '../api';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { loading } = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetchUser(id);
      setUser(response.data);
    };
    loadUser();
  }, [id]);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format as ISO 8601 date without time
    const isoDateOnlyString = `${day}-${month}-${year}`;

    return isoDateOnlyString;
  }

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container-fluid mt-4 mb-4 p-3 d-flex justify-content-center background vw-100 vh-100 ">

      <div className="card p-4" style={{ width: '350px',height:"500px", backgroundColor: '#e3e1e1', border: 'none', cursor: 'pointer', transition: 'all 0.5s' }}>

        <div className="image d-flex flex-column justify-content-center align-items-center">

          <span className="name my-3 " style={{ fontSize: '27px', fontWeight: 'bold' }}>User Profile</span>

          <button className="btn btn-secondary" style={{ height: '140px', width: '140px', borderRadius: '50%' }}>

            <img src={"https://i.imgur.com/wvxPV9S.png"} height="100" width="100" alt="Profile" />

          </button>

          <span className="name mt-3" style={{ fontSize: '22px', fontWeight: 'bold' }}>{user.name}</span>

          <span className="idd">{user.email}</span>

          <div className="d-flex flex-row justify-content-center align-items-center gap-2">

            <span className="idd1" style={{ fontSize: '12px' }}>{user.mobile}</span>

          </div>

          <div className="d-flex flex-column justify-content-center align-items-center  mt-2">

            <span className="idd1" style={{ fontSize: '12px' }}> <b>Gender :</b> {user.gender}</span>
            <span className="idd1" style={{ fontSize: '12px' }}> <b>City :</b> {user.city}</span>
            <span className="idd1" style={{ fontSize: '12px' }}> <b>Skills :</b>  {user.skills}</span>
            <span className="idd1" style={{ fontSize: '12px' }}> <b>DOB :</b>  {formatDate(user.dob)}</span>

          </div>

          <div className="d-flex mt-2">


            <Link className='text-light text-decoration-none' to={`/edit/${user._id}`}>
              <button className="btn1 btn-dark " style={{ height: '40px', width: '150px', border: 'none', backgroundColor: '#000', color: '#aeaeae', fontSize: '15px' }}>Edit</button>
            </Link>


          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;
