// src/pages/UserList.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import FilterForm from './FilterForm';
import { searchUsers, filterUsers, deleteUser, fetchUsers } from '../api';
import Background from '../image/iamge-gallary-20240620103156.jpg'

const UserList = () => {
  const { users, loading, setUsers } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete);
      const response = await fetchUsers();
      setUsers(response.data.users);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    try {
      const response = await searchUsers(searchQuery);
      setUsers(response.data.users);
      console.log(users);
    } catch (error) {
      console.error('Failed to search users:', error);
    }
  };

  const handleFilter = async (filter) => {
    try {
      const response = await filterUsers(filter);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to filter users:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid mx-0 px-0">
        <div className="row mx-0 px-0">
          <div className="col mx-0 px-0">
            <div class="d-flex flex-row flex-nowrap justify-content-between align-items-center mb-3 px-1 py-2 bg-body-secondary">
              <h1 className='ms-3'>User List</h1>
              <div className="d-flex flex-row flex-nowrap justify-content-between align-items-center" >
                <Link className='mx-1' to="/create">Create New User</Link>
                <div className='mx-1'>
                  <button className='btn btn-outline-primary py-1' onClick={() => setShowFilter(!showFilter)} >filter</button>
                </div>
                <div className='mx-1 d-flex flex-row flex-nowrap justify-content-between align-items-center'>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users"
                  />
                  <button className='btn btn-outline-primary py-1 ms-2' onClick={handleSearch}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {showFilter ? <div className=" me-5  position-absolute end-0 z-3 bg-body-tertiary rounded-1 ">
              <FilterForm onFilter={handleFilter} />
            </div> : ""}

          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm ">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <div className="col mb-3" key={user._id}>
                <div className="card">
                  <Link to={`/user/${user._id}`}>
                    <img
                      src={Background}
                      alt="Cover"
                      className="card-img-top"
                    />
                    <div className="card-body text-center">
                      <img
                        src={'https://bootdey.com/img/Content/avatar/avatar7.png'}
                        style={{ width: '100px', marginTop: '-65px' }}
                        alt="User"
                        className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                      />
                      <h5 className="card-title">{user.name}</h5>
                      <p className="text-secondary mb-1">{user.skills.join(', ')}</p>
                      <p className="text-muted font-size-sm">{user.email}</p>
                    </div>
                  </Link>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger btn-sm has-icon ml-2 float-end "
                      type="button"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash " viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>

                    </button>
                  </div>
                </div>
                <DeleteConfirmationModal
                  show={showModal}
                  handleClose={handleCloseModal}
                  handleDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div >
    </>
  );
};

export default UserList;
