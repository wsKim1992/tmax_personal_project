import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle,ThemeProvider} from 'styled-components';
import { Provider } from 'mobx-react';
import uploadStore from './store/UploadStore';

const GlobalStyle = createGlobalStyle`
:root{
    --header-main:35.5px;
    --header-menu:18.5px;
    --header-search:12.5px;
	--body-large-text:25.5px;
	--body-middle-text:20.5px;
	--body-text:11.5px;
	--body-icon:22.5px;
	--body-music-info:22.5px;
	--body-form-text:14.5px;

	--tablet-header-main:25.5px;
    --tablet-header-menu:18.5px;
    --tablet-header-search:8.5px;
	--tablet-body-text:11.5px;
	--tablet-body-icon:15.5px;
	--tablet-body-music-info:22.5px;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
a {color: #fff; text-decoration: none; outline: none}
a:hover, a:active {text-decoration: none; color:#fff; }
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input:focus {outline: none;} 
button{
	outline:none;
	border:none;
}
select{
	outline:none;
	border:none;
}
`;

const basicTheme = {
  headerBgColor:'#232323',
  bodyBgColor:'#1D1D1D',
  emphasize:'#FF4D5C',
  headerMenuFontColor:'#FFF'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
		<ThemeProvider theme={basicTheme}>
		<App />
		</ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
