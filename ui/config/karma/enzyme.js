import Adapter from 'enzyme-adapter-react-16';
import Enzyme from '../node_modules/enzyme';

Enzyme.configure({ adapter: new Adapter() });

export * from '../node_modules/enzyme';
