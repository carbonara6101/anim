import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AnimalDetailPage.css";
import ready from "../images/ready.png";

const AnimalDetailPage = () => {
  const { desertionNo } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!desertionNo) return;

    setDetail(null);
    setError("");
    setLoading(true);
    const url = `http://172.30.2.120:3001/api/detail/${desertionNo}`;
    console.log(url);

    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setDetail(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("상세 정보 로드 실패:", err);
        setError("상세 정보를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [desertionNo]);

  if (loading) return <p className="loading">로딩 중…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!detail) return null;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)} 
          aria-label="이전 목록으로"
        >
          ← 목록으로 돌아가기
        </button>

        <div className="detail-card">
          <div className="detail-gallery">
            <div className="main-image">
              <img
                src={detail.popfile1 || ready}
                alt={detail.kindNm}
                className="detail-img"
              />
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-header">
              <h1 className="animal-name">
                {detail.kindNm}
                <span className={`gender ${detail.sexCd === 'M' ? 'male' : 'female'}`}>
                  {detail.sexCd === "M" ? "♂" : detail.sexCd === "F" ? "♀" : ""}
                </span>
              </h1>
              <div className="animal-status">
                <span className={`status-badge ${detail.processState === '보호중' ? 'protected' : 'adopted'}`}>
                  {detail.processState}
                </span>
              </div>
            </div>

            <div className="detail-specs">
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">나이</span>
                  <span className="spec-value">{detail.age || '정보 없음'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">성별</span>
                  <span className="spec-value">
                    {detail.sexCd === 'M' ? '수컷' : detail.sexCd === 'F' ? '암컷' : '미상'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">체중</span>
                  <span className="spec-value">{detail.weight || '정보 없음'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">털색상</span>
                  <span className="spec-value">{detail.colorCd || '정보 없음'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">중성화</span>
                  <span className="spec-value">
                    {detail.neuterYn === 'Y' ? '완료' : detail.neuterYn === 'N' ? '미완료' : '미상'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">발견일</span>
                  <span className="spec-value">{detail.happenDt || '정보 없음'}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>발견 장소</h3>
                <p className="location">{detail.happenPlace || '정보 없음'}</p>
              </div>

              {detail.specialMark && (
                <div className="detail-section">
                  <h3>특이사항</h3>
                  <p className="special-notes">{detail.specialMark}</p>
                </div>
              )}

              <div className="detail-section shelter-info">
                <h3>보호소 정보</h3>
                <div className="shelter-details">
                  <p><strong>보호소명:</strong> {detail.careNm || '정보 없음'}</p>
                  <p><strong>연락처:</strong> {detail.careTel ? (
                    <a href={`tel:${detail.careTel}`} className="contact-link">
                      {detail.careTel}
                    </a>
                  ) : '정보 없음'}</p>
                  <p><strong>주소:</strong> {detail.careAddr || '정보 없음'}</p>
                  <p><strong>공고번호:</strong> {detail.noticeNo || '정보 없음'}</p>
                  <p><strong>공고기간:</strong> {detail.noticeSdt && detail.noticeEdt 
                    ? `${detail.noticeSdt} ~ ${detail.noticeEdt}` 
                    : '정보 없음'}
                  </p>
                </div>
              </div>

              <div className="detail-actions">
                <button className="adopt-button">
                  입양 문의하기
                </button>
                {detail.careTel && (
                  <a 
                    href={`tel:${detail.careTel}`} 
                    className="call-button"
                  >
                    전화하기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
