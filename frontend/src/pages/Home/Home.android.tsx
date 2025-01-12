import { FlatList, Image, Text, TouchableOpacity, View, TextInput, SafeAreaView } from 'react-native';

function Home({ navigation }) {
  const categories = [
    { id: 1, name: '카페', image: require('../../assets/images/cafe.png') },
    { id: 2, name: '피자', image: require('../../assets/images/pizza.png') },
    { id: 3, name: '치킨', image: require('../../assets/images/chicken.png') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20, backgroundColor: 'white' }}>

        {/* 로고 */}
        <Image
          source={require('../../assets/images/kcalmoa-logo.png')}
          style={{ width: 150, height: 50, resizeMode: 'contain', marginBottom: 20 }}
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
            marginBottom: 30,
          }}
        >
          <TextInput placeholder="검색어를 입력하세요." style={{ flex: 1, fontSize: 14 }} editable={false} />
          <Image source={require('../../assets/images/search.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        {/* 카테고리 리스트 */}
        <FlatList
          data={categories}
          numColumns={2} // 2열 배치
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between', // 🔹 버튼을 균등하게 배치
            paddingHorizontal: 20, // 🔹 좌우 여백 추가
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ alignItems: 'center', marginBottom: 30, marginHorizontal: 20 }} // 🔹 버튼 간 여백 추가
              onPress={() => navigation.navigate('Category', { category: item.name })}
            >
              <View
                style={{
                  width: 120, // 🔹 원 크기 증가
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: '#EFEFEF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3, // 🔹 Android 그림자 효과 추가
                  shadowColor: '#000', // 🔹 iOS 그림자 효과 추가
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                }}
              >
                <Image source={item.image} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
              </View>
              <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
