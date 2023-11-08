import React from 'react';
import Books from '../Books/Books';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <div className="home">
        <div className="home-img"></div>
      </div>
      <div className="letter">
        <p className="letter-title">Find your book of your Choice </p>
        <p className="desc">
          The more that you read, the more things you will know. The more that
          you learn, the more places you'll go
        </p>
      </div>
      <Books />
    </div>
  );
};

export default HomePage;
