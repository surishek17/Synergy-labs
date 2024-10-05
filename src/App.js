import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      {/* Toast Container for Notifications */}
      <ToastContainer />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Home Route - List of Users */}
          <Route path="/" element={<UserList />} />
          
          {/* User Detail Route */}
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

