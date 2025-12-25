import React, { useMemo } from 'react';
import { Popover } from 'react-native-popable';
import { View, Text } from 'react-native';
import { Animated } from '../animated/animated.component';

import styles from './tooltip.styles';
import { Colors } from '../../../styles/colors';

const TooltipComponent = ({
  isVisible,
  children,
  text,
  placement,
  delay = 0,
}) => {

  const positionStyle = useMemo(() => {
    switch (placement) {
      case 'top':
        return {bottom: '100%'};
      case 'bottom':
        return {top: '100%'};
      case 'middle':
        return {bottom: '30%'};
    }
  }, [placement]);

  const calculatedPlacement = placement === 'middle' ? 'bottom' : placement;

  return (
    <View>
      {isVisible && (
        <View style={[positionStyle, styles.container]}>
          <Animated name="FadeIn" outName="FadeOut" delay={delay}>
            <Popover
              style={styles.popover}
              visible={isVisible}
              position={calculatedPlacement}
              backgroundColor={Colors.black}
            >
              <Text style={styles.text}>{text}</Text>
            </Popover>
          </Animated>
        </View>
      )}
      {children}
    </View>
  )
};

export const Tooltip = TooltipComponent;
