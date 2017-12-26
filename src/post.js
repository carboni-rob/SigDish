import firebase from './config/firebase';
import Header from './components/header';
import styles from './theme/theme.js';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import { ImagePicker, ImageManipulator } from 'expo';

import React, { Component } from 'react';
import {
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
      description: '',
      dishname: '',
      image: 'https://firebasestorage.googleapis.com/v0/b/sigdish-d24b1.appspot.com/o/src%2Fplaceholder.jpg?alt=media&token=160573f1-0522-4897-a4d4-589ad425c680',
      image64: '',
      place: {
        name: 'Restaurant name',
        lat:'',
        lng:'',
        address: 'Restaurant address'
      },
      rating: '',
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
        //const coords = '50.979943,-3.226985'
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords + '&radius=500&type=restaurant&key=AIzaSyCO7j-QXjV5zJwmKqkdVPoXDyv4SPOX7fU'
        fetch(url, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ nearby: responseData.results })
          })
      }
    )
  }

  /*photo(){
    var state = this
    ImagePicker.showImagePicker({}, (response) => {
      if (!response.didCancel) {
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        ImageResizer.createResizedImage(source.uri, 500, 500, 'JPEG', 60).then((resizedImageUri) => {
            state.setState({ imageBlob: resizedImageUri });
            state.setState({ image: resizedImageUri.uri });
        }).catch((err) => {
          console.log(err)
        });
      }
    });
  }*/

  photo = async () => {
    let result = await ImagePicker.launchCameraAsync({
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

    firebase.database().ref('food').push({
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
      rating: 'I love it',
      rating1: true,
      rating2: false,
      rating3: false,
      rating4: false,
    });
  }

  chooseRating2() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 'I like it',
      rating1: false,
      rating2: true,
      rating3: false,
      rating4: false,
    });
  }

  chooseRating3() { 
    //resets active state for all buttons to false
    this.setState({
      rating: 'Not sure',
      rating1: false,
      rating2: false,
      rating3: true,
      rating4: false,
    });
  }

  chooseRating4() { 
    //resets active state for all buttons to false
    this.setState({
      rating: "Don't like it",
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: true,
    });
  }

  render() {
    return (
      <View >
        <Header title="Post" left={this.back.bind(this)} leftText={'Back'}/>
        <View style={ styles.center }>
          <TextInput
            placeholder='What did you eat?'
            style={ styles.textInput }
            onChangeText={(text) => this.setState({dishname: text})}
          />
          <TouchableOpacity onPress={this.photo.bind(this)}>
            <Image
              source={{uri: this.state.image}}
              style={{ width: deviceWidth, height: (deviceWidth*.5)}}
            />
          </TouchableOpacity>
          <View>
            <Text style={ styles.text }>{this.state.place.name}</Text>
            <Text style={ styles.text }>{this.state.place.address}</Text>
          </View>
          <ScrollView style={{ height: deviceHeight*0.2}} >
          {Object.keys(this.state.nearby).map((key) => {
            var test = {
              address: this.state.nearby[key].vicinity,
              lat: this.state.nearby[key].geometry.location.lat,
              lng: this.state.nearby[key].geometry.location.lng,
              name: this.state.nearby[key].name
            }
            return (
              <TouchableOpacity key={key} style={{padding: 10}} onPress={ (place) =>  this.setState({place: test}) }>
                <Text style={styles.text}>{this.state.nearby[key].name}</Text>
                <Text style={styles.text}>{this.state.nearby[key].vicinity}</Text>
              </TouchableOpacity>
            )
          })}
          </ScrollView>
          <View
            style={{
              width: deviceWidth,
              //padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={this.chooseRating4.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating4 && styles.rateBtnOn]}
            >
              <Text>Don't like it</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating3.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating3 && styles.rateBtnOn]}
            >
              <Text>Not sure</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating2.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating2 && styles.rateBtnOn]}
            >
              <Text>I like it</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooseRating1.bind(this)}
              style={ [styles.rateBtnOff, this.state.rating1 && styles.rateBtnOn]}
            >
              <Text>I love it</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView>
            <TextInput
              placeholder='Write a short description'
              style={ styles.descInput }
              onChangeText={(text) => this.setState({description: text})}
              multiline={true}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity style={ styles.btn } onPress={this.post.bind(this)}>
            <Text style={ styles.text }>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Post;