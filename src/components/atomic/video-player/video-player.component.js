import { Video } from 'expo-av';
import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { Animated } from '../animated/animated.component';
import { useEffect, useState } from 'react';
import { downloadAsync } from '../../../utilities/downloadAsync';
import styles from './video-player.styles';
import { AnimatedLogo } from '../logo/animated-logo.component';
import { Liner } from './liner/liner.component';

const VideoPlayerComponent = ({
  style = {},
  uri = '',
  rate = 1,
  shouldPlay = false,
  onLoaded,
  resizeMode = 'cover',
  progressLineBottomPosition = 0,
  loadingText = ''
}) => {

  const [localUri, setLocalUri] = useState('');
  const [status, setStatus] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        const localUri = await downloadAsync(uri)
        setLocalUri(localUri);
      })();
    } catch (e) {
      console.log('video load error', e);
    }
  }, []);


  return (
    <View style={styles.container}>
      {isLoading &&
        <Animated delay={500} duration={2000} outName="" style={styles.loading}>
          <AnimatedLogo delay={500} isInfinity/>
          {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
        </Animated>
      }
      {localUri && <Video
        shouldPlay={shouldPlay}
        isMuted
        isLooping
        rate={rate}
        resizeMode={resizeMode}
        style={style}
        source={{uri: localUri}}
        onLoad={() => {
          setLoading(false);
          onLoaded();
        }}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />}
      {(status.durationMillis && status.positionMillis)
        ? (<Liner style={{...styles.time, bottom: progressLineBottomPosition}} positionMillis={status.positionMillis}
               durationMillis={status.durationMillis}/>)
      : null}
    </View>
  )
};

VideoPlayerComponent.propTypes = {
  style: PropTypes.object,
  uri: PropTypes.string,
  rate: PropTypes.number,
  shouldPlay: PropTypes.bool,
  onLoaded: PropTypes.func.isRequired,
  loadingText: PropTypes.string,
  resizeMode: PropTypes.string,
  progressLineBottomPosition: PropTypes.number
};

export const VideoPlayer = VideoPlayerComponent;

