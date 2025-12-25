import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

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
  happyAutumnShopping: happyAutumnShoppingJSON,
  prepareCooking: prepareCookingJSON,
  swipeLeft: swipeLeftJSON,
  click: clickJSON,
  voiceOff: voiceOffJSON,
  voiceOn: voiceOnJSON,
  cookOnFire: cookOnFireJSON,
}

const AnimationComponent = React.forwardRef((props, ref) => {
  const { name, height, width, style = {}, autoPlay = true} = props;

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


export const  Animation = AnimationComponent;