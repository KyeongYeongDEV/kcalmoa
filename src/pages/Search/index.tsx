import {TextInput, View} from 'react-native';

function Search
() {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20, backgroundColor: 'white' }}>
      <TextInput placeholder="index 검색어를 입력하세요" style={{ borderWidth: 1, width: 300, padding: 10 }} />
    </View>
  );
}
export default Search;
