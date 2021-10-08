import Registry from './Registry';

class TestInstance {
  constructor() {}
}

describe('Registry', () => {
  let TestRegistry: typeof Registry;

  beforeEach(() => {
    TestRegistry = require('./Registry').default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should not return instance from empty Registry', () => {
    const instance = TestRegistry.get('test', 'test');

    expect(instance).toBeNull();
  });

  it('should set instance to Registry', () => {
    const instance = new TestInstance();

    TestRegistry.set('test', 'instance', instance);
    const instanceFromRegistry = TestRegistry.get('test', 'instance');

    expect(instanceFromRegistry).toBe(instance);
  });

  it('should delete current instance form Registry', () => {
    const instance = new TestInstance();

    TestRegistry.set('test', 'instance', instance);
    TestRegistry.forget('test', 'instance');
    const instanceFromRegistry = TestRegistry.get('test', 'instance');

    expect(instanceFromRegistry).toBeNull();
  });
});
