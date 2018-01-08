import React, { Component } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	Dimensions
} from 'react-native';

import firebase from './config/firebase';
import Header from './components/header';
import FoodCard from './components/foodCard';
import Search from './components/search';
import Iconsearch from './components/iconSearch';
import styles from './theme/theme.js';

const deviceHeight = Dimensions.get('window').height;


class Home extends Component {

	static navigationOptions = {
			header: null,
			gesturesEnabled: false
	};

	constructor(props) {
		super(props);
		this.state = {
			food: [],
			filteredFood: [],
			isLoading: true,
			searchIsOpen: false,
			dishSearchString: '',
			restaurantSearchString: '',
			ratingSearch: '1234'
		};
	}

	componentDidMount() {
		this.getFood();
	}

	getFood() {
		firebase.database().ref('food').on('value', (snap) => {
			const items = [];
			snap.forEach((child) => {
				const item = child.val();
				items.push(item);
			});
			items.reverse();
			this.setState({ food: items, filteredFood: items, isLoading: false });
		});
	}

	newPost() {
		this.props.navigation.navigate('Post');
	}

	render() {
		const { navigate } = this.props.navigation;
		const foodArray = this.state.food.filter(
			food => food.dish.includes(this.state.dishSearchString) &&
			food.place.includes(this.state.restaurantSearchString) &&
			this.state.ratingSearch.includes(food.rating)
		);

		return (
			<View style={styles.container}>
				<Header
					title="SigDish_V0.01"
					left={this.newPost.bind(this)}
					leftText={'New'}
					leftIcon={'new-message'}
					right={() => this.setState({
						searchIsOpen: !this.state.searchIsOpen,
						dishSearchString: '',
						restaurantSearchString: '',
						ratingSearch: '1234'
					})}
					rightText={'Search'}
					rightIcon={this.state.searchIsOpen ? 'md-close' : 'ios-search'}
				/>
				{this.state.searchIsOpen &&
					<View>
						<Search
							focus
							searchType='By Dish'
							srchString={this.state.dishSearchString}
							pholder={'Search by dish'}
							txtChange={(text) => this.setState({ dishSearchString: text })}
						/>
						<Search
							searchType='Restaurant'
							srchString={this.state.restaurantSearchString}
							pholder={'Search by Restaurant'}
							txtChange={(text) => this.setState({ restaurantSearchString: text })}
						/>
						<Iconsearch
							searchType='By Rating'
							select1={() => this.setState({ ratingSearch: '1' })}
							select2={() => this.setState({ ratingSearch: '2' })}
							select3={() => this.setState({ ratingSearch: '3' })}
							select4={() => this.setState({ ratingSearch: '4' })}
						/>
					</View>
				}

				{this.state.isLoading
					? <ActivityIndicator
							size="large"
							color="#4a79c4"
							style={{ marginTop: deviceHeight / 3 }}
					/>
					: (foodArray.length === 0
						? <Text>There are no dishes matching this search</Text>
						: null
					)
				}

				<FlatList
					keyExtractor={item => item.image}
					data={foodArray}
					renderItem={({ item }) => (
						<FoodCard
							rating={item.rating}
							date={item.date}
							foodName={item.dish}
							foodPlace={item.place}
							image={item.image}
							description={item.description}
							select={() => navigate('FoodPage', {
								rating: item.rating,
								date: item.date,
								foodName: item.dish,
								foodPlace: item.place,
								image: item.image,
								description: item.description
							})}
						/>
					)}
				/>
			</View>
		);
	}
}

export default Home;
