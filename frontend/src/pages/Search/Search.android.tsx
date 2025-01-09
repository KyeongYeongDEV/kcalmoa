import React, { useState, useEffect, useMemo } from 'react';
import { TextInput, View, FlatList, Text, Image, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

const getBrandImage = (brand: string) => {
  const images: { [key: string]: any } = {
    starbucks: require('../../assets/images/starbucks-logo.png'),
    compose: require('../../assets/images/compose-logo.png'),
    default: require('../../assets/images/cafe.png'),
  };
  return images[brand] || images.default;
};

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/cafe`);
        setMenuData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔥 검색어가 포함된 메뉴만 필터링
  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => item.menu_name.includes(searchText));
  }, [searchText, menuData]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="메뉴명을 입력하세요"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={getBrandImage(item.brand)} style={styles.image} />
              <View>
                <Text style={styles.itemText}>{item.menu_name}</Text>
                <Text style={styles.nutritionText}>칼로리: {item.kcal}kcal</Text>
                <Text style={styles.nutritionText}>당류: {item.suger}g</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>검색 결과가 없습니다.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical: 20, backgroundColor: 'white' },
  searchInput: { borderWidth: 1, width: 300, padding: 10, borderRadius: 8, marginBottom: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8, marginVertical: 5, width: 300 },
  image: { width: 40, height: 40, marginRight: 10 },
  itemText: { fontSize: 16, fontWeight: 'bold' },
  nutritionText: { fontSize: 12, color: 'gray' },
  emptyText: { fontSize: 16, color: 'gray', marginTop: 20 },
});

export default Search;
