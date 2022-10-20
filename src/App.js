import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate,useRoutes } from 'react-router-dom';

import { MUSIC_PLAYER, UPLOAD_PAGE, TITLE_PAGE, SIGN_UP,SIGNUP_EMAIL_AUTH,
  SIGNUP_AUTH_NUMBER,SINGUP_TYPE_PASSWORD } from './constant/PagePath';
import MusicPlayer from "./page/MusicPlayer";
import UploadPage from "./page/UploadPage";
import Layout from "./component/Layout";
import TitlePage from "./page/TitliePage";
import SignUp from "./page/SignUp";

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
            <Route path={`${SIGN_UP}/*`} element={<SignUp/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>

    </>
  );
}

export default App;
