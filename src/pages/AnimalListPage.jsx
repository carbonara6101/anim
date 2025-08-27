import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnimalListPage.css";
import axios from "axios";

const AnimalListPage = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);

  useEffect(() => {
  axios
    .post(
      "http://172.30.2.120:3001/api/animals",
      {                        // ← 여기엔 바로 payload 객체
        pagenumber: pagenumber, //    또는 pageNo: pagenumber
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setAnimals(response.data.items);
      console.log(response.data.items)
    })
    .catch((error) => {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    });
}, [pagenumber]);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setPagenumber(pageNumber);
  };

  return (
    <div className="animal-list-page">
      {/* 돌아가기 버튼 */}
      <button className="back-button" onClick={() => navigate("/")}>
        돌아가기
      </button>

      <h1 className="page-title">입양 가능한 친구들</h1>
      <div className="animal-grid">
        {/* animals 배열이 비어있지 않으면 map으로 동물 정보 표시 */}
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div className="animal-card" key={animal.desertionNo}>
              <img
                src={animal.popfile1} // 동물 사진 (기본 이미지 처리)
                alt={animal.kindFullNm}
                className="animal-img"
                onError={(e) => (e.target.src = "popfile1")}
              />
              <h3 className="animal-name">
                {animal.kindFullNm} {animal.sexCd === "M" ? "♂" : "♀"}
              </h3>
              <p className="animal-age">{animal.age}</p>
              <p className="animal-location">발견 장소: {animal.happenPlace}</p>
              <p className="animal-shelter">보호소: {animal.careNm}</p>
              {/* <p className="animal-description">{animal.specialMark}</p> */}
              <button
                className="adopt-button"
                onClick={() =>
                  navigate(`/animal-details/${animal.desertionNo}`)
                }
              >
                상세 정보
              </button>
            </div>
          ))
        ) : (
          <p>입양 가능한 동물이 없습니다.</p>
        )}
      </div>

      {/* Pagination 추가 */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(pagenumber - 1)}
          disabled={pagenumber === 1}
        >
          이전
        </button>
        <span>페이지 {pagenumber}</span>
        <button onClick={() => handlePageChange(pagenumber + 1)}>다음</button>
      </div>
    </div>
  );
};

export default AnimalListPage;
