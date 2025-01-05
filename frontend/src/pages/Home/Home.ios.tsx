import {FlatList, Image, Text, TouchableOpacity, View, TextInput, SafeAreaView} from 'react-native';

function Home({ navigation }) {
  const categories = [
    { id: 1, name: '카페', image: require('../../assets/images/cafe.png') },
    { id: 2, name: '피자', image: require('../../assets/images/pizza.png') },
    { id: 3, name: '치킨', image: require('../../assets/images/chicken.png') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: 'white' }}>
      {/* 로고 */}
        <Image
          source={require('../../assets/images/kcalmoa-logo.png')}
          style={{ width: 150, height: 50, resizeMode: 'contain', marginBottom: 10 }}
        />

        {/* 검색 바 */}
        <TouchableOpacity
          onPress={() => navigation.navigate('검색')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: 20,
            paddingHorizontal: 15,
            height: 40,
            width: '90%',
            marginBottom: 20,
          }}
        >
          <TextInput placeholder="검색어를 입력하세요." style={{ flex: 1 }} editable={false} />
          <Image source={require('../../assets/images/search.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        {/* 카테고리 리스트 */}
        <FlatList
          data={categories}
          numColumns={2} // 2열로 배치
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ alignItems: 'center', marginBottom: 30 }}
              onPress={() => navigation.navigate('Category', { category: item.name })}
            >
              <View
                style={{
                  width: 110, // 🔹 원 크기 증가
                  height: 110,
                  borderRadius: 55,
                  backgroundColor: '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 20, // 🔹 버튼 간 좌우 여백 추가
                }}
              >
                <Image source={item.image} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
              </View>
              <Text style={{ marginTop: 10, fontSize: 16 }}>{item.name}</Text> {/* 🔹 여백 증가 */}
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
