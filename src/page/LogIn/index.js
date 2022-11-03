import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MUSIC_PLAYER, UPLOAD_PAGE, TITLE_PAGE, SIGN_UP,LOG_IN} from './constant/PagePath';
const EmailAuthPage = () => {
    return (
        <div className="SignUp-Entire-Container">
            SignUp Page

        </div>
    )
}

const LogIn = observer(() => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div>
        </div>
    )
})

export default LogIn;
