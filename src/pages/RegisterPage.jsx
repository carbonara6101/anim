import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';
import bg1Image from '../images/bg1.jpg';

const RegisterPage = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // 홈페이지로 이동
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // fetch를 사용하여 회원가입 요청
      const response = await fetch('http://172.30.2.120:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // JSON 형식으로 요청 보냄
        },
        body: JSON.stringify({
          name: nickname,
          email,
          password,
        }),
      });

      // 응답이 성공적이지 않으면 오류 발생
      if (!response.ok) {
        // HTTP 응답이 200~299 범위가 아니면 오류 처리
        throw new Error(`회원가입에 실패했습니다. 서버 상태 코드: ${response.status}`);
      }

      const data = await response.json();
      alert('회원가입 성공');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`회원가입에 실패했습니다. 오류: ${error.message}`);
    }
  };

  return (
    <div
      className="img"
      style={{
        backgroundImage: `url(${bg1Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div
        onClick={handleGoBack}
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          color: '#f8e3c7',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        돌아가기
      </div>

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">회원가입</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap">
                <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="label" htmlFor="nickname">닉네임</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="닉네임을 입력하세요"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <span className="icon fa fa-user-o"></span>
                  </div>
                  <div className="form-group mb-3">
                    <label className="label" htmlFor="email">이메일</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="이메일을 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="icon fa fa-paper-plane-o"></span>
                  </div>
                  <div className="form-group mb-3">
                    <label className="label" htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="icon fa fa-lock"></span>
                  </div>
                  <div className="form-group mb-3">
                    <label className="label" htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="비밀번호 확인"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="icon fa fa-lock"></span>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary submit px-3">
                      회원가입
                    </button>
                  </div>
                </form>
                <p className="text-center">
                  이미 계정이 있어요! <a href="/login">로그인</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
