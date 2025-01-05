import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Category: { category: string };
};
type CategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

function Category({ route, navigation }: CategoryScreenProps) {
  const category = route.params?.category || '카페';

  // 브랜드 필터 상태
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // 📌 각 카테고리별 데이터
  const categoryData = {
    카페: [
      {
        id: '1',
        name: '카페 아메리카노 Tall',
        brand: '스타벅스',
        price: 3900,
        discount: '13%',
        originalPrice: 4500,
        image: require('../../assets/images/cafe.png'),
      },
      {
        id: '2',
        name: '(HOT) 아메리카노',
        brand: '메가커피',
        price: 1250,
        discount: '17%',
        originalPrice: 1500,
        image: require('../../assets/images/cafe.png'),
      },
      {
        id: '3',
        name: '(ICE) 아메리카노',
        brand: '메가커피',
        price: 1700,
        discount: '15%',
        originalPrice: 2000,
        image: require('../../assets/images/cafe.png'),
      },
      {
        id: '4',
        name: '[APP 전용] e카드 5만원 교환권',
        brand: '스타벅스',
        price: 48400,
        discount: '3%',
        originalPrice: 50000,
        image: require('../../assets/images/cafe.png'),
      },
      {
        id: '5',
        name: '아메리카노 (ICE) TAKE-OUT',
        brand: '컴포즈커피',
        price: 1350,
        discount: '10%',
        originalPrice: 1500,
        image: require('../../assets/images/cafe.png'),
      },
    ],
    피자: [
      {
        id: '6',
        name: '페퍼로니 피자',
        brand: '피자헛',
        price: 12900,
        discount: '20%',
        originalPrice: 15900,
        image: require('../../assets/images/cafe.png'),
      },
    ],
    치킨: [
      {
        id: '7',
        name: '황금올리브 치킨',
        brand: 'BBQ',
        price: 18000,
        discount: '10%',
        originalPrice: 20000,
        image: require('../../assets/images/cafe.png'),
      },
    ],
  };

  // 선택한 카테고리의 상품 리스트
  const allProducts = categoryData[category] || [];

  // 📌 브랜드 목록 추출 (중복 제거)
  const brands = ['전체', ...Array.from(new Set(allProducts.map((item) => item.brand)))];

  // 선택된 브랜드 필터 적용
  const filteredProducts = selectedBrand && selectedBrand !== '전체'
    ? allProducts.filter((item) => item.brand === selectedBrand)
    : allProducts;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
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
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: 10,
                marginVertical: 5,
                borderRadius: 10,
              }}>
                <Image source={item.image} style={{ width: 50, height: 50, marginRight: 15 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.brand}</Text>
                  <Text>{item.name}</Text>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    {item.discount} {item.price.toLocaleString()}원
                  </Text>
                </View>
              </View>
            )}
          />

          {/* 안내 문구 */}
          <Text style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 20 }}>
            이 데이터는 {selectedBrand || '해당 브랜드'} 공식 웹사이트에서 제공된 정보이며,
            실제 영양성분과 다를 수 있습니다. 보다 정확한 정보는
            {selectedBrand || '해당 브랜드'}의 공식 자료를 참고하세요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Category;
