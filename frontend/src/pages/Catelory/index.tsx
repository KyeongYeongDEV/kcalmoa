import { Platform } from 'react-native';

const Search = Platform.select({
  ios: require('./Category.ios.tsx').default,
  android: require('./Category.android.tsx').default,
});

export default Search;
