// src/routes/AnimalDetailWrapper.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import AnimalDetailPage from '../pages/AnimalDetailPage';

const AnimalDetailWrapper = () => {
  const { desertionNo } = useParams();
  // desertionNo가 바뀔 때마다 key가 달라져 AnimalDetailPage가 완전 리마운트됩니다.
  return <AnimalDetailPage key={desertionNo} />;
};

export default AnimalDetailWrapper;
