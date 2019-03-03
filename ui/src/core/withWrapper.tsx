/* istanbul ignore file */

/**
 * Attach the header, menu and shared components into the children components (eg. pages)
 * 
 */
import React from 'react';
import App from '../components/App';

export default (Component: any) => (props: any) => {
  return (
    <App {...props}>
      <Component {...props} />
    </App>
  );
}