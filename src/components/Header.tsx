import {Image, StyleSheet, View} from 'react-native';

const Header = () => {
  <View style={styles.headerContainer}>
    <Image source={require('../assets/kcalmoa-logo.png')} style={styles.logo} />
  </View>
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 5, // 로고와 텍스트 간격
  },

});

export default Header;
