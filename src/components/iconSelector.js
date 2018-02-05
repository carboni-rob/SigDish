const noLike = require('../img/emoji-dontlike.png');
const notSure = require('../img/emoji-notsure.png');
const like = require('../img/emoji-like.png');
const love = require('../img/emoji-love.png');

const IconSelector = (value) => {
  let icon;
  switch (value) {
    default: icon = {
      iconImg: noLike,
      iconTxt: "Don't like it"
    };
    break;
    case 1:
      icon = {
        iconImg: noLike,
        iconTxt: "Don't like it"
      };
      break;
    case 2:
      icon = {
        iconImg: notSure,
        iconTxt: 'Not sure'
      };
      break;
    case 3:
      icon = {
        iconImg: like,
        iconTxt: 'I like it'
      };
      break;
    case 4:
      icon = {
        iconImg: love,
        iconTxt: 'I love it!'
      };
  }
  return icon;
};

export default IconSelector;
