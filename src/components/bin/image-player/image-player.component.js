import * as React from 'react';
import { View, Image } from 'react-native';

import { useEffect, useState } from 'react';
import { useStyles } from './image-player.styles';
import { downloadAsync } from '../../../utilities/downloadAsync';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import { useTheme } from '../../../hooks/useTheme';

const ImagePlayerComponent = ({
  style = {},
  src = '',
  rounded = false,
}) => {
  const [isLoading, setLoading] = useState(true);
  const { theme } = useTheme();
  const styles = useStyles(theme);

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

export const ImagePlayer = ImagePlayerComponent;
