import React, { useState, useEffect, useMemo } from 'react';
import {
  TextInput, View, FlatList, Text, Image,
  StyleSheet, ActivityIndicator, Platform
} from 'react-native';
import axios from 'axios';

// ✅ API 기본 URL 설정 (에뮬레이터 환경 고려)
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

// ✅ 브랜드별 로고 이미지를 가져오는 함수
const getBrandImage = (brand: string) => {
  const images: { [key: string]: any } = {
    starbucks: require('../../assets/images/starbucks-logo.png'),
    compose: require('../../assets/images/compose-logo.png'),
    default: require('../../assets/images/cafe.png'),
  };
  return images[brand] || images.default;
};

// ✅ 검색 화면 컴포넌트
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ API에서 음료 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await axios.get(`${BASE_URL}/cafe`); // API 요청
        setMenuData(Array.isArray(response.data) ? response.data : []); // 응답 데이터 저장
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchData();
  }, []);

  // ✅ 검색어에 맞는 메뉴 필터링
  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => item.menu_name.includes(searchText));
  }, [searchText, menuData]);

  return (
    <View style={styles.container}>
      {/* 🔍 검색 입력창 */}
      <TextInput
        placeholder="메뉴명을 입력하세요"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText} // 실시간 업데이트
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        // ✅ 검색 결과 목록 (FlatList 사용)
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              {/* ✅ brandImages 대신 getBrandImage 사용 */}
              <Image source={getBrandImage(item.brand)} style={styles.productImage} />
              <View style={styles.productInfo}>
                {/* 제품명 */}
                <Text style={styles.productTitle}>{item.menu_name}</Text>

                {/* ✅ 영양정보를 가로 2개 x 세로 3개로 정렬 */}
                <View style={styles.nutritionTable}>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionText}>칼로리: {item.kcal}kcal</Text>
                    <Text style={styles.nutritionText}>당류: {item.suger}g</Text>
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

          // 🔥 ListEmptyComponent 수정: 문자열을 <Text>로 감싸줌
          ListEmptyComponent={
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          }
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
  },
  searchInput: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 5,
    width: 300
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  nutritionTable: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nutritionText: {
    fontSize: 12,
    width: '48%', // 한 줄에 두 개 배치되도록 설정
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20
  },
});

// ✅ Search 컴포넌트 내보내기
export default Search;
