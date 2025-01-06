import express, { Application, json, urlencoded, Response, Request } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import pool from './mysql';
import cors from 'cors'

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));

// ✅ CORS 요청을 로깅하는 미들웨어 추가
app.use((req, res, next) => {
    console.log(`🛑 CORS Request: ${req.method} ${req.originalUrl} from ${req.headers.origin}`);
    next();
});

// ✅ CORS 설정
app.use(cors({
    origin: '*',  // 모든 도메인 허용 (보안상 필요에 따라 특정 도메인으로 제한 가능)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드 지정
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더 지정
}));



app.get('/cafe', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM category_cafe`);
        res.json(rows);
    } catch (error) {
        console.error("DB Query Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
