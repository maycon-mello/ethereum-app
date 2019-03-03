import { expect } from 'chai';
import { spy } from 'sinon';
import MessageModule, { setMessageApi } from './MessageModule';

const module = new MessageModule();
const messageApi = {
  success: spy(),
  error: spy(),
  open: spy(),
  info: spy(),
  loading: spy(),
  warning: spy(),
};

setMessageApi(messageApi);

describe('Modules MessageModule', () => {
  describe('Sagas', () => {
    const message = {
      content: 'message',
      duration: 2,
      onClose: () => {},
    };

    it('expect to show success message', () => {
      module.sagas.success({}, message);
      expect(messageApi.success).to.be.calledWith(message.content, message.duration, message.onClose);
    });

    it('expect to show error message', () => {
      module.sagas.error({}, message);
      expect(messageApi.error).to.be.calledWith(message.content, message.duration, message.onClose);
    });

    it('expect to show info message', () => {
      module.sagas.info({}, message);
      expect(messageApi.info).to.be.calledWith(message.content, message.duration, message.onClose);
    });

    it('expect to show loading message', () => {
      module.sagas.loading({}, message);
      expect(messageApi.loading).to.be.calledWith(message.content, message.duration, message.onClose);
    });

    it('expect to show warning message', () => {
      module.sagas.warning({}, message);
      expect(messageApi.warning).to.be.calledWith(message.content, message.duration, message.onClose);
    });

    it('expect to show custom message', () => {
      const customMessage = {
        ...message,
        type: 'success',
        icon: 'some-icon',
      };

      module.sagas.open({}, customMessage);
      expect(messageApi.open).to.be.calledWith({
        type: customMessage.type,
        content: customMessage.content,
        duration: customMessage.duration,
        icon: customMessage.icon,
        onClose: customMessage.onClose,
      });
    });
  }); 
});

