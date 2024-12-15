import React, { useEffect, useState } from 'react';
import { verifyToken } from '../api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token).then((data) => {
        setUser(data.user);
      }).catch((error) => {
        setMessage(error.error);
      });
    } else {
      setMessage('No token found');
    }
  }, []);

  if (user) {
    return <h1>Welcome, {user.username}</h1>;
  }

  return <p>{message}</p>;
}

export default Dashboard;
