import React from 'react';
import './Page.css';
import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <div>
      <div className="home">
        <div className="home-img"></div>
      </div>
      <div className="letter">
        <p className="letter-title">Find your book of your Choice </p>
      </div>
      <Link to="/login">
        <button className="btn-search">Find a Book</button>
      </Link>
    </div>
  );
};

export default Page;
