import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/ErrorPage.css'; // Importing the CSS file for styling
import errorpage from "../media/ErrorPage.jpg";
import { Button } from 'react-bootstrap';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one step in the history
  };

  return (
    <div className="error-container">
      <h1 className="error-heading">Error</h1>
      <img src={errorpage}  alt="Error" className="error-image" />
      <p className="error-message">Oops! I guess You are Lost .</p>
      <Button className="back-button" onClick={goBack}>Go Back</Button>
    </div>
  );
};

export default ErrorPage;
