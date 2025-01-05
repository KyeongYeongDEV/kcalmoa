const admin = require('firebase-admin');
const xlsx = require('xlsx');
const fs = require('fs');

// 🔥 Firebase 서비스 계정 키 로드
const serviceAccount = require('./serviceAccountKey.json'); // 🔹 Firebase 콘솔에서 다운로드한 키 파일

// 🔥 Firebase 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/totalkcal/firestore/databases/-default-/data/~2Fkcalmoa~2Ftest' // 🔹 Firebase 프로젝트의 DB URL 입력
});

const db = admin.firestore(); // 🔹 Firestore 사용

// 📂 엑셀 파일 로드
const workbook = xlsx.readFile('./nutrition_data.xlsx'); // 🔹 업로드할 엑셀 파일 경로
const sheetName = workbook.SheetNames[0]; // 🔹 첫 번째 시트 선택
const worksheet = workbook.Sheets[sheetName];

// 📝 엑셀 데이터를 JSON으로 변환
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 🔥 Firestore에 데이터 업로드
async function uploadData() {
  try {
    const collectionRef = db.collection('kcalmoa'); // 🔹 Firestore의 "kcalmoa" 컬렉션
    for (const item of jsonData) {
      await collectionRef.add(item);
    }

    console.log('✅ Firestore 업로드 완료!');
  } catch (error) {
    console.error('❌ Firestore 업로드 실패:', error);
  }
}

// 🚀 실행
uploadData();
const firebaseConfig = {
  apiKey: "AIzaSyDVQ7vJSuPkI-2mu2GIdW0x6c-7fwE-Pas",
  authDomain: "totalkcal.firebaseapp.com",
  projectId: "totalkcal",
  storageBucket: "totalkcal.firebasestorage.app",
  messagingSenderId: "87408019647",
  appId: "1:87408019647:web:e0883c09bae84cf3ee5e0a"
};
