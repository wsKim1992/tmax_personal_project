import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MUSIC_PLAYER, UPLOAD_PAGE } from './constant/PagePath';
import MusicPlayer from "./page/MusicPlayer";
import UploadPage from "./page/UploadPage";
import Layout from "./component/Layout";

function App() {
  return (
    <>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={'/'} element={<Navigate to={MUSIC_PLAYER} />} />
            <Route path={MUSIC_PLAYER} element={<MusicPlayer />} />
            <Route path={UPLOAD_PAGE} element={<UploadPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </>
  );
}

export default App;
