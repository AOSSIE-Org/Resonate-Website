
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './features/auth/ProtectedRoute';
import MainLayout from './features/layout/MainLayout';
import Auth from './pages/Auth';
import Home from './pages/Home';

import CreatePost from './features/feed/CreatePost';
import Profile from './pages/Profile';
import AudioRoom from './features/audio/AudioRoom';
import RandomChat from './features/connect/RandomChat';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="explore" element={<div style={{ padding: 20 }}>Explore Page (Coming Soon)</div>} />
            <Route path="create" element={<CreatePost />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connect" element={<RandomChat />} />
          </Route>

          <Route path="/room/:id" element={<ProtectedRoute><AudioRoom /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
