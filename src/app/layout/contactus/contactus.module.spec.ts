import { ContactusModule } from './contactus.module';

describe('ContactusModule', () => {
  let ContactusModule: ContactusModule;

  beforeEach(() => {
    ContactusModule = new ContactusModule();
  });

  it('should create an instance', () => {
    expect(ContactusModule).toBeTruthy();
  });
});
