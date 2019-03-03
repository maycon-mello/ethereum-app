import React from 'react';
import Loader from '../../components/Loader';

export interface Props {
  isLoading: boolean;
}

class Home extends React.Component<Props, any> {
  render() {
    if (this.props.isLoading) {
      return <Loader />
    }

    return (
      <div className="home-page">
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;