class Registry implements IRegistry {
  instances: Record<string, Record<string, unknown>>;

  constructor() {
    this.instances = {};
  }

  get(slug: string, selector: string): unknown | null {
    return this.instances[selector] ? this.instances[selector][slug] : null;
  }

  set(slug: string, selector: string, instance: unknown): IRegistry {
    this.instances[selector] = this.instances[selector] || {};
    this.instances[selector][slug] = instance;
    return this;
  }

  forget(slug: string, selector: string): IRegistry {
    if (typeof this.instances[selector] !== 'undefined') {
      delete this.instances[selector][slug];
    }
    return this;
  }
}

export default new Registry();
