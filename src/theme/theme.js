const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start'
  },
  right: {
    justifyContent: 'flex-end',
  },
  btn: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 3,
    width: 150, 
  },
  text: {
    textAlign: 'center',
    fontFamily: "GillSans-Light"
  },
  headerText: {
    textAlign: 'center',
    fontFamily: "GillSans-Light",
    color: '#4a79c4',
    fontWeight: 'bold',
    fontSize: 16
  },
  textBig: {
    textAlign: 'center',
    fontFamily: "GillSans-Light",
    fontSize: 18
  },
  textInput: { 
    width: 150,
    height: 50,
    textAlign: 'center',
    fontFamily: "GillSans-Light",
  },
  descInput: { 
    width: 300,
    height: 40,
    fontFamily: "GillSans-Light",
    borderColor: '#000',
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  line: {
    borderColor: '#000',
    borderWidth: 0.5,
    height: 1,
    alignSelf: 'stretch',
  },
  logo:{
    textAlign: 'center',
    fontSize: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    marginTop: 10,
    paddingHorizontal: 10
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rateBtnOff: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  rateBtnOn: {
    backgroundColor: '#c9c9c9'
  },
  homeRating: {
    borderColor: '#000',
    backgroundColor: '#c9c9c9',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 30,
    left: 15
  },
  cardView: {
    flexDirection: 'row',
    margin: 5
  },
  cardImg: {
    flex: 1,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  cardDetails: {
    flex: 2,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#d1d1d1'
  },
  cardDetailsTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardDetailsBottom: {
    flex: 2
  },
  cardFoodName: {
    flex: 2,
    color: '#4a79c4',
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 5
  },
  cardFoodDate: {
    flex: 1,
    color: '#c6c6c6',
    textAlign: 'right'
  },
  cardFoodPlace: {
  },
  cardFoodDescription: {
    color: '#c6c6c6',
    textAlign: 'justify'
  }

})

module.exports = styles