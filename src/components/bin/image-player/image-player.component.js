import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import { useEffect, useState } from 'react';
import styles from './image-player.styles';
import { downloadAsync } from '../../../utilities/downloadAsync';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';

const ImagePlayerComponent = (props) => {
  const {style, src, rounded} = props;
  const [isLoading, setLoading] = useState(true);

  // main for component
  const [localUri, setLocalUri] = useState('');

  useEffect(() => {
    try {
      (async () => {
        const uri = await downloadAsync(src);
        setLocalUri(uri)
        setLoading(false)
      })();
    } catch (e) {
      console.log('video load error', e);
    }
  }, []);

  return (
    <View style={[styles.container, style]}>
      {isLoading &&
        <AnimatedLogo style={styles.loading} />
      }
      {localUri && <Image
        source={{ uri: localUri }}  style={[styles.image, rounded ? styles.rounded : null]}
      />}
    </View>
  )
};

ImagePlayerComponent.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  src: PropTypes.string,
  rounded: PropTypes.bool,
};

ImagePlayerComponent.defaultProps = {
  style: {},
  src: '',
  rounded: false,
};

export const ImagePlayer = ImagePlayerComponent;
