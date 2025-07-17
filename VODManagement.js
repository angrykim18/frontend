import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserManagement.css'; // 기존 CSS 재사용

function VODManagement() {
  const [vods, setVods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 열릴 때, 백엔드에서 VOD 목록을 가져옵니다.
    const fetchVods = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/vods');
        setVods(response.data);
      } catch (error) {
        alert("VOD 목록을 불러오는 데 실패했습니다.");
      }
    };
    fetchVods();
  }, []);

  return (
    <div>
      <h1>VOD 관리</h1>
      <button onClick={() => navigate('/dashboard/vod/new')} style={{ marginBottom: '20px' }}>
        새 VOD 추가
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>IDX</th>
            <th>내용 (VODLISTTEXT)</th>
            <th>이미지 경로 (VODLISTIMGPATH)</th>
            <th>성인 (IS_ADULT)</th>
          </tr>
        </thead>
        <tbody>
          {vods.map(vod => (
            <tr key={vod.idx}>
              <td>{vod.idx}</td>
              <td>{vod.vodListText}</td>
              <td>{vod.vodListImgPath}</td>
              <td>{vod.is_ADULT ? 'O' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VODManagement;