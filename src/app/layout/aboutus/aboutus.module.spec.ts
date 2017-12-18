import { AboutusModule } from './aboutus.module';

describe('AboutusModule', () => {
  let AboutusModule: AboutusModule;

  beforeEach(() => {
    AboutusModule = new AboutusModule();
  });

  it('should create an instance', () => {
    expect(AboutusModule).toBeTruthy();
  });
});
