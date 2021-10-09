/**
 * @jest-environment jsdom
 */
import Block from './Block';

interface TestProps {}

class TestBlock extends Block<TestProps> {
  constructor(props: {}) {
    super(props);
  }

  componentWillUpdate() {}

  componentShouldUpdate() {
    return true;
  }

  render() {
    return '';
  }
}

describe('Block', () => {
  const createInstance = (props: {}) => new TestBlock(props);

  it('should have uniq id', () => {
    const props = { test: 'test' };

    const instance = createInstance(props);

    expect(typeof instance.id).toBe('string');
  });

  it('should have props from constructor', () => {
    const props = { test: 'test' };

    const instance = createInstance(props);

    expect(instance.props).toEqual(props);
  });

  it('should set new props to props', () => {
    const props = { test: 'test' };
    const newProps = { test2: 'test2' };
    const instance = createInstance(props);

    instance.setProps(newProps);

    expect(instance.props).toEqual({ ...props, ...newProps });
  });
});
