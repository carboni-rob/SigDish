import firebase from './config/firebase';
import Header from './components/header';
import styles from './theme/theme.js';
import Dimensions from 'Dimensions';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			food: [],
			isLoading: true
		}
	}

	static navigationOptions = {
	    header: null
	};

	componentDidMount() {
		this.getFood()
	}

	getFood() {
		console.log(this.state.isLoading);
		firebase.database().ref('food').on('value', (snap) => {
			var items = [];
			snap.forEach((child) => {
				var item = child.val();
				items.push(item);
			});
			items.reverse();
			this.setState({ food: items, isLoading: false });
			console.log(this.state.isLoading);
		});
	}

	left() {
		this.props.navigation.navigate('Post');
	}

	map() {
		this.self.props.navigator.push({
			component: map,
			passProps: {place: this.place.place }
		});
	}

	render() {
		return(
			<View style={styles.container}>
				<Header title="SigDish_V0.01" left={this.left.bind(this)} leftText={"Post +"} />
				{this.state.isLoading && <ActivityIndicator size="large" color="#c9c9c9" />}
				<ScrollView>
					{Object.keys(this.state.food || {}).map((key) => {
						return(
							<View key={key}>
								<Text style={styles.text}>{this.state.food[key].dish}</Text>
								<Image
									source={{uri: 'data:image/jpeg;base64,'+this.state.food[key].image}}
									style={{ width: deviceWidth, height: (deviceWidth*.5)}}
								/>
								<View style={styles.homeRating}>
									<Text>{this.state.food[key].rating}</Text>
								</View>
								<Text style={styles.text}>{this.state.food[key].place}</Text>
								<Text style={styles.text}>{this.state.food[key].description}</Text>
								<View style={styles.line} />
							</View>
						)
					})}
				</ScrollView>
			</View>
		);
	}
}

export default Home;