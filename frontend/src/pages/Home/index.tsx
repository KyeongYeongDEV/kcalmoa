import { Platform } from 'react-native';

const Search = Platform.select({
  ios: require('./Home.ios.tsx').default,
  android: require('./Home.android.tsx').default,
});

export default Search;
