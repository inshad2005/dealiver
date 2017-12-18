import { TermConditionsModule } from './termConditions.module';

describe('TermConditionsModule', () => {
  let TermConditionsModule: TermConditionsModule;

  beforeEach(() => {
    TermConditionsModule = new TermConditionsModule();
  });

  it('should create an instance', () => {
    expect(TermConditionsModule).toBeTruthy();
  });
});
