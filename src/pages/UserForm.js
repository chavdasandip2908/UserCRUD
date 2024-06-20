// src/pages/UserForm.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { createUser, updateUser, fetchUser, fetchUsers } from '../api';

const UserForm = () => {
  const { setUsers } = useContext(UserContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    city: '',
    skills: '',
    dob: '',
    profileimage: '',
    socialmediaurl: '',
    password: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const loadUser = async () => {
        const response = await fetchUser(id);
        setUser(response.data);
      };
      loadUser();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateUser(id, user);
      const response = await fetchUsers();
      setUsers(response.data.users);

    } else {
      await createUser(user);
      const response = await fetchUsers();
      setUsers(response.data.users);

    }
    navigate('/');
  };

 
  return (
    <section className="vh-100 gradient-custom background" >
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{isEdit ? 'Edit User' : 'Create User'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={user.mobile}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Mobile"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={user.city}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="City"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="skills"
                          name="skills"
                          value={user.skills}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Skills"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={user.dob ? user.dob.split('T')[0] : ''}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Date of Birth"
                        />
                      </div>
                    </div>
                    <div className="row">

                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="femaleGender"
                          value="female"
                          checked={user.gender === 'female'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="femaleGender">
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="maleGender"
                          value="male"
                          checked={user.gender === 'male'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="maleGender">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="otherGender"
                          value="other"
                          checked={user.gender === 'other'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="otherGender">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value={isEdit ? 'Update' : 'Create'} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default UserForm;
