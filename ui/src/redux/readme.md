# Redux configuration

This is a custom redux setup to allow creating modules

The following example shows a module

```js
const myModule = {
  namespaced: true,
  state: {
    // default state
    myProps: 'test',
    someArray: [],
  },
  getters: {
    // computed properties
    itemsCount: (state: State) => state.someArray.length
  },
  reducers: {
    myReducer: (state: State, props: Action) {
      return {
        ...state,
        // update state
      }
    },
  }
  sagas: {
    * myReducer: (sagas: Sagas, props: Action) => {
      // side effects
    }
  },
}

```