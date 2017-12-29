import firebase from './config/firebase';
import Header from './components/header';
import styles from './theme/theme.js';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import { ImagePicker, ImageManipulator } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      date: '',
      isModalVisible: false,
      description: '',
      dishname: '',
      image: '',
      image64: '',
      place: {
        name: '',
        lat:'',
        lng:'',
        address: ''
      },
      rating: 0,
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      lat: '',
      long: '',
      nearby: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    this.getPlaces();
  }

  getPlaces(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords.latitude + ',' + position.coords.longitude
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords + '&radius=500&type=restaurant&key=AIzaSyCO7j-QXjV5zJwmKqkdVPoXDyv4SPOX7fU'
        fetch(url, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ nearby: responseData.results })
          })
      }
    )
  }

  chooseImgSource() {
    Alert.alert(
      'Add a picture',
      'Would you like take a new picture or choose one from your albums?',
      [
        {text: 'Take a Picture', onPress: () => this.takePhoto()},
        {text: 'Choose from Album', onPress: () => this.choosePhoto()},
      ],
      { cancelable: true }
    );
  }

  takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true
    });

    if (!result.cancelled) {
      this.resizeImg(result);
    }
  }

  choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    if (!result.cancelled) {
      this.resizeImg(result);
    }
  }

  resizeImg = async(result) => {
    const resizedImg = await ImageManipulator.manipulate(result.uri, [{resize: {width: 500, height: 500}}], {base64: true});
    this.setState({ image: resizedImg.uri });
    this.setState({ image64: resizedImg.base64 });
  }

  post = async() => {

    //Checks for completed fields
    if (this.state.dishname != '') {
      if (this.state.image64 != '') {
        if (this.state.place.name != '') {
          if (this.state.rating != '') {
            if (this.state.description != '') {
              this.confirmEntry();
            } else {
              Alert.alert(
                'Missing description',
                'Would you like to add one?',
                [
                  {text: 'Yes', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'No, publish without', onPress: () => this.confirmEntry()},
                ],
                { cancelable: true }
              );
            }  
          } else {
            Alert.alert('Please select a rating for the dish');
          }
        } else {
          Alert.alert('Please select the name of the Restaurant');
        }
      } else {
        Alert.alert('Please provide a photo of the dish');
      }
    } else {
      Alert.alert('Please provide a name for the dish');
    }
  }

  confirmEntry() {
    Alert.alert(
      'Please confirm',
      'Publish this dish now?',
      [
        {text: 'Not now', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.pushContent()},
      ],
      { cancelable: true }
    );
  }

  pushContent = async() => {
    firebase.database().ref('food').push({
      date: moment().format('DD[/]MM[/]YY'),
      dish: this.state.dishname,
      image: this.state.image64,
      place: this.state.place.name,
      description: this.state.description,
      rating: this.state.rating
    });
    this.props.navigation.navigate('HomeScreen');
  }

  back(){
    this.props.navigation.navigate('HomeScreen');
  }

  chooseRating1() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 4,
      rating1: true,
      rating2: false,
      rating3: false,
      rating4: false,
    });
  }

  chooseRating2() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 3,
      rating1: false,
      rating2: true,
      rating3: false,
      rating4: false,
    });
  }

  chooseRating3() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 2,
      rating1: false,
      rating2: false,
      rating3: true,
      rating4: false,
    });
  }

  chooseRating4() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 1,
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: true,
    });
  }

  chooseRestaurant(place) {
    this.setState({place: test});
                      this._toggleModal;
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    {if (this.state.image == '') {
      var img = require('./img/placeholder.jpg');
    } else {
      var img = {uri: this.state.image};
    }
    }
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Header title="Post" left={this.back.bind(this)} leftText={'Back'}/>
        <View style={ styles.center }>
          <TextInput
            placeholder='What did you eat?'
            style={ styles.textInput }
            onChangeText={(text) => this.setState({dishname: text})}
          />
          <TouchableOpacity onPress={this.chooseImgSource.bind(this)}>
            <Image
              source={img}
              style={{ width: deviceWidth, height: (deviceWidth*.5), borderRadius: 10}}
            />
          </TouchableOpacity>
          <View>
            <Text style={ styles.text }>{this.state.place.name}</Text>
            <Text style={ styles.text }>{this.state.place.address}</Text>
          </View>
          <TouchableOpacity onPress={this._toggleModal} style={ styles.btn }>
            <Text style={ styles.text }>Choose a Restaurant</Text>
          </TouchableOpacity>
          <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
            <ScrollView style={{ height: deviceHeight*0.2}} >
              {Object.keys(this.state.nearby).map((key) => {
                var test = {
                  address: this.state.nearby[key].vicinity,
                  lat: this.state.nearby[key].geometry.location.lat,
                  lng: this.state.nearby[key].geometry.location.lng,
                  name: this.state.nearby[key].name
                }
                return (
                  <TouchableOpacity
                    key={key}
                    style={{padding: 20}}
                    onPress={ (place) => this.setState({place: test, isModalVisible: false}) }
                  >
                    <Text style={styles.text}>{this.state.nearby[key].name}</Text>
                    <Text style={styles.text}>{this.state.nearby[key].vicinity}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </Modal>
          <View
            style={{
              width: deviceWidth,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <TouchableOpacity
              onPress={this.chooseRating4.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating4 && styles.rateBtnOn]}
            >
              <Image source={require('./img/emoji-dontlike.png')} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating3.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating3 && styles.rateBtnOn]}
            >
              <Image source={require('./img/emoji-notsure.png')} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating2.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating2 && styles.rateBtnOn]}
            >
              <Image source={require('./img/emoji-like.png')} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating1.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating1 && styles.rateBtnOn]}
            >
              <Image source={require('./img/emoji-love.png')} style={{width: 32, height: 32}}/>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder='Write a short description'
              style={ styles.descInput }
              onChangeText={(text) => this.setState({description: text})}
            />
          </View>
          <TouchableOpacity style={ styles.btn } onPress={this.post.bind(this)}>
            <Text style={ styles.text }>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Post;