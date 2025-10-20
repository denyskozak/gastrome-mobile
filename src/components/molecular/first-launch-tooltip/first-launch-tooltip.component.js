import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFirstLaunch } from '../../../utilities/isFirstLaunch';

import { Tooltip } from '../../atomic/tooltip/tooltip.component';

const FirstLaunchTooltipComponent = ({
  hideDelay = 8000,
  asyncStoreKey,
  text,
  placement = 'top',
  delay = 2000,
  children,
  isActive = true
}) => {

  const [isDisplay, setDisplay] = useState(false);

  // Show tooltip on first launch
  useEffect(() => {
    (async () => {
      const isFirst = await isFirstLaunch(asyncStoreKey);
      if (isFirst && isActive) {
        setTimeout(() => {
          setDisplay(true);

          setTimeout(() => {
            setDisplay(false);
            asyncStoreKey && AsyncStorage.setItem(asyncStoreKey, 'true');
          }, hideDelay);
        }, delay);

      }
    })();
  }, [setDisplay, isActive]);

  return (
    <Tooltip
      isVisible={isDisplay}
      text={text}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};

FirstLaunchTooltipComponent.propTypes = {
  asyncStoreKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'middle']),
  delay: PropTypes.number,
  hideDelay: PropTypes.number,
  isActive: PropTypes.bool,
};

export const FirstLaunchTooltip = FirstLaunchTooltipComponent;
