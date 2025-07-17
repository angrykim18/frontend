import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VODCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    vodCategory: '',
    vodTableTitle: ''
    // 다른 필드들은 필요 시 여기에 추가
  });
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      // 수정 모드일 때 기존 카테고리 정보를 불러오는 API가 아직 없으므로,
      // 이 부분은 나중에 백엔드에 기능 추가 후 구현합니다.
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = isEditMode ? `http://localhost:8081/api/vod-categories/${id}` : 'http://localhost:8081/api/vod-categories';
    const apiMethod = isEditMode ? 'put' : 'post';

    try {
      await axios[apiMethod](apiEndpoint, category);
      alert(`카테고리가 성공적으로 ${isEditMode ? '수정' : '추가'}되었습니다.`);
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
              <th>카테고리 (VODCATEGORY)</th>
              <td><input type="text" name="vodCategory" value={category.vodCategory} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <th>카테고리 제목 (VODTABLETITLE)</th>
              <td><input type="text" name="vodTableTitle" value={category.vodTableTitle} onChange={handleChange} required /></td>
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

export default VODCategoryForm;