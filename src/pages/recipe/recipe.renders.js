import { addSpaceWithCondition } from '../../utilities/renders';

// American weight system to Europe
const roundQuantity = value => Number(value).toFixed(1)
const changeQuantityToUSA = (quantity, unit, t) => {
  switch (unit) {
    case 'g':
      return [roundQuantity(quantity * 0.035274 ), t('oz')]; // Convert to ounces
    case 'ml':
      return [roundQuantity(quantity * 0.033814 ), t('oz')]; // Convert to ounces
    default:
      return [quantity, t(unit)]
  }
};

const renderValue = value => value ? ` ${value}` : '';

const changeQuantityToTbsp = (quantity, unit, t) => {
  switch (unit) {
    case 'g':
      return [roundQuantity(quantity * 0.066666 ), t('tbsp')]; // Convert to pounds
    case 'ml':
      return [roundQuantity(quantity * 0.067628), t('tbsp')]; // Convert to ounces
    default:
      return [quantity, t(unit)]
  }
}

const changeQuantityToEurope = (quantity, unit,  t) => {
  return [quantity, t(unit)]
}

const measureConvertors = {
  g: changeQuantityToEurope,
  oz: changeQuantityToUSA,
  tbsp: changeQuantityToTbsp,
};

const renderIngredientQuantity = (quantity, unit, measureSystem = 'g', t) => {
  return  renderQuantity(quantity, unit, t, '', measureSystem);
};

export const mapRenderCartQuantity = ({ quantity, unit, comment }, measureSystem = 'g', t) => renderQuantity(quantity, unit, t, comment, measureSystem);

export const renderQuantity = (quantity, unit, t, comment = '', measureSystem = 'g') => {
  if (typeof quantity === 'number') {
    const [parsedQuantity, parsedUnit] = measureConvertors[measureSystem](quantity, unit, t);
    return typeof quantity === 'number' ? `${parsedQuantity}${renderValue(parsedUnit)}${renderValue(comment)}` : '';
  } else {
    return '';
  }

};

export const renderIngredient = ({title, quantity, unit, description}, measureSystem = 'g', t) => {
  return  `${title}${addSpaceWithCondition(`- ${description}`, description)}${addSpaceWithCondition(`(${renderIngredientQuantity(quantity, unit, measureSystem, t)})`, quantity)}`;
};
