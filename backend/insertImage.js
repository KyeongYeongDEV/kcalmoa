import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    waitForConnections: true,
    queueLimit: 0,
});


const model = [
  "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000479]_20210426091843897.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002081]_20210415133656839.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000002093]_20240318144604476.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/05/[9200000005282]_20240509131200017.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000003661]_20241230131104423.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003285]_20210416154437069.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[9200000005616]_20241014134021881.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004770]_20230720103902092.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001635]_20210225092236748.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005378]_20240701133238491.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[106509]_20210430111852870.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[2]_20210430111934117.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000005750]_20250102155529244.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000005747]_20250102154412049.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[25]_20210415144211211.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005514]_20240919154516844.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005516]_20240919154833807.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110582]_20210415142706078.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[126197]_20210415154609863.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110601]_20210415143400773.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[38]_20210415154821846.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004120]_20220412082952150.png",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001939]_20210225094313315.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000002095]_20240318144701881.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005518]_20240919154933695.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005522]_20240919155344866.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128692]_20210426091933665.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004120]_20220412082952150.png",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001941]_20210225094346653.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005520]_20240919155241283.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000005523]_20240919155443058.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128695]_20210426092031969.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/05/[9200000005285]_20240509131125335.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110569]_20210415143035989.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/05/[9200000005284]_20240509131037171.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[41]_20210415133833725.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/08/[9200000005292]_20240801084836627.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[110566]_20241230125324879.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[110572]_20241230125516245.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[46]_20210415134438165.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004313]_20221005145156959.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128192]_20210415155639126.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005181]_20240326103832835.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005178]_20240326103727795.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110612]_20210415133425373.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002950]_20210426150654756.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003505]_20210322093241535.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/03/[9200000003506]_20210322093317854.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002953]_20210427132718157.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[20]_20210415144112678.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9900000001604]_20240909104819181.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110611]_20210415132507539.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001631]_20210225090916684.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110614]_20210415132333109.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000002760]_20241230130417719.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168007]_20210415144337428.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[168016]_20241230125952201.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[168010]_20241230140412038.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/06/[9200000005369]_20240614143554454.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/06/[9200000005367]_20240612090850191.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2020/09/[9200000002088]_20200921171733532.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000002502]_20241230130243924.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002090]_20220329144732789.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[168066]_20241230140550488.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002403]_20210419131548656.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/02/[9200000004512]_20230207150514347.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000004716]_20241206095107879.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004870]_20230905110300360.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005377]_20240701133052473.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003276]_20210416154001403.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[169001]_20210419130701792.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005379]_20240709130615114.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004871]_20230922091835355.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/05/[9200000004780]_20240527130611426.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/08/[9200000003763]_20220803131322551.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004753]_20230720103623021.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/08/[9200000005168]_20240812152235363.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/05/[9200000005283]_20240509131233446.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/01/[9200000004948]_20240103144748363.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/09/[9200000004751]_20230907153225204.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[9200000005588]_20241017130009134.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/01/[9200000004946]_20240103144959834.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000004947]_20231005084610514.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[107051]_20210419112151972.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000005771]_20250102160452093.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000005774]_20250102160600312.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000056]_20210415135215632.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000059]_20210415141656038.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000039]_20210415142055860.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/08/[9200000000229]_20240813134939709.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002959]_20220411155904911.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000019]_20210415142323353.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000094]_20210415230316469.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000004944]_20231005084446254.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000079]_20210415143641139.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000069]_20210415143811231.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000036]_20210415143933425.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000226]_20210415144434521.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000002956]_20220411155551915.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000016]_20210415153648533.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000187]_20210419131229539.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[400400000091]_20210415132229904.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/10/[9200000004943]_20231005084424843.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000076]_20210415154920731.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[4004000000066]_20210415155836395.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/04/[9200000004566]_20230407153247174.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/12/[9200000004990]_20231212110704134.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005310]_20240717132942737.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005307]_20240717132740902.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/07/[9200000005304]_20240717132620949.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/12/[9200000004991]_20231212110749533.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000190]_20210419131723532.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/07/[9200000004769]_20230720103743478.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/11/[9200000004954]_20231127093740735.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000004933]_20250102105625904.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000004942]_20241230131438471.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/11/[9200000004955]_20231127093837610.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2025/01/[9200000004936]_20250102105828900.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[9200000005590]_20241017130203194.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002499]_20210419130902541.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[9200000005589]_20241017130107685.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002496]_20210419131039350.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/12/[9200000004939]_20241231101450771.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/12/[9200000004950]_20231204090636952.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110621]_20210415140901611.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/11/[9200000004953]_20231127094019543.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/11/[9200000004952]_20231127093937845.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003658]_20210422080248176.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002594]_20210422080327783.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2023/11/[9200000004951]_20231102101647442.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003659]_20210428134252131.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[17]_20210426095334934.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[18]_20210426095514018.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9200000004957]_20240911104427249.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9300000004346]_20240328133443928.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9300000004347]_20240328133658258.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9300000005406]_20240905084511440.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9300000004348]_20240328133830383.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[5210008070]_20240923184905035.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[5210008061]_20241031123748556.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9300000005405]_20240905084714529.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9300000003771]_20240923184306693.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003772]_20211020095105008.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[5210008072]_20210426100712780.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/10/[5210008055]_20241031123524702.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[9300000002565]_20240923184651121.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9300000004407]_20221027102828231.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2021/10/[9300000003775]_20211020094208342.jpg",
"https://image.istarbucks.co.kr/upload/store/skuimg/2024/09/[5210008063]_20240923185114500.jpg",
];
  
async function updateImage() {
  try {
    for(let i = 1; i <= model.length; i++) {
      await pool.query(
        `UPDATE category_cafe 
          SET image = ?
          WHERE id = ?;`,
        [model[i-1], i]);
    }
     
  } catch (error) {
    console.error("❌ Error fetching image:", error);
  }
}
















// 테스트 실행
(async () => {
  

  await updateImage();
})();

