import React, { useState, useEffect, useMemo } from 'react';
import {
  TextInput, View, FlatList, Text, Image,
  StyleSheet, ActivityIndicator, Platform
} from 'react-native';
import axios from 'axios';

// ✅ API 기본 URL 설정 (에뮬레이터 환경 고려)
// Android 에뮬레이터에서는 localhost 대신 '10.0.2.2'를 사용해야 함
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

// ✅ 브랜드별 로고 이미지를 가져오는 함수
const getBrandImage = (brand: string) => {
  // 브랜드별 이미지 매핑
  const images: { [key: string]: any } = {
    starbucks: require('../../assets/images/starbucks-logo.png'), // 스타벅스 로고
    compose: require('../../assets/images/compose-logo.png'), // 컴포즈 커피 로고
    default: require('../../assets/images/cafe.png'), // 기본 로고 (해당 브랜드가 없을 때 사용)
  };
  return images[brand] || images.default; // 존재하지 않는 브랜드는 기본 이미지 반환
};

// ✅ 검색 화면 컴포넌트
const Search = () => {
  // 🔹 검색어 상태 관리 (사용자가 입력한 검색어를 저장)
  const [searchText, setSearchText] = useState('');

  // 🔹 API에서 불러온 전체 메뉴 데이터 상태 관리
  const [menuData, setMenuData] = useState<any[]>([]);

  // 🔹 로딩 상태 관리 (API 요청 중 로딩 표시)
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ API에서 음료 데이터 가져오기 (앱 실행 시 한 번만 실행)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 🔄 로딩 시작
        const response = await axios.get(`${BASE_URL}/cafe`); // API 요청
        setMenuData(Array.isArray(response.data) ? response.data : []); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("🚨 Error fetching data:", error); // 에러 발생 시 콘솔에 출력
      } finally {
        setLoading(false); // 🔄 로딩 종료
      }
    };
    fetchData(); // API 요청 함수 호출
  }, []); // 처음 한 번만 실행 (의존성 배열이 빈 상태)

  // ✅ 검색어에 맞는 메뉴 필터링 (useMemo 사용하여 최적화)
  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => item.menu_name.includes(searchText)); // 검색어가 포함된 메뉴만 필터링
  }, [searchText, menuData]); // 검색어 또는 데이터가 변경될 때만 실행됨

  return (
    <View style={styles.container}>
      {/* 🔍 검색 입력창 */}
      <TextInput
        placeholder="메뉴명을 입력하세요" // 입력창 기본 문구
        style={styles.searchInput} // 스타일 적용
        value={searchText} // 현재 입력된 값
        onChangeText={setSearchText} // 입력 값이 변경될 때마다 상태 업데이트
      />

      {/* ⏳ 데이터 로딩 중이면 로딩 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        // ✅ 검색 결과 목록 (FlatList 사용)
        <FlatList
          data={filteredMenu} // 필터링된 메뉴 데이터
          keyExtractor={(item) => item.id.toString()} // 각 항목의 고유 키 설정
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* 브랜드 로고 이미지 */}
              <Image source={getBrandImage(item.brand)} style={styles.image} />

              {/* 음료 정보 */}
              <View style={styles.productInfo}>
                {/* 제품명 */}
                <Text style={styles.productTitle}>{item.name}</Text>

                {/* ✅ 영양정보를 가로 2개 x 세로 3개로 정렬 */}
                <View style={styles.nutritionTable}>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionText}>칼로리: {item.kcal}kcal</Text>
                    <Text style={styles.nutritionText}>당류: {item.sugar}g</Text>
                  </View>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionText}>단백질: {item.protein}g</Text>
                    <Text style={styles.nutritionText}>카페인: {item.caffeine}mg</Text>
                  </View>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionText}>포화지방: {item.fat}g</Text>
                    <Text style={styles.nutritionText}>나트륨: {item.sodium}mg</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          // 🔥 검색 결과가 없을 때 표시할 UI
          ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
        />
      )}
    </View>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white'
  }, // 전체 컨테이너 스타일

  searchInput: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }, // 검색 입력창 스타일

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, // 로딩 인디케이터 스타일

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 5,
    width: 300
  }, // 메뉴 아이템 컨테이너 스타일

  image: {
    width: 40,
    height: 40,
    marginRight: 10
  }, // 브랜드 로고 이미지 스타일

  itemText: {
    fontSize: 16,
    fontWeight: 'bold'
  }, // 메뉴 이름 스타일

  nutritionText: {
    fontSize: 12,
    color: 'gray'
  }, // 영양 정보 스타일

  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20
  }, // 검색 결과 없을 때 표시할 텍스트 스타일
  /* ✅ 영양정보 한 줄 (2개씩) */
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginTop : 2,
  },

  /* ✅ 영양정보 스타일 */
  nutritionText: {
    fontSize: 12,
    width: '48%', // 한 줄에 두 개 배치되도록 설정
  },
});


// ✅ Search 컴포넌트 내보내기 (다른 곳에서 사용 가능)
export default Search;
