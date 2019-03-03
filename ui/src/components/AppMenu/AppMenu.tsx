import React from 'react';
import { Menu, Icon } from 'antd';

type Props = {
  currentPath: string,
  onItemClick: (path: string) => void,
};

// possible keys: home, settings, contracts
const pathKeyRegex = /^\/(\w+)/;

export function getPathKey(path: string): string {
  const result = pathKeyRegex.exec(path);

  if (result && result[1]) {
    return result[1];
  }

  return 'home';
}

const menuOptions = [{
  key: 'home',
  path: '/home',
  title: 'Home',
  icon: <Icon type="home" />,
}, {
  key: 'contracts',
  path: '/contracts',
  title: 'Contracts',
  icon: <Icon type="money-collect" />,
}, {
  key: 'settings',
  path: '/settings',
  title: 'Settings',
  icon: <Icon type="tool" />,
}]

class AppMenu extends React.Component<Props, {}> {
  render() {
    const { currentPath, onItemClick } = this.props;

    return (
      <Menu 
        theme="dark"
        mode="inline"
        selectedKeys={[getPathKey(currentPath)]}
        className="app-menu"
      >
        {
          menuOptions.map((option: any) => (
            <Menu.Item key={option.key}>
              <a
                onClick={onItemClick.bind(this, option.path)}
                className={`menu-option-${option.key}`}
                href="javascript:;"
              >
                { option.icon }
                <span>{ option.title }</span>
              </a>
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
}

export default AppMenu;
