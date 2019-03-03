import { expect } from 'chai';
import { spy } from 'sinon';
import RouterModule from './RouterModule';
import { createSagaMock, resolveGenerator } from '../redux/lib/testUtils';

const module = new RouterModule();

describe('Modules RouterModule', () => {
  describe('Getters', () => {
    it('expect to get current path from history', () => {
      const pathname = 'test';
      const currentPath = module.getters.currentPath({
        history: { location: { pathname } },
      });
      
      expect(currentPath).to.be.equal(pathname);
    });
  });

  describe('Reducers', () => {
    it('expect to set history', () => {
      const history = Date.now();
      const state = module.reducers.setHistory({}, { history });
      expect(state.history).to.be.equal(history);
    });

    it('expect to set pending route', () => {
      const route = '/test';
      const state = module.reducers.setPendingRoute({}, { route });
      expect(state.pendingRoute).to.be.equal(route);
    });
  }); 

  describe('Sagas', () => {
    describe('injectHistory', () => {
      let sagaMock: any;
      let history: any;

      beforeEach(() => {
        sagaMock = createSagaMock();
        history = {
          push: spy(),
        };
      })

      it('expect to inject history', () => {
        const gen = module.sagas.injectHistory(sagaMock, { history });
        resolveGenerator(gen);
        expect(sagaMock.put).to.be.calledWith('setHistory', { history });
      });

      it('expect to skip inject history, since this is already injected', () => {
        const gen = module.sagas.injectHistory(sagaMock, { history });
        sagaMock.select = spy((key: string) => key === 'history' && history);
        resolveGenerator(gen);

        expect(sagaMock.select).to.be.calledWith('history');
        expect(sagaMock.put).to.not.be.called;
      });

      it('expect to push pending route and inject history', () => {
        const pendingRoute = '/test';
        const gen = module.sagas.injectHistory(sagaMock, { history });
        sagaMock.select = spy((key: string) => key === 'pendingRoute' && pendingRoute);

        resolveGenerator(gen);

        expect(sagaMock.select).to.be.calledWith('pendingRoute');
        expect(sagaMock.put).to.be.calledWith('setPendingRoute', { route: undefined });
        expect(sagaMock.put).to.be.calledWith('setHistory', { history });
        expect(history.push).to.be.calledWith(pendingRoute);
      });
    });

    describe('goTo', () => {
      let sagaMock: any;
      let history: any;
      const route = '/test';

      beforeEach(() => {
        sagaMock = createSagaMock();
        history = {
          push: spy(),
        };
      })

      it('expect to push route into history', () => {
        const gen = module.sagas.goTo(sagaMock, { route });
        sagaMock.select = spy((key: string) => key === 'history' && history);

        resolveGenerator(gen);

        expect(history.push).to.be.calledWith('/test');
      });

      it('expect to set pending route, since history is not injected yet', () => {
        const gen = module.sagas.goTo(sagaMock, { route });

        resolveGenerator(gen);

        expect(history.push).to.not.be.called;
        expect(sagaMock.put).to.be.calledWith('setPendingRoute', { route });
      });
    });
  }); 
});

