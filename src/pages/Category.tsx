import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Category: { category: string };
};
type CategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

function Category({ route, navigation }: CategoryScreenProps) {
  const category = route.params?.category;

  // 📌 각 카테고리별 데이터 (추후 서버 연동 가능)
  const categoryData = {
    카페: [
      {
        id: '1',
        name: '카페 아메리카노 Tall',
        brand: '스타벅스',
        price: 3900,
        discount: '13%',
        originalPrice: 4500,
        image: require('../assets/cafe.png'),
      },
      {
        id: '2',
        name: '(HOT) 아메리카노',
        brand: '메가커피',
        price: 1250,
        discount: '17%',
        originalPrice: 1500,
        image: require('../assets/cafe.png'),
      },
      {
        id: '3',
        name: '(ICE) 아메리카노',
        brand: '메가커피',
        price: 1700,
        discount: '15%',
        originalPrice: 2000,
        image: require('../assets/cafe.png'),
      },
      {
        id: '4',
        name: '[APP 전용] e카드 5만원 교환권',
        brand: '스타벅스',
        price: 48400,
        discount: '3%',
        originalPrice: 50000,
        image: require('../assets/cafe.png'),
      },
      {
        id: '5',
        name: '아메리카노 (ICE) TAKE-OUT',
        brand: '컴포즈커피',
        price: 1350,
        discount: '10%',
        originalPrice: 1500,
        image: require('../assets/cafe.png'),
      },
    ],
    피자: [
      {
        id: '1',
        name: '페퍼로니 피자',
        brand: '피자헛',
        price: 12900,
        discount: '20%',
        originalPrice: 15900,
        image: require('../assets/cafe.png'),
      },
    ],
    치킨: [
      {
        id: '1',
        name: '황금올리브 치킨',
        brand: 'BBQ',
        price: 18000,
        discount: '10%',
        originalPrice: 20000,
        image: require('../assets/cafe.png'),
      },
    ],
  };


  // 선택한 카테고리의 상품 리스트
  const products = categoryData[category] || [];


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
        <FlatList
          data={products}
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
                <Text style={{ color: 'red', fontWeight: 'bold' }}>{item.discount} {item.price}원</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
 }

 export default Category;
