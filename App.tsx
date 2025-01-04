import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home.tsx';
import Search from './src/pages/Search.tsx';
//import Category from './src/pages/Category.tsx'; // 카테고리 페이지 추가
//  <Tab.Screen name="카테고리" component={Category} />
import { Image } from 'react-native';

// Tab Navigator 생성
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="홈"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="검색"
          component={Search}
          options={{
            headerTitle: () => (
              <Image
                source={require('./src/assets/search.png')} // 로고 이미지 경로
                style={{ width: 120, height: 40, resizeMode: 'contain' }} // 크기 조절
              />
            ),
            headerTitleAlign: 'center', // 헤더 가운데 정렬
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
