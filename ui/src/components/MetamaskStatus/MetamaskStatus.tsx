import React from 'react';
import { Alert } from 'antd';
import { Web3Status } from '../../modules/Web3Module';

export type Props = {
  status: Web3Status,
  isLoading: boolean,
  className?: string,
}

const metaMaskUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';
const metaMaskMessage = `To deploy your contract MetaMask is required, but no worries you can still create it and deploy afterwards.`;

const AlertMapping: any = {
  'not-found': (
    <Alert
      message="MetaMask not found"
      type="warning"
      showIcon
      description={
        <div>
          {metaMaskMessage}
          <a href={metaMaskUrl} target="_blank" rel="noopener noreferrer">Click here</a> if you want to install MetaMask.
        </div>
      }
    />
  ),
  'not-logged-in': (
    <Alert
      message="Please login on MetaMask"
      type="warning"
      showIcon
      description={
        <div>
          This is necessary to deploy your contract. If you want you can deploy it afterwards.
        </div>
      }
    />
  ),
};

// Could configure the Message to be closable
class MetamaskStatus extends React.Component<Props, any> {
  render() {
    const { status, isLoading } = this.props;

    if (isLoading || status === 'ready') {
      return null;
    }

    return (
      <div className={this.props.className}>
        { AlertMapping[status] }  
      </div>
    );
  }
}

export default MetamaskStatus;
