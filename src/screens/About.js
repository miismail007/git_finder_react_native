import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export class About extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titlebar}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image
              source={require('../../assets/icons/menu.png')}
              style={{
                width: 24,
                height: 24,
                marginHorizontal: 10,
                marginTop: 3,
              }}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 120,
              height: 30,
              marginRight: 120,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 180,
              height: 90,
              marginTop: 10,
              resizeMode: 'contain',
            }}
          />
          <Text>Version : 1.0</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titlebar: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
});
export default About;
