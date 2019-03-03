import React from 'react';
import { message } from 'antd';
import { Saga, ReduxModule } from '../redux/lib/decorators';
import { MessageApi } from 'antd/lib/message';

declare type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export const DEFAULT_DURATION = 2;

let messageApi: MessageApi = message;

export function setMessageApi(service: any) {
  messageApi = service;
}

type State = {

};

export type MessageAction = {
  content: React.ReactNode;
  duration: number | null;
  type: NoticeType;
  onClose?: () => void;
  icon?: React.ReactNode;
}

class MessageModule extends ReduxModule<State> {  
  state = {

  }

  @Saga('open')
  open(_saga: SideEffects, props: MessageAction) {
    messageApi.open({
      type: props.type,
      content: props.content,
      duration: props.duration || DEFAULT_DURATION,
      icon: props.icon,
      onClose: props.onClose,
    });  
  }

  @Saga('success')
  success(saga: any, props: MessageAction) {
    messageApi.success(props.content, props.duration || DEFAULT_DURATION, props.onClose);
  }

  @Saga('error')
  error(saga: any, props: MessageAction) {
    messageApi.error(props.content, props.duration || DEFAULT_DURATION, props.onClose);
  }

  @Saga('info')
  info(saga: any, props: MessageAction) {
    messageApi.info(props.content, props.duration || DEFAULT_DURATION, props.onClose);
  }

  @Saga('loading')
  loading(saga: any, props: MessageAction) {
    messageApi.loading(props.content, props.duration || DEFAULT_DURATION, props.onClose);
  }

  @Saga('warning')
  warning(saga: any, props: MessageAction) {
    messageApi.warning(props.content, props.duration || DEFAULT_DURATION, props.onClose);
  }
}

export default MessageModule;