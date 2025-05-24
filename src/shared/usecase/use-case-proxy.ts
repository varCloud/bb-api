import UseCaseBase from './use-case-base';

class UseCaseProxy<T extends UseCaseBase> {
  constructor(private readonly _useCase: T) {}

  getInstance(): T {
    return this._useCase;
  }
}

export default UseCaseProxy;
