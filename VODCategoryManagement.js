import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // 사용하지 않으므로 삭제
import axios from 'axios';
import './UserManagement.css';

function VODCategoryManagement() {
  const [vodList, setVodList] = useState([]);
  // const navigate = useNavigate(); // 사용하지 않으므로 삭제

  const fetchVodList = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/vods');
      setVodList(response.data);
    } catch (error) {
      alert("VOD 목록을 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchVodList();
  }, []);

  const handleDelete = () => {
    alert('삭제 기능은 현재 DB 구조에서는 구현이 복잡하여 보류 중입니다.');
  };
  
  const handleEdit = () => {
      alert('수정 기능은 현재 DB 구조에서는 구현이 복잡하여 보류 중입니다.');
  };

  return (
    <div>
      <h1>VOD 카테고리 관리 (vodlist)</h1>
      <button style={{ marginBottom: '20px' }}>
        새 VOD 추가
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>내용 (VODLISTTEXT)</th>
            <th>이미지 경로 (VODLISTIMGPATH)</th>
            <th>성인 (IS_ADULT)</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {vodList.map((item, index) => (
            <tr key={index}>
              {/* ✅ 서버가 보내준 이름 그대로 소문자를 사용합니다. */}
              <td>{item.vodlisttext}</td>
              <td>{item.vodlistimgpath}</td>
              <td>{item.is_ADULT ? 'O' : 'X'}</td>
              <td>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete} style={{ marginLeft: '5px' }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VODCategoryManagement;