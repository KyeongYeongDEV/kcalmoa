import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default CategoryStack;
