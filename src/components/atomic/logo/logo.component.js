import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './logo.styles';

const logo = require('./logo.png');
const logoWhite = require('./white.png');

export const LogoSizes = ['small', 'medium', 'large'];

const LogoComponent = ({ size = 'medium', color = 'black' }) => {
  const style = styles[`${size}`];
  if (!style) return null;

  return (
    <Image source={color === 'black' ? logo : logoWhite} style={[style]} />
  );
}

LogoComponent.propTypes = {
  size: PropTypes.oneOf(LogoSizes),
  color: PropTypes.oneOf(['white', 'black']),
}

export const Logo = LogoComponent;

