


const http = require('http');

// app 변수에 app.js를 대입
const app = require('./app');
//const app = require('express');

// port 변수에 기본 프로세스 포트 또는 3000번 포트를 지정
const port = process.env.PORT || 3000;

// server 변수에 서버를 만들어준다
const server = http.createServer(app);

//서버 실행
server.listen(port);


