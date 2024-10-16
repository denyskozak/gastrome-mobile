import { Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './logo.styles';

const logo = require('./logo.png');

export const LogoSizes = ['small', 'medium', 'large'];

const LogoComponent = (props) => {
  const { size } = props;
  const style = styles[`${size}`];
  if (!style) return null;

  return (
    <Image source={logo} style={[style]} />
  );
}

LogoComponent.propTypes = {
  size: PropTypes.oneOf(LogoSizes),
}

LogoComponent.defaultProps = {
  size: 'medium',
}

export const Logo = LogoComponent;
