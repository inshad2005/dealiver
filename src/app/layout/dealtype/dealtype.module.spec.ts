import { DealtypeModule } from './dealtype.module';

describe('DealtypeModule', () => {
  let dealtypeModule: DealtypeModule;

  beforeEach(() => {
    dealtypeModule = new DealtypeModule();
  });

  it('should create an instance', () => {
    expect(dealtypeModule).toBeTruthy();
  });
});
