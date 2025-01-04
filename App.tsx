import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home.tsx';
import Search from './src/pages/Search.tsx';
import { Image } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from './src/pages/Category.tsx';

// Tab Navigator 생성
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
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
              source={require('./src/assets/search.png')}
              style={{ width: 120, height: 40, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.category || '카테고리',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
