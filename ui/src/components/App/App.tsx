import React from 'react';
import { Layout, Icon } from 'antd';
import ExchangeRateDrawer from '../ExchangeRateDrawer';
import './App.scss';
import AppMenu from '../AppMenu';
import logoImg from './logo.png';

const { Header, Sider, Content } = Layout;

type Props = {
  menuCollapsed: boolean,
  toggleMenu: any,
  currentPath: string,
  onPathChange: (path: string) => void,
};

class App extends React.Component<Props, {}> {
  render() {
    const { currentPath } = this.props;

    return (
      <Layout className="app-container">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.props.menuCollapsed}
        >
          <div className="logo">
            <img src={logoImg} alt="logo" />
          </div>
          <AppMenu currentPath={currentPath} onItemClick={this.props.onPathChange}/>
        </Sider>
        <Layout>
          <Header className="header">
            <Icon
              className="trigger toggle-menu"
              type={this.props.menuCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggleMenu}
            />
            <div className="exchenge-button-wrapper">
              <ExchangeRateDrawer />
            </div>
          </Header>
          <Content className="app-content">
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;