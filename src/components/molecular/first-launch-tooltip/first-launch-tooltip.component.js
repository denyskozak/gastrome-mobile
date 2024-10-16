import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { isFirstLaunch } from '../../../utilities/isFirstLaunch';

import { Tooltip } from '../../atomic/tooltip/tooltip.component';

const FirstLaunchTooltipComponent = (props) => {
  const {hideDelay, asyncStoreKey, text, placement, delay, children, isActive } = props;

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

FirstLaunchTooltipComponent.defaultProps = {
  placement: 'top',
  delay: 2000,
  hideDelay: 8000,
  isActive: true,
};

export const FirstLaunchTooltip = FirstLaunchTooltipComponent;
