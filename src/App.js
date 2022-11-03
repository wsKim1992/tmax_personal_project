import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MUSIC_PLAYER, UPLOAD_PAGE, TITLE_PAGE, SIGN_UP, LOG_IN } from './constant/PagePath';
import MusicPlayer from "./page/MusicPlayer";
import UploadPage from "./page/UploadPage";
import Layout from "./component/Layout";
import TitlePage from "./page/TitliePage";
import SignUp from "./page/SignUp";
import LogIn from "./component/LogIn";


function App() {  
  return (
    <>
      
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path={'/'} element={<Navigate to={TITLE_PAGE} />} />
                <Route path={TITLE_PAGE} element={<TitlePage />} />
                <Route path={MUSIC_PLAYER} element={<MusicPlayer />} />
                <Route path={UPLOAD_PAGE} element={<UploadPage />} />
                <Route path={`${SIGN_UP}/*`} element={<SignUp />} />
                <Route path={`${LOG_IN}`} element={<LogIn />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
