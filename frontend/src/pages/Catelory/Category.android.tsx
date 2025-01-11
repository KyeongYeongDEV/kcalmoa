import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback, memo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const Category = ({ route, navigation }) => {
  const category = route.params?.category || '카페';
  const [selectedBrand, setSelectedBrand] = useState<string>('starbucks');
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [starbucksData, setStarbucksData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const listRef = useRef<FlatList>(null); // 🔥 FlatList의 참조 추가

  const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
  const initials = ["전체", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  const getInitial = (str: string) => {
    const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const code = str.charCodeAt(0) - 44032;
    return code >= 0 && code <= 11171 ? CHO[Math.floor(code / 588)] : str[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/cafe`);
        setStarbucksData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
        setStarbucksData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
      headerTitle: () => (
        <TouchableOpacity onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}>
          <Text style={styles.headerTitle}>{category}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, category]);

  // ✅ 전체 데이터 (useMemo 적용)
  const allProducts = useMemo(() => {
    return (Array.isArray(starbucksData) ? starbucksData : []).map((item) => ({
      id: item.id?.toString() || "0",
      name: item.menu_name,
      brand: item.brand,
      kcal: item.kcal,
      sugar: item.suger,
      protein: item.protein,
      sodium: item.sodium,
      fat: item.saturated_fat,
      caffeine: item.caffeine,
      initial: getInitial(item.menu_name),
    }));
  }, [starbucksData]);

  // ✅ 브랜드 리스트 (useMemo 적용)
  const brands = useMemo(() => Array.from(new Set(allProducts.map((item) => item.brand))), [allProducts]);


  // ✅ 필터링된 데이터 (useMemo 적용)
  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
      const matchesInitial = selectedInitial && selectedInitial !== "전체" ? item.initial === selectedInitial : true;
      return matchesBrand && matchesInitial;
    });
  }, [selectedBrand, selectedInitial, allProducts]);

  // ✅ 브랜드 선택 최적화 (useCallback 적용)
  const handleBrandSelect = useCallback((brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? null : brand));
  }, []);

  // ✅ 이미지 데이터 (객체로 저장, 불필요한 `useMemo` 제거)
  const brandImages = {
    starbucks: require('../../assets/images/starbucks-logo.png'),
    compose: require('../../assets/images/compose-logo.png'),
    default: require('../../assets/images/cafe.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          {/* ✅ 브랜드 선택 리스트 */}
          <FlatList
            data={brands}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleBrandSelect(item)} style={styles.brandButton}>
                <Image source={brandImages[item] || brandImages.default} style={styles.brandImage} />
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* ✅ 초성 선택 리스트 */}
          <FlatList
            data={initials}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedInitial(item === "전체" ? null : item)} style={styles.initialButton}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* ✅ 제품 리스트 */}
          <FlatList
            ref={listRef} // 🔥 리스트의 ref 연결
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Image source={brandImages[item.brand] || brandImages.default} style={styles.productImage} />
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
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  brandButton: { flexDirection: 'row', alignItems: 'center', margin: 5 },
  brandImage: { width: 20, height: 20, marginRight: 5 },
  initialButton: {
    width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 5,
  },
  productContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, marginVertical: 5, borderRadius: 10 },
  productImage: { width: 50, height: 50, marginRight: 15 },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  nutritionText: { fontSize: 12, marginVertical: 2 },
  nutritionTable: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  /* ✅ 영양정보 한 줄 (2개씩) */
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  /* ✅ 영양정보 스타일 */
  nutritionText: {
    fontSize: 12,
    width: '48%', // 한 줄에 두 개 배치되도록 설정
  },
});

export default Category;
