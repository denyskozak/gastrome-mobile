import { Image } from 'react-native';
import styles from './logo.styles';

const logo = require('./logo.png');
const logoWhite = require('./white.png');

export const LogoSizes = ['small', 'medium', 'large'];

const LogoComponent = ({
  size = 'medium',
  color = 'black',
}) => {
  const style = styles[`${size}`];
  if (!style) return null;

  return (
    <Image source={color === 'black' ? logo : logoWhite} style={[style]} />
  );
}

export const Logo = LogoComponent;
