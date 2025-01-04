import {FlatList, Image, Text, TouchableOpacity, View, TextInput, SafeAreaView} from 'react-native';

function Home({ navigation }) {
  const categories = [
    { id: 1, name: '카페', image: require('../assets/cafe.png') },
    { id: 2, name: '피자', image: require('../assets/pizza.png') },
    { id: 3, name: '치킨', image: require('../assets/chicken.png') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: 'white' }}>
      {/* 로고 */}
        <Image
          source={require('../assets/kcalmoa-logo.png')}
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
          <Image source={require('../assets/search.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        {/* 카테고리 리스트 */}
        <FlatList
          data={categories}
          numColumns={2} // 2열로 배치
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: 'space-around' }} // 아이템 간격 조정
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ alignItems: 'center', marginBottom: 20 }}
              onPress={() => navigation.navigate('카테고리', { category: item.name })}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image source={item.image} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
              </View>
              <Text style={{ marginTop: 5, fontSize: 16 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
