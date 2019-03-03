import { expect } from 'chai';
import LayoutModule from './LayoutModule';

const module = new LayoutModule();

describe('Modules LayoutModule', () => {
  describe('Reducers', () => {
    it('expect to open menu', () => {
      const state = module.reducers.toggleMenu({ menuCollapsed: false });
      expect(state.menuCollapsed).to.true;
    });

    it('expect to close menu', () => {
      const state = module.reducers.toggleMenu({ menuCollapsed: true });
      expect(state.menuCollapsed).to.false;
    });
  }); 
});

