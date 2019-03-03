
interface SideEffects {
  put(reducer: string, action?: object): IterableIterator<any>;
  rootPut(reducer: string, action?: object): IterableIterator<any>;
  select(propName: string): IterableIterator<any>;
  rootSelect(propName: string): IterableIterator<any>;
  call(func: Function, ...args: Array<any>): IterableIterator<any>;
  take(args: string[]): IterableIterator<any>;
  rootTake(args: string[]): IterableIterator<any>;
}


declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
  interface Global {
    web3: Web3Module
  }
}
