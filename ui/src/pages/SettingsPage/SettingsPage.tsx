import React from 'react';
import Loader from '../../components/Loader';

export interface Props {
  isLoading: boolean,
}

class SettingsPage extends React.Component<Props, any> {
  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }

    return (
      <div className="settings-page">
        <h1>Settings</h1>
      </div>
    );
  }
}

export default SettingsPage;