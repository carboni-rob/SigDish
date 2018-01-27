const React = require('react-native');

const { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  foodPageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start'
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 150,
    backgroundColor: '#C00000'
  },
  btn2: {
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 150,
    borderColor: '#C00000',
    backgroundColor: '#fff'
  },
  btn_text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'lobsterReg'
  },
  btn2_text: {
    color: '#C00000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'lobsterReg',
    backgroundColor: 'transparent'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'GillSans-Light'
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'GillSans-Light',
    color: '#4a79c4',
    fontWeight: 'bold',
    fontSize: 16
  },
  textBig: {
    textAlign: 'center',
    fontFamily: 'GillSans-Light',
    fontSize: 18
  },
  textInput: {
    width: 200,
    height: 25,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'GillSans-Light',
    borderBottomWidth: 2,
    borderColor: '#C00000'
  },
  switchStyle: {
    //tintColor: '#C00000'
  },
  descInput: {
    width: 300,
    height: 80,
    fontFamily: 'GillSans-Light',
    borderColor: '#c9c9c9',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  line: {
    borderColor: '#000',
    borderWidth: 0.5,
    height: 1,
    alignSelf: 'stretch',
  },
  logo: {
    textAlign: 'center',
    color: '#C00000',
    fontFamily: 'lobsterReg',
    backgroundColor: 'transparent'
  },
  lrg_logo_size: {
    fontSize: 84
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
    padding: 10
  },
  rateBtnOn: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10
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
  },
  modal: {
    backgroundColor: '#fff'
  }

});

module.exports = styles;
