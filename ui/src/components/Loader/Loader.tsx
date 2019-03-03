/* istanbul ignore file */
import React from 'react';
import { Spin, Icon } from 'antd';

type Props = {
  size?: number
}

class Loader extends React.Component<Props, any> {
  render() {
    const fontSize = this.props.size;
    const icon = <Icon type="loading" style={{ fontSize }} spin />;

    return (
      <Spin indicator={icon} />
    );
  }
}

export default Loader;
