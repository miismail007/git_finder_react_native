import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Image,
  Modal,
  TouchableHighlight,
  Linking,
} from 'react-native';
// import Modal from 'react-native-modal';
import axios from 'axios';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
export class Home extends Component {
  state = {
    text: '',
    users: [],
    clear: false,
    loading: false,
    modal: false,
    user: {},
    repos: [],
  };
  searchevent = async (text) => {
    if (this.state.text != '') {
      this.setState({loading: true});
      const datas = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
      );
      this.setState({users: datas.data.items});
      this.setState({clear: true, loading: false});
    } else {
      ToastAndroid.show('Enter any Username', ToastAndroid.SHORT);
    }
  };
  details = async (text) => {
    this.setState({modal: true});
    const datas = await axios.get(
      `https://api.github.com/users/${text}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    // console.log(datas.data);
    this.setState({user: datas.data});
    const datass = await axios.get(
      `https://api.github.com/users/${text}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    this.setState({repos: datass.data});
  };

  getuserrepos = async (username) => {};
  clearuser = () => {
    this.setState({users: [], text: ''});
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({modal: false});
          }}>
          <View style={styles.titlebar}>
            <TouchableHighlight
              onPress={() => {
                this.setState({modal: false});
              }}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={{
                  width: 24,
                  height: 24,
                  marginHorizontal: 10,
                  marginTop: 3,
                }}
              />
            </TouchableHighlight>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignSelf: 'center', marginTop: 15}}>
              <View style={styles.profileImage}>
                <Image
                  source={{uri: this.state.user.avatar_url}}
                  style={styles.image}></Image>
              </View>
            </View>
            <View style={styles.userinfo}>
              <Text style={[{fontWeight: '200', fontSize: 36}]}>
                {this.state.user.login}
              </Text>
              <Text style={[{color: '#aeb5bc', fontSize: 14}]}>
                {this.state.user.bio}
              </Text>
            </View>
            <View style={styles.statscontainer}>
              <View style={styles.statbox}>
                <Text style={[{fontSize: 24}]}>
                  {this.state.user.public_repos}
                </Text>
                <Text style={[styles.subtext]}>Repos</Text>
              </View>
              <View
                style={[
                  styles.statbox,
                  {
                    borderColor: '#dfd8c8',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  },
                ]}>
                <Text style={[{fontSize: 24}]}>
                  {this.state.user.followers}
                </Text>
                <Text style={[styles.subtext]}>Followers</Text>
              </View>
              <View style={styles.statbox}>
                <Text style={[{fontSize: 24}]}>
                  {this.state.user.following}
                </Text>
                <Text style={[styles.subtext]}>Following</Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              {this.state.repos.map((repo) => {
                return (
                  <TouchableHighlight
                    key={repo.id}
                    onPress={() => {
                      Linking.openURL(repo.html_url);
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        borderColor: '#efefef',
                        borderWidth: 1,
                        paddingVertical: 10,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <View style={{width: 200}}>
                        <Text>Repository: {repo.full_name}</Text>
                        {repo.language != null ? (
                          <Text>Language: {repo.language}</Text>
                        ) : (
                          <Text>Language: Not Specified</Text>
                        )}
                      </View>
                      <View
                        style={{
                          borderColor: '#000',
                          borderWidth: 1,
                          alignSelf: 'flex-end',
                          borderRadius: 5,
                          width: 60,
                          marginLeft: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 30,
                        }}>
                        <Text>View</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
          </ScrollView>
        </Modal>
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
          <View
            style={{
              width: 350,
              height: 150,
              justifyContent: 'center',
              marginTop: 10,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: '#efefef',
              borderRadius: 5,
            }}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={{
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 5,
              }}
              value={this.state.text}
              ref="searchtext"
              onChange={(text) => {
                this.setState({text: text.nativeEvent.text});
              }}
              placeholder="Enter username"
            />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {this.state.clear && (
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={() => {
                    this.clearuser();
                  }}>
                  <Text style={styles.shareButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => {
                  this.searchevent(this.state.text);
                }}>
                <Text style={styles.shareButtonText}>search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.loading ? (
          <View
            style={{
              width,
              height: height - 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>Loading...</Text>
          </View>
        ) : (
          <View>
            <ScrollView>
              {this.state.users.map((product) => {
                return (
                  <TouchableOpacity
                    key={product.id}
                    onPress={() => {
                      this.details(product.login);
                    }}>
                    <View style={styles.itemContainer}>
                      <Image
                        style={styles.proImage}
                        source={{uri: product.avatar_url}}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                          <Text style={styles.proname}>
                            Name : {product.login}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderColor: '#000',
                            borderWidth: 1,
                            alignSelf: 'flex-end',
                            borderRadius: 5,
                            width: 60,
                            marginLeft: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                          }}>
                          <Text>View</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
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
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    borderColor: '#efefef',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  proImage: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 6,
  },
  proname: {
    fontSize: 17,
    fontWeight: '700',
    paddingLeft: 5,
    height: 60,
    marginTop: 30,
    overflow: 'hidden',
    textTransform: 'uppercase',
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  subtext: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#aeb5bc',
    fontWeight: '500',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  active: {
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  userinfo: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statscontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statbox: {
    alignItems: 'center',
    flex: 1,
  },
});
export default Home;
