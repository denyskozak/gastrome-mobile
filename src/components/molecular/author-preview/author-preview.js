import PropTypes from 'prop-types';

import styles from './author-preview.styles';
import {Image, Text, View} from "react-native";
import React from "react";

const AuthorPreviewComponent = (props) => {
    const { imageSource, name } = props;

    console.log('imageSource ', imageSource)
    return (
      <View>
          <Text style={styles.name}>{name}</Text>
          <Image source={imageSource} style={styles.image}/>
      </View>
    );
}

AuthorPreviewComponent.propTypes = {
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.number.isRequired,
}

export const AuthorPreview = AuthorPreviewComponent;