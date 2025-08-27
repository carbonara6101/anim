import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css'; // 스타일 경로에 따라 조정
import bgimage from '../images/bg.jpg';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 서버로 로그인 요청 보내기
      const response = await fetch('http://172.30.2.120:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // 응답 상태 코드가 200이 아닐 경우 오류 처리
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`로그인에 실패했습니다: ${errorData.message || response.statusText}`);
      }

      // 응답 받은 데이터에서 토큰을 로컬스토리지에 저장
      const data = await response.json();
      localStorage.setItem('token', data.token);  // 토큰 저장

      alert('로그인 성공');
      navigate('/'); // 대시보드 페이지로 이동
    } catch (error) {
      console.error('Error logging in:', error);
      alert(`로그인에 실패했습니다. 오류: ${error.message}`);
    }
  };

  return (
    <div className="img js-fullheight" style={{
      backgroundImage: `url('${bgimage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      {/* 오른쪽 상단 홈버튼 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '30px',
        display: 'flex',
        gap: '15px',
        zIndex: 10
      }}>
        <Link to="/" className="home-exit-button">돌아가기</Link>
      </div>

      {/* 로그인 폼 */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">PetHouse</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">로그인</h3>
                <form className="signin-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="이메일"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary submit px-3">
                      로그인
                    </button>
                  </div>
                </form>
                <div className="w-100 text-right">
                  <a href="/register" style={{ color: '#fff' }}>회원가입</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
