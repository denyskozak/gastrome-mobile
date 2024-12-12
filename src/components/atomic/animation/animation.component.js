import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

import cookingFoodJSON from './list/cheef-cook.json';
import voiceJSON from './list/voice.json';
import happyAutumnShoppingJSON from './list/happy-autumn-shopping.json';
import cookingJSON from './list/cooking.json';
import volumeUpJSON from './list/volume-up.json';
import microJSON from './list/micro-voice.json';
import prepareCookingJSON from './list/prepare-cooking.json';
import swipeLeftJSON from './list/swipe-left.json';
import clickJSON from './list/click.json';
import voiceOnJSON from './list/voice-on.json';
import voiceOffJSON from './list/voice-off.json';
import cookOnFireJSON from './list/cooking-on-fire.json';

const looties = {
  cooking: cookingJSON,
  voice: voiceJSON,
  micro: microJSON,
  volumeUp: volumeUpJSON,
  cookingFood: cookingFoodJSON,
  happyAutumnShopping: happyAutumnShoppingJSON,
  prepareCooking: prepareCookingJSON,
  swipeLeft: swipeLeftJSON,
  click: clickJSON,
  voiceOff: voiceOffJSON,
  voiceOn: voiceOnJSON,
  cookOnFire: cookOnFireJSON,
}

const AnimationComponent = React.forwardRef((props, ref) => {
  const { name, height, width, style, autoPlay } = props;

  return (
    <View style={[style, { height, width }]}>
      <Lottie
        autoPlay={autoPlay}
        loop
        ref={ref}
        source={looties[name]}
      />
    </View>
  );
})

AnimationComponent.propTypes = {
  name: PropTypes.oneOf(Object.keys(looties)).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  autoPlay: PropTypes.bool,
}

AnimationComponent.defaultProps = {
  style: {},
  autoPlay: true,
}

export const  Animation = AnimationComponent;