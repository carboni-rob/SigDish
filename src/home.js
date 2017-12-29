import firebase from './config/firebase';
import Header from './components/header';
import FoodCard from './components/foodCard';
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
		firebase.database().ref('food').on('value', (snap) => {
			var items = [];
			snap.forEach((child) => {
				var item = child.val();
				items.push(item);
			});
			items.reverse();
			this.setState({ food: items, isLoading: false });
		});
	}

	left() {
		this.props.navigation.navigate('Post');
	}

	render() {
		return(
			<View style={styles.container}>
				<Header title="SigDish_V0.01" left={this.left.bind(this)} leftText={"Post +"} />
				{this.state.isLoading && <ActivityIndicator size="large" color="#4a79c4" style={{marginTop: 50}}/>}
				<ScrollView>
					{Object.keys(this.state.food || {}).map((key) => {
						return(
							<FoodCard
								key={key}
								rating={this.state.food[key].rating}
								date={this.state.food[key].date}
								foodName={this.state.food[key].dish}
								foodPlace={this.state.food[key].place}
								image={this.state.food[key].image}
								description={this.state.food[key].description}
							/>
						)
					})}
				</ScrollView>
			</View>
		);
	}
}

export default Home;