import CountryFlagLib from 'react-native-country-flag';
import PropsType from 'prop-types';
import { CountryFlagMap } from './country-flag.list';

const CountryFlagComponent = (props) => {
  const { name } = props;

  return (
    <CountryFlagLib size={14} isoCode={CountryFlagMap[name]} />
  )
}

CountryFlagComponent.propTypes = {
  name: PropsType.oneOf(Object.keys(CountryFlagMap)).isRequired,
}

export const CountryFlag = CountryFlagComponent;