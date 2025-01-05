import { Platform } from 'react-native';

const Search = Platform.select({
  ios: require('./Search.ios').default,
  android: require('./Search.android').default,
});

export default Search;
