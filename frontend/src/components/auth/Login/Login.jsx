import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/user/login', data).then((res) => {
        if (res.data === 'exists') {
          navigate('/home');
        } else if (res.data === 'not exists') {
          alert('user not registered');
          navigate('/register');
        }
      });
    } catch (error) {
      alert('Wrong details');
      console.log(error);
    }
  };
  return (
    <div>
      <div className="log-form">
        <p className="log-title">Login</p>
        <form action="">
          <label htmlFor="">Email:</label>
          <input
            type="email"
            className="input-fill"
            placeholder="enter the email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />{' '}
          <br />
          <label htmlFor="">Password:</label>
          <input
            className="input-fill"
            type="password"
            placeholder="enter the password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />{' '}
          <br />
          <button className="login-btn" onClick={handleClick}>
            Login
          </button>
          <Link to="/register">
            {' '}
            <p className="new">New user(Register)</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
