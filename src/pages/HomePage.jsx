import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✅ 추가
import './HomePage.css';

// 기본 프로필 이미지 import

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 프로필 이미지를 가져옵니다.
    const token = localStorage.getItem("token");

    // 로그인 상태 확인 (토큰이 있으면 로그인 상태로 간주)
    if (token) {
      setIsLoggedIn(true);
    }

    // 프로필 이미지가 없으면 기본 이미지를 사용합니다.
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리: 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
  };

  return (
    <div className="home">
      {/* 🔝 상단 네비게이션 */}
      <div className="top-nav">
        {/* 로그인/회원가입 버튼 */}
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/register')}>회원가입</button>
          </>
        ) : (
          <div className="profile-small">
            {/* 프로필 이미지를 작은 크기로 표시 */}
            <img
              
              alt="Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              onClick={handleLogout} // 프로필 클릭 시 로그아웃
            />
          </div>
        )}
      </div>

      {/* 🔸 입양 히어로 섹션 */}
      <div className="hero-section adopt-hero">
        <div className="hero-overlay">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            입양은 또 하나의 사랑입니다
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            유기동물에게 새로운 가족을
          </motion.p>
          <motion.button
            className="adopt-button"
            onClick={() => navigate('/adopt')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            입양하러 가기 →
          </motion.button>
        </div>
      </div>

      {/* ✅ 보호소 찾기 섹션 */}
      <div className="hero-section shelter-hero">
        <div className="hero-overlay">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            유기동물 보호소 찾기
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            지역 기반으로 가까운 보호소를 찾아보세요
          </motion.p>
          <motion.button
            className="adopt-button"
            onClick={() => navigate('/detail')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            보호소 찾으러 가기 →
          </motion.button>
        </div>
      </div>

      {/* 🔻 입양 절차 안내 */}
      <section className="hero-section process-hero" style={{
        padding: '80px 20px',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        position: 'relative',
        color: 'white'
      }}>
        <div className="hero-overlay" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <motion.h2 
            className="hero-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '2.5rem',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            입양 절차 안내
          </motion.h2>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            간단한 절차로 사랑스러운 반려동물을 만나보세요
          </motion.p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          maxWidth: '1200px',
          margin: '40px auto 0',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2
        }}>
          {[
            {
              title: '1. 동물 찾기',
              desc: '우리 플랫폼에서 입양 가능한 동물을 검색하세요.',
              color: '#3498db'
            },
            {
              title: '2. 입양 신청',
              desc: '회원가입 후 간편하게 입양을 신청할 수 있어요.',
              color: '#2ecc71'
            },
            {
              title: '3. 승인 및 만남',
              desc: '관리자가 확인 후, 직접 만나볼 수 있어요.',
              color: '#e74c3c'
            }
          ].map((step, index) => (
            <div 
              key={index}
              style={{
                flex: 1,
                minWidth: '280px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '30px 25px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                border: 'none',
                color: '#333'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: step.color
              }} />
              <h3 style={{
                color: '#2c3e50',
                fontSize: '1.5rem',
                marginBottom: '15px',
                position: 'relative',
                paddingBottom: '15px',
                fontWeight: '600'
              }}>
                {step.title}
                <span style={{
                  content: '""',
                  position: 'absolute',
                  width: '50px',
                  height: '3px',
                  background: '#3498db',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '3px'
                }} />
              </h3>
              <p style={{
                color: '#555',
                lineHeight: 1.7,
                marginTop: '15px',
                fontSize: '1rem'
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
