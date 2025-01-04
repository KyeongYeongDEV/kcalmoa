import {TextInput, View} from 'react-native';

function Search
() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput placeholder="검색어를 입력하세요" style={{ borderWidth: 1, width: 300, padding: 10 }} />
    </View>
  );
}
export default Search;
