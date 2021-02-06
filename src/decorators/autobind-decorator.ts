
  // Creating a Decorator to autobind 'this'.
  export function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    }
    //  get method is executed when the adjDescriptor is returned.
    return adjDescriptor;
  }
