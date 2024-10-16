import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import PropsType from 'prop-types';

// @todo Use later or remove

const FadeInComponent = (props) => {
  const {
    children,
    style,
  } = props;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

FadeInComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const FadeIn = FadeInComponent;