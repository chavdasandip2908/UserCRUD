// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import UserList from '../src/pages/UserList';
import UserProfile from '../src/pages/UserProfile';
import UserForm from '../src/pages/UserForm';
import './App.css';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
