const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app)=>{
    app.use(createProxyMiddleware('/auth',{
        target:'http://localhost:3001/auth',
        changeOrigin:true
    }));
    app.use(createProxyMiddleware('/music',{
        target:'http://localhost:3001/music',
        changeOrigin:true
    }));
}

