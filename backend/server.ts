import express, { Application, json, urlencoded, Response, Request } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import pool from './mysql'; 

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', (req : Request, res : Response) => {
    res.send('<h1>main page</h1>')
})

app.get('/cafe', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM category_cafe`);
        console.log(rows); // 🔹 데이터 확인
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
