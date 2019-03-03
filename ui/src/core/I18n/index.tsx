/* istanbul ignore file */

import common from './common';

import React from 'react';

const defaultLang = 'en';
const languages: { [key: string]: any } = {};

const translate = (lang: string) => (key: string) => languages[lang][key];

const context = React.createContext({ t: translate });
const { Provider } = context;

class I18n extends React.Component<any,any> {

  render() {
    const value = {
      t: translate(this.props.lang || defaultLang),
      lang: this.props.lang,
    };

    return (
      <Provider value={value}>
        { this.props.children }
      </Provider>
    );
  }

  static register(langKey: string, namespace: string, keys: any) {

    if (!languages[langKey]) {
      languages[langKey] = {};
    }

    const values = languages[langKey];

    Object.keys(keys).forEach((key) => {
      values[`${namespace}.${key}`] = keys[key];  
    });
  }

  static Consumer = context.Consumer;
}

export function Text({ value }: { value: string}) {
  return (
    <I18n.Consumer>
      {({ t }) => {
        return t(value)
      } }
    </I18n.Consumer>
  );
}


I18n.register('en', 'common', common.en);
I18n.register('es', 'common', common.es);


export default I18n;

