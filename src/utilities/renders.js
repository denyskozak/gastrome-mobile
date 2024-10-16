export const addSpaceBefore = (value) => value ? ` ${value}` : '';
export const addSpaceWithCondition = (value, condition) => condition ? addSpaceBefore(value) : '';