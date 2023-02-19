import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';

// Layout
import Layout from './components/layout/Layout';
// Layout

// Importing Pages
import LoginPage from './pages/LoginPage';
import ErrorPage, { GoTo404 } from './pages/ErrorPage';
import ManageStudentPage from './pages/ManageStudentPage';
import ManageTeacherPage from './pages/ManageTeacherPage';
import ManageFacultyPage from './pages/ManageFacultyPage';
import ManageCoursePage from './pages/ManageCoursePage';
import ManageAdminPage from './pages/ManageAdminPage';
// Importing Pages

// Redux store
import store from './redux/store';
import Cookies from 'universal-cookie';
import useSession from './hooks/useSession';
// Redux store


// -- Styled Components --
const AppContainer = styled(Box)`
  width: 100%;
  min-width: 1200px;
`;
// -- Styled Components --

/**
 * Returns JSX.Element the skeleton for the whole LMS Application
 * Note: The AppContext is accessible every where in the application.
 * 
 * @params - none
 * @returns - JSX.Element, Skeleton structure for the Whole LMS Application
 */
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getSession } = useSession('admin_session');
  
  useEffect(() => {
    const cookies = new Cookies();
    if (!(cookies.get('admin_token') && getSession())) {
      navigate('/login');
    } else if (location.pathname === '/login' || location.pathname === '/') {
      navigate('/admin/');
    }
  }, [location.pathname]); 
  // Don't include navigate and location (Will cause "throttling navigation to prevent the browser form hanging" side effect)

  return (
    <>
      <Provider store={store}>
        <AppContainer>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* After login */}
            <Route path="/admin/*" element={
              <Layout>
                <Routes>
                  <Route path="/manage-student" element={<ManageStudentPage />} />

                  <Route path="/manage-teacher" element={<ManageTeacherPage />} />

                  <Route path="/manage-faculty" element={<ManageFacultyPage />} />

                  <Route path="/manage-course" element={<ManageCoursePage />} />

                  <Route path="/manage-admin" element={<ManageAdminPage />} />

                  <Route path="/*" element={<GoTo404 />} />
                </Routes>
              </Layout>
            } />

            {/* 404 Page not found */}
            <Route path="*" element={<ErrorPage />} />
            {/* 404 Page not found */}

          </Routes>
        </AppContainer>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
