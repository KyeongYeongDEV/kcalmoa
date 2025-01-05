import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ✅ model/cafe 폴더의 모든 JSON 파일을 import
import starbucksData from '../../assets/model/cafe/starbuks.json';
import megaCoffeeData from '../../assets/model/cafe/mega.json';

type RootStackParamList = {
  Home: undefined;
  Category: { category: string };
};
type CategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

function Category({ route, navigation }: CategoryScreenProps) {
  const category = route.params?.category || '카페';
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // ✅ useLayoutEffect를 사용해 네비게이션 제목을 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: category,
      headerTitleAlign: 'center',
    });
  }, [navigation, category]);

  // ✅ 여러 JSON 파일을 통합하여 하나의 데이터로 변환
  const allProducts = [
    ...starbucksData.StarbucksData.map((item) => ({
      id: item.번호.toString(),
      name: item.메뉴,
      brand: '스타벅스',
      price: item['칼로리(Kcal)'], // 칼로리를 가격처럼 사용 (실제 데이터에 맞게 수정 가능)
      sugar: item['당류(g)'],
      protein: item['단백질(g)'],
      sodium: item['나트륨(mg)'],
      fat: item['포화지방(g)'],
      caffeine: item['카페인(mg)'],
      originalPrice: 1500, // 원래 가격 (가정)
      image: require('../../assets/images/cafe.png'),
    })),
    ...megaCoffeeData.MegaCoffeeData.map((item) => ({
      id: item.번호.toString(),
      name: item.메뉴,
      brand: '메가커피',
      price: item['칼로리(Kcal)'],
      sugar: item['당류(g)'],
      protein: item['단백질(g)'],
      sodium: item['나트륨(mg)'],
      fat: item['포화지방(g)'],
      caffeine: item['카페인(mg)'],
      originalPrice: 1500,
      image: require('../../assets/images/cafe.png'),
    })),
  ];

  // ✅ 브랜드 필터링
  const brands = ['전체', ...Array.from(new Set(allProducts.map((item) => item.brand)))];

  const filteredProducts =
    selectedBrand && selectedBrand !== '전체'
      ? allProducts.filter((item) => item.brand === selectedBrand)
      : allProducts;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
          {/* 브랜드 필터 */}
          <FlatList
            data={brands}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedBrand(item === '전체' ? null : item)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  backgroundColor: selectedBrand === item ? '#ddd' : '#fff',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image source={require('../../assets/images/cafe.png')} style={{ width: 15, height: 15, marginRight: 5 }} />
                <Text style={{ fontSize: 14 }}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* 제품 리스트 */}
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Image source={item.image} style={{ width: 50, height: 50, marginRight: 15 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.brand}</Text>
                  <Text>{item.name}</Text>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    {item.discount} {item.price.toLocaleString()}원
                  </Text>
                  <Text style={{ fontSize: 12 }}>당류: {item.sugar}g | 단백질: {item.protein}g | 나트륨: {item.sodium}mg | 포화지방: {item.fat}g | 카페인: {item.caffeine}mg</Text>
                </View>
              </View>
            )}
          />

          {/* 안내 문구 */}
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 20 }}>
            이 데이터는 {selectedBrand || '해당 브랜드'} 공식 웹사이트에서 제공된 정보이며,
            실제 영양성분과 다를 수 있습니다. 보다 정확한 정보는 {selectedBrand || '해당 브랜드'}의 공식 자료를 참고하세요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Category;
