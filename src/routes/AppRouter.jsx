// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route,  } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AnimalListPage from '../pages/AnimalListPage';

import AnimalDetailWrapper from './AnimalDetailWrapper';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 리스트 페이지 경로, /adopt로 통일 */}
      <Route path="/adopt" element={<AnimalListPage />} />
      {/* 상세 페이지: wrapper를 통해 key에 desertionNo 지정 */}
      <Route
        path="/animal-details/:desertionNo"
    element={<AnimalDetailWrapper />}
      />
    </Routes>
  );
};


export default AppRouter;
