import React from 'react';

export const createRenderRoute = (Component) => ([id, component, options]) => {
  return (
    <Component
      key={id}
      name={id}
      component={component}
      options={options}
    />
  );
};
