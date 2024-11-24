import { addSpaceWithCondition } from '../../utilities/renders';

// American weight system to Europe
const roundQuantity = value => Math.round(value).toFixed(2)
const changeQuantityToUSA = (quantity, unit) => {
  switch (unit) {
    case 'g':
      return [roundQuantity(quantity * 0.035274 ), 'oz']; // Convert to pounds
    case 'ml':
      return [roundQuantity(quantity * 0.033814 ), 'oz']; // Convert to ounces
    default:
      return [quantity, unit]
  }
};

const renderValue = value => value ? ` ${value}` : '';

const changeQuantityToTbsp = (quantity, unit) => {
  switch (unit) {
    case 'g':
      return [roundQuantity(quantity * 0.066666 ), 'tbsp']; // Convert to pounds
    case 'ml':
      return [roundQuantity(quantity * 0.067628), 'tbsp']; // Convert to ounces
    default:
      return [quantity, unit]
  }
}

const changeQuantityToEurope = (quantity, unit) => {
  return [quantity, unit]
}

const measureConvertors = {
  g: changeQuantityToEurope,
  oz: changeQuantityToUSA,
  tbsp: changeQuantityToTbsp,
};

const renderIngredientQuantity = (quantity, unit, measureSystem = 'g') => (
  renderQuantity(...(measureConvertors[measureSystem](quantity, unit)))
);

export const mapRenderCartQuantity = ({ quantity, unit, comment }, measureSystem = 'g') => renderQuantity(quantity, unit, comment, measureSystem);

export const renderQuantity = (quantity, unit, comment, measureSystem = 'g') => {
  if (quantity) {
    const [parsedQuantity, parsedUnit] = measureConvertors[measureSystem](quantity, unit);
    return quantity ? `${parsedQuantity}${renderValue(parsedUnit)}${renderValue(comment)}` : '';
  } else {
    return '';
  }

};

export const renderIngredient = ({title, quantity, unit, description}, measureSystem = 'g') => (
  `${title}${addSpaceWithCondition(`- ${description}`, description)}${addSpaceWithCondition(`(${renderIngredientQuantity(quantity, unit, measureSystem)})`, quantity)}`
);
