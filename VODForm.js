import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VODForm() {
  const { id } = useParams(); // URL에 id가 있으면 '수정' 모드
  const navigate = useNavigate();
  const [vod, setVod] = useState({
    vodListText: '',
    vodListImgPath: '',
    isAdult: false
  });
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchVod = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/vods/${id}`);
          setVod(response.data);
        } catch (error) {
          alert('VOD 정보를 불러오는 데 실패했습니다.');
        }
      };
      fetchVod();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVod(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = isEditMode ? `http://localhost:8081/api/vods/${id}` : 'http://localhost:8081/api/vods';
    const apiMethod = isEditMode ? 'put' : 'post';

    try {
      await axios[apiMethod](apiEndpoint, vod);
      alert(`VOD가 성공적으로 ${isEditMode ? '수정' : '추가'}되었습니다.`);
      navigate('/dashboard/vod-category');
    } catch (error) {
      alert('작업에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>{isEditMode ? 'VOD 카테고리 수정' : '새 VOD 카테고리 추가'}</h1>
      <form onSubmit={handleSubmit}>
        <table className="user-table">
          <tbody>
            <tr>
              <th>내용 (VODLISTTEXT)</th>
              <td><input type="text" name="vodListText" value={vod.vodListText || ''} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <th>이미지 경로 (VODLISTIMGPATH)</th>
              <td><input type="text" name="vodListImgPath" value={vod.vodListImgPath || ''} onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>성인 (IS_ADULT)</th>
              <td><input type="checkbox" name="isAdult" checked={vod.isAdult} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type="submit">{isEditMode ? '수정하기' : '추가하기'}</button>
        <button type="button" onClick={() => navigate('/dashboard/vod-category')}>취소</button>
      </form>
    </div>
  );
}

export default VODForm;