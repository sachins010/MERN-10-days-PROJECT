import React, { useState } from 'react';
import './App.css';

import Home from './components/home/home'

function App() {

  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page)=>{
    setCurrentPage(page);
  };
  return (
    <div>
      <Home currentPage={currentPage} onPageChange={handlePageChange}></Home>
      
    </div>
  );
}

export default App;
