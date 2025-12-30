import * as React from 'react';
import { View } from 'react-native';
import {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import CarouselLib from 'react-native-reanimated-carousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { ArrowDirection } from '../../atomic/carousel-arrow/carousel-arrow.component';
import { getPercentHeight, getPercentWidth } from '../../../styles/common.styles';
import {Spaces} from "../../../styles/spaces";
import { useTheme } from '../../../hooks/useTheme';

const CarouselComponent = React.forwardRef((props, ref) => {
  const { items, renderItem, activeIndex, onChangeActiveIndex } = props;
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const PAGE_WIDTH =  getPercentWidth(100);
  const PAGE_HEIGHT = getPercentHeight(100) - tabBarHeight - Spaces.mxxlarge;
  const directionAnim = useSharedValue(
    ArrowDirection.IS_HORIZONTAL
  );
  const [isVertical, setIsVertical] = React.useState(true);

  const animationStyle = React.useCallback(
    (value) => {
      'worklet';
      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-PAGE_HEIGHT, 0, 0],
      );

      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [-PAGE_WIDTH, 0, 0],
      );

      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);

      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);

      return {
        transform: [
          isVertical ? { translateY } : { translateX },
          { scale },
        ],
        zIndex,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH, isVertical],
  );

  useAnimatedReaction(
    () => directionAnim.value,
    (direction) => {
      switch (direction) {
        case ArrowDirection.IS_VERTICAL:
          runOnJS(setIsVertical)(true);
          break;
        case ArrowDirection.IS_HORIZONTAL:
          runOnJS(setIsVertical)(false);
          break;
      }
    },
    [],
  );


  return (
    <View style={{ flex: 1 }}>
      <CarouselLib
        loop={false}
        ref={ref}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.backgroundColor,
        }}
        vertical={isVertical}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={items}
        onSnapToItem={onChangeActiveIndex}
        renderItem={item => renderItem({...item, activeIndex })}
        // customAnimation={animationStyle}
      />
    </View>
  );
});


export const Carousel = CarouselComponent;
