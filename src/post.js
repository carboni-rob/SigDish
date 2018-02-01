import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import {
  ImagePicker,
  ImageManipulator,
  Location,
  Permissions
} from 'expo';
import Modal from 'react-native-modal';
import moment from 'moment';

import firebase from './config/firebase';
import Header from './components/header';
import Button1 from './components/button1';
import Button2 from './components/button2';
import RateIcon from './components/rateIcon';
import styles from './theme/theme.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const bgroundImg = require('./img/bground.jpg');
const pholderImg = require('./img/placeholder.jpg');

class Post extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.chooseRating = this.chooseRating.bind(this);
    this.state = {
      date: '',
      isModalVisible: false,
      description: '',
      dishname: '',
      image: '',
      image64: '',
      place: {
        name: '',
        lat: '',
        lng: '',
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

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = `${location.coords.latitude},${location.coords.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=500&type=restaurant&key=AIzaSyCO7j-QXjV5zJwmKqkdVPoXDyv4SPOX7fU`;
    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ nearby: responseData.results });
      });
  }

  chooseImgSource() {
    Alert.alert(
      'Add a picture',
      'Would you like take a new picture or choose one from your albums?',
      [
        { text: 'Take a Picture', onPress: () => this.takePhoto() },
        { text: 'Choose from Album', onPress: () => this.choosePhoto() },
      ],
      { cancelable: true }
    );
  }

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      base64: true
    });

    if (!result.cancelled) {
      this.resizeImg(result);
    }
  }

  choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    if (!result.cancelled) {
      this.resizeImg(result);
    }
  }

  resizeImg = async(result) => {
    const resizedImg = await ImageManipulator.manipulate(
      result.uri, [{ resize: { width: 500 } }], { base64: true }
    );
    this.setState({ image: resizedImg.uri });
    this.setState({ image64: resizedImg.base64 });
  }

  post = async() => {
    //Checks for completed fields
    if (this.state.dishname !== '') {
      if (this.state.image64 !== '') {
        if (this.state.place.name !== '') {
          if (this.state.rating !== 0) {
            if (this.state.description !== '') {
              this.confirmEntry();
            } else {
              Alert.alert(
                'Missing description',
                'Would you like to add one?',
                [
                  { text: 'Yes', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'No, publish without', onPress: () => this.confirmEntry() },
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
        { text: 'Not now', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.pushContent() },
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

  back() {
    this.props.navigation.navigate('HomeScreen');
  }

  chooseRating(index) {
    const thisRatingId = `rating${index}`;
    this.setState({
      rating: index,
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      [thisRatingId]: true
    });
  }

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    let img;
    if (this.state.image === '') {
      img = pholderImg;
    } else {
      img = { uri: this.state.image };
    }
    return (
      <ImageBackground
				source={bgroundImg}
				style={[{ width: deviceWidth, height: deviceHeight },
				styles.container]}
      >
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Header
              title="New B!eat"
              left={this.back.bind(this)}
              leftText={'Back'}
              leftIcon={'back'}
            />
            <View style={styles.center}>
              <TextInput
                placeholder='What did you eat?'
                style={styles.textInput}
                onChangeText={(text) => this.setState({ dishname: text })}
              />
              <TouchableOpacity onPress={this.chooseImgSource.bind(this)}>
                <Image
                  source={img}
                  style={{ width: deviceWidth, height: (deviceWidth * 0.5), borderRadius: 10 }}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.text}>{this.state.place.name}</Text>
                <Text style={styles.text}>{this.state.place.address}</Text>
              </View>
              <Button1
                text="Where?"
                onPress={this.toggleModal}
              />
              <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
                <ScrollView style={{ height: deviceHeight * 0.2 }}>
                  {Object.keys(this.state.nearby).map((key) => {
                    const test = {
                      address: this.state.nearby[key].vicinity,
                      name: this.state.nearby[key].name
                    };
                    return (
                      <TouchableOpacity
                        key={key}
                        style={{ padding: 20 }}
                        onPress={() => this.setState({ place: test, isModalVisible: false })}
                      >
                        <Text style={styles.text}>{this.state.nearby[key].name}</Text>
                        <Text style={styles.text}>{this.state.nearby[key].vicinity}</Text>
                      </TouchableOpacity>
                    );
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
                <RateIcon
                  rating={1}
                  selected={() => this.chooseRating(1)}
                  active={this.state.rating1}
                />
                <RateIcon
                  rating={2}
                  selected={() => this.chooseRating(2)}
                  active={this.state.rating2}
                />
                <RateIcon
                  rating={3}
                  selected={() => this.chooseRating(3)}
                  active={this.state.rating3}
                />
                <RateIcon
                  rating={4}
                  selected={() => this.chooseRating(4)}
                  active={this.state.rating4}
                />
              </View>
              <View>
                <TextInput
                  placeholder='Write a short description'
                  style={styles.descInput}
                  onChangeText={(text) => this.setState({ description: text })}
                  onBlur={Keyboard.dismiss}
                />
              </View>
              <Button2
                text="B!eat it"
                onPress={this.post.bind(this)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default Post;
