import express, { Application, json, urlencoded } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import pool from './mysql';
import cors from 'cors'

import fs from "fs";
import path from "path";

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


app.get('/cafe', async (req: express.Request, res: express.Response) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM category_cafe`);
        res.json(rows);
        
              //🔹 비동기적으로 이미지 업데이트 실행
              setTimeout(async () => {
                try {
                  const imagePath = path.join(__dirname, 'starbucks_나이트바닐라크림.jpg');
                  const imageBuffer = fs.readFileSync(imagePath);
              
                  const [result] = await pool.query(
                    `UPDATE category_cafe SET image = ? WHERE menu_name = ?`,
                    [imageBuffer, '나이트로 바닐라 크림']
                  );
              
                  
                  console.log('✅ 이미지 업로드 성공');
                 
                } catch (error) {
                  console.error('❌ 이미지 업로드 오류:', error);
                }
            }, 1000); // 🔥 응답 후 1초 뒤에 비동기 처리 (클라이언트 응답에 영향 없음)
    } catch (error) {
        console.error("DB Query Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.get('/cafe/image', async(req : express.Request, res : express.Response) => {
  try {
    const [rows]: any[] = await pool.query(
      "SELECT image FROM category_cafe WHERE menu_name = '나이트로 바닐라 크림'"
    );

    const imageBuffer = rows[0]?.image

    res.setHeader("Content-Type", "image/jpeg");
    res.send(Buffer.from(imageBuffer));

    console.log("✅ 이미지 전송 완료");
  } catch (error) {
    console.error("❌ 이미지 가져오기 오류:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
});



const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});