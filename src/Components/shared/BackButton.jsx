import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <button onClick={handleBackClick} className='btn btn-warning mt-5'>
      Go Back
    </button>
  );
};

export default BackButton;
