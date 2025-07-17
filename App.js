import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 로그인 페이지들
import Login from './Login';
import AgencyLogin from './AgencyLogin';

// 레이아웃
import DashboardLayout from './components/layout/DashboardLayout';
import AgencyDashboardLayout from './components/layout/AgencyDashboardLayout';

// 모든 관리 페이지 컴포넌트들을 불러옵니다.
import UserManagement from './components/UserManagement';
import UserEdit from './components/UserEdit';
import UserGroupManagement from './components/UserGroupManagement';
import UserGroupForm from './components/UserGroupForm';
import ServerManagement from './components/ServerManagement';
import ServerForm from './components/ServerForm';
import LiveManagement from './components/LiveManagement';
import LiveChannelForm from './components/LiveChannelForm';
import VODCategoryManagement from './components/VODCategoryManagement';
import VODCategoryForm from './components/VODCategoryForm';
import AdManagement from './components/AdManagement';
import AdForm from './components/AdForm';
import NoticeManagement from './components/NoticeManagement';
import NoticeForm from './components/NoticeForm';
import AgencyManagement from './components/AgencyManagement';
import AgencyForm from './components/AgencyForm';
import AppUpdateManagement from './components/AppUpdateManagement';
import AppUpdateForm from './components/AppUpdateForm';
import LogManagement from './components/LogManagement';
import AgencyUserManagement from './components/AgencyUserManagement'; // ✅ 이 import 문이 누락되었습니다.

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 경로 */}
        <Route path="/login" element={<Login />} />
        <Route path="/agency-login" element={<AgencyLogin />} />
        
        {/* 최고 관리자 대시보드 */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="groups" element={<UserGroupManagement />} />
          <Route path="group/new" element={<UserGroupForm />} />
          <Route path="group/edit/:id" element={<UserGroupForm />} />
          <Route path="servers" element={<ServerManagement />} />
          <Route path="server/new" element={<ServerForm />} />
          <Route path="server/edit/:id" element={<ServerForm />} />
          <Route path="live" element={<LiveManagement />} />
          <Route path="live/new" element={<LiveChannelForm />} />
          <Route path="live/edit/:id" element={<LiveChannelForm />} />
          <Route path="vod-category" element={<VODCategoryManagement />} />
          <Route path="vod-category/new" element={<VODCategoryForm />} />
          <Route path="vod-category/edit/:id" element={<VODCategoryForm />} />
          <Route path="ads" element={<AdManagement />} />
          <Route path="ad/new" element={<AdForm />} />
          <Route path="ad/edit/:id" element={<AdForm />} />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="notice/new" element={<NoticeForm />} />
          <Route path="notice/edit/:id" element={<NoticeForm />} />
          <Route path="agencies" element={<AgencyManagement />} />
          <Route path="agency/new" element={<AgencyForm />} />
          <Route path="agency/edit/:id" element={<AgencyForm />} />
          <Route path="updates" element={<AppUpdateManagement />} />
          <Route path="update/new" element={<AppUpdateForm />} />
          <Route path="logs" element={<LogManagement />} />
        </Route>

        {/* 대리점 관리자 대시보드 */}
        <Route path="/agency-dashboard" element={<AgencyDashboardLayout />}>
           {/* 대리점 전용 사용자 관리 페이지를 연결합니다. */}
          <Route path="users" element={<AgencyUserManagement />} />
        </Route>
        
        {/* 가장 처음 접속 시 최고 관리자 로그인 페이지로 자동 이동 */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;