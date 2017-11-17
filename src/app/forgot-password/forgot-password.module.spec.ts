import { ForgotPasswordModule} from './forgot-password.module';

describe('NotFoundModule', () => {
  let forgotPasswordModule: ForgotPasswordModule;

  beforeEach(() => {
    forgotPasswordModule= new ForgotPasswordModule();
  });

  it('should create an instance', () => {
    expect(forgotPasswordModule).toBeTruthy();
  });
});
