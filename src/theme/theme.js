const React = require('react-native');

const { StyleSheet } = React;

const styles = StyleSheet.create({
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
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 25
    //backgroundColor: '#fff'
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
  exampleContainer: {
      paddingVertical: 10
  },
  foodPageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 25,
    marginTop: 0,
    paddingHorizontal: 10
  },
  headerCenter: {
    flex: 1,
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
  headerText: {
    textAlign: 'center',
    fontFamily: 'lobsterReg',
    backgroundColor: 'transparent',
    color: '#C00000',
    fontWeight: 'bold',
    fontSize: 16
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
  modal: {
    backgroundColor: '#fff'
  },
  pageTitle: {
    justifyContent: 'center',
    color: '#C00000',
    backgroundColor: 'transparent',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'lobsterReg'
  },
  rateBtnOff: {
    padding: 10
  },
  rateBtnOn: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10
  },
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  slider: {
      marginTop: 0,
      overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
      paddingVertical: 0
  },
  text: {
    textAlign: 'center',
    fontFamily: 'GillSans-Light'
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
  }
});

module.exports = styles;
