/* istanbul ignore file */

import React from 'react';

export default (paramList: Array<string>) => (Component: any) => (props: any) => {
  const nProps = {
    ...props,
  };

  paramList.forEach((param) => {
    nProps[param] = props.match.params[param];
  });

  return <Component {...nProps} />;
};