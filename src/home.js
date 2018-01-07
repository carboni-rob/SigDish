import firebase from './config/firebase';
import Header from './components/header';
import FoodCard from './components/foodCard';
import Search from './components/search';
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
	ActivityIndicator,
	TextInput,
	FlatList
} from 'react-native';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			food: [],
			filteredFood: [],
			isLoading: true,
			searchIsOpen: false,
			dishSearchString: ''
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
			this.setState({ food: items, filteredFood: items, isLoading: false });
		});
	}

	newPost() {
		this.props.navigation.navigate('Post');
	}

	filterByDish(filter) {
		return this.state.filteredFood.dish.includes(filter);
	}

	render() {
		const { navigate } = this.props.navigation;
		const stateRef = this.state;
		const foodArray = this.state.food.filter(food => food.dish.includes(this.state.dishSearchString));
		return(
			<View style={styles.container}>
				<Header
					title="SigDish_V0.01"
					left={this.newPost.bind(this)}
					leftText={"New"}
					leftIcon={'new-message'}
					right={() => this.setState({ searchIsOpen: !this.state.searchIsOpen })}
					rightText={'Search'}
					rightIcon={'ios-search'}
				/>
				{this.state.searchIsOpen &&
					<View style={{height: 50, padding: 10, backgroundColor: '#c4c4c4'}}>
				        <TextInput
				        	style={{flex: 1, borderRadius: 10, backgroundColor: '#fff', paddingLeft: 5}}
				        	placeholder={'Search by dish'}
							value={this.state.dishSearchString}
							autoFocus={true}
				        	onChangeText={(text) => this.setState({dishSearchString: text})}
							onBlur={() => this.setState({searchIsOpen: false})}
				        >
				        </TextInput>
		      		</View>
				}

				{this.state.isLoading && <ActivityIndicator size="large" color="#4a79c4" style={{marginTop: 50}}/>}

				<FlatList
					data={this.state.food}
					renderItem={({ item }) => (
	          			<FoodCard
							rating={item.rating}
							date={item.date}
							foodName={item.dish}
							foodPlace={item.place}
							image={item.image}
							description={item.description}
						/>
					)}
				/>
			</View>
		);
	}
}

export default Home;
