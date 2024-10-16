import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

// It's left for now
function SliderComponent(props) {
  const { renderItem, width } = props;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Carousel
        data={[
          {
            title: "Item 1",
            text: "Text 1",
          },
          {
            title: "Item 2",
            text: "Text 2",
          },
          {
            title: "Item 3",
            text: "Text 3",
          },
          {
            title: "Item 4",
            text: "Text 4",
          },
          {
            title: "Item 5",
            text: "Text 5",
          },
        ]}
        renderItem={renderItem}
        layout={'stack'} layoutCardOffset={`18`}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
}

SliderComponent.propTypes = {
  width: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export const Slider = SliderComponent;