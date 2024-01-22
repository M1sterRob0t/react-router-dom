import React from 'react';
import './Controls.css';
import { useNavigate } from 'react-router-dom';

function Controls() {
  const navigate = useNavigate();

  return (
    <div className='controls'>
      <button onClick={() => navigate(-1)}>back</button>
      <button onClick={() => navigate(1)}>forward</button>
    </div>
  );
}

export default Controls;
