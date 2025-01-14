import pool from './mysql';
import fs from "fs";
import path from "path";

// 이미지 업데이트 함수
async function updateImage() {
  
}

// 이미지 불러오기 함수
async function fetchImage(menuName: string, outputPath: string) {
  try {
    // 이미지 가져오기 쿼리
    const [rows]: any = await pool.query(
      "SELECT image_data FROM category_cafe WHERE menu_name = ?",
      [menuName]
    );

    if (rows.length > 0) {
      const imageBuffer = rows[0].image_data;

      // 파일로 저장
      fs.writeFileSync(outputPath, imageBuffer);

      console.log("✅ Image fetched and saved successfully:", outputPath);
    } else {
      console.log("❌ No image found with the given menu name.");
    }
  } catch (error) {
    console.error("❌ Error fetching image:", error);
  }
}

// 테스트 실행
(async () => {
  const outputPath = path.join(__dirname, "output_image.png"); // 저장할 이미지 경로

  // 이미지 업데이트
  await updateImage();

  // 이미지 불러오기
  await fetchImage("나이트로 바닐라 크림", outputPath);
})();
