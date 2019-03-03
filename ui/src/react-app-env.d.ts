/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import Web3Module from './modules/Web3Module';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
  interface Global {
    web3: Web3Module
  }
}
 
interface SideEffects {
  put(reducer: string, action?: object): IterableIterator<any>;
  rootPut(reducer: ActionType, action?: object): IterableIterator<any>;
  select(propName: string | any): IterableIterator<any>;
  rootSelect(propName: GetterType): IterableIterator<any>;
  debounce(time: number, propName: string): IterableIterator<any>;
  call(func: Function, ...args: any): IterableIterator<any>;
  take(args: string[]): IterableIterator<any>;
  rootTake(args: Array<ActionType>): IterableIterator<any>;
}

interface ConnectProps {
  dispatch(type: ActionType, props?: any): function;
  get(type: GetterType): function,
  props: any,
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
