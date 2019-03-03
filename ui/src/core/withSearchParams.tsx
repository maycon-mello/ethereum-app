/* istanbul ignore file */

import React from 'react';

export default (paramList: Array<string>) => (Component: any) => (props: any) => {
  const nProps = {
    ...props,
  };

  const searchParams = new URLSearchParams(props.location.search.substring(1));

  paramList.forEach((paramName: string) => {
    nProps[paramName] = searchParams.get(paramName);
  })

  return <Component {...nProps} />;
};