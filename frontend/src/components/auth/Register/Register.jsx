import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log('data ', data);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:4000/user/register', data)
        .then((res) => {
          if (res.data === 'exists') {
            alert('user already exists');
          } else if (res.data === 'not exists') {
            navigate('/login');
          }
        });
    } catch (error) {
      alert('wrong details');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="reg-form">
        <p className="reg-title">Sig Up</p>
        <form action="POST">
          <label htmlFor="">Name:</label>
          <input
            className="input-fill"
            type="text"
            placeholder="Enter your name"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="">Email:</label>
          <input
            className="input-fill"
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="">Password:</label>
          <input
            className="input-fill"
            type="password"
            placeholder="Enter the password"
            value={data.password}
            name="password"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="">CPassword:</label>
          <input
            className="input-fill"
            type="password"
            placeholder="Confirm the password"
            value={data.cpassword}
            name="cpassword"
            onChange={handleChange}
          />
          <br />
          <button className="reg-btn" onClick={handleClick}>
            Register
          </button>
          <Link to="/login">
            {' '}
            <p className="new">Already user(Login)</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
