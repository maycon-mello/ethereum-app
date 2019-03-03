import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import withWrapper from './core/withWrapper';
import withParams from './core/withParams';
import withSearchParams from './core/withSearchParams';
import HomePage from './pages/HomePage';
import ContractListPage from './pages/ContractListPage';
import EditContractPage from './pages/EditContractPage';
import AddContractPage from './pages/AddContractPage';
import SettingsPage from './pages/SettingsPage';

export default () => (
  <HashRouter hashType="slash">
    <Switch>
      <Route exact path="/" component={withWrapper(HomePage)} />
      <Route exact path="/home" component={withWrapper(HomePage)} />
      <Route
        exact path="/contracts"
        component={
          withWrapper(
            withSearchParams(['name'])(ContractListPage)
          )
        }
      />
      <Route
        path="/contracts/new"
        component={withWrapper(AddContractPage)}
      />
      <Route
        path="/contracts/:contractId"
        component={
          withWrapper(
            withParams(['contractId'])(EditContractPage)
          )
        }
      />
      <Route
        path="/settings/"
        component={withWrapper(SettingsPage)}
      />
    </Switch>
  </HashRouter>
);
