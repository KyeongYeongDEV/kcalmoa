import React, { useState, useEffect, useLayoutEffect, useCallback, memo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform, StyleSheet } from 'react-native';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  Category: { category: string };
};
type CategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

const Category = ({ route, navigation }: CategoryScreenProps) => {
  const category = route.params?.category || '카페';
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [starbucksData, setStarbucksData] = useState<any[]>([]);

  const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
  const initials = ["전체", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  const getInitial = (str: string) => {
    const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const code = str.charCodeAt(0) - 44032;  // 한글 유니코드 시작점에서 계산
    return code >= 0 && code <= 11171 ? CHO[Math.floor(code / 588)] : str[0]; // 초성 반환
  };

  const getBrandImage = (brand: string) => {
    //TODO : 이미지 경로 수정할 것
    switch (brand) {
      case "스타벅스":
        return require('../../assets/images/cafe.png');
      case "메가커피":
        return require('../../assets/images/cafe.png');
      case "투썸플레이스":
        return require('../../assets/images/cafe.png');
      default:
        return require('../../assets/images/cafe.png');
    }
  };

  const getProductImage = () => require('../../assets/images/cafe.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cafe`);
        setStarbucksData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
        setStarbucksData([]);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
      headerTitleAlign: 'center',
    });
  }, [navigation, category]);

  const allProducts = (Array.isArray(starbucksData) ? starbucksData : []).map((item) => ({
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

  const brands = ['전체', ...Array.from(new Set(allProducts.map((item) => item.brand)))];

  const filteredProducts = allProducts.filter((item) => {
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
    const matchesInitial = selectedInitial && selectedInitial !== "전체" ? item.initial === selectedInitial : true;
    return matchesBrand && matchesInitial;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={brands}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedBrand(item === '전체' ? null : item)}
              style={styles.brandButton}
            >
              <Image source={getBrandImage(item)} style={styles.brandImage} />
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          data={initials}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedInitial(item === "전체" ? null : item)}
              style={styles.initialButton}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProductItem = memo(({ item }: { item: any }) => (
  <View style={styles.productContainer}>
    <Image source={require('../../assets/images/cafe.png')} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productTitle}>{item.name}</Text>
      <View style={styles.nutritionTable}>
        <Text>칼로리: {item.kcal}kcal</Text>
        <Text>당류: {item.sugar}g</Text>
        <Text>단백질: {item.protein}g</Text>
        <Text>나트륨: {item.sodium}mg</Text>
        <Text>포화지방: {item.fat}g</Text>
        <Text>카페인: {item.caffeine}mg</Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  brandButton: { flexDirection: 'row', alignItems: 'center', margin: 5 },
  brandImage: { width: 20, height: 20, marginRight: 5 },
  initialButton: { paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#fff', borderRadius: 15, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 5 },
  productContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, marginVertical: 5, borderRadius: 10 },
  productImage: { width: 50, height: 50, marginRight: 15 },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
});

export default Category;
