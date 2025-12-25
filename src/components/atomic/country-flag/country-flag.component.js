import CountryFlagLib from 'react-native-country-flag';
import { CountryFlagMap } from './country-flag.list';

const CountryFlagComponent = (props) => {
  const { name } = props;

  return (
    <CountryFlagLib size={14} isoCode={CountryFlagMap[name]} />
  )
}

export const CountryFlag = CountryFlagComponent;
