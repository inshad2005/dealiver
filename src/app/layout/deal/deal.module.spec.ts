import { DealModule } from './deal.module';

describe('DealModule', () => {
  let dealModule: DealModule;

  beforeEach(() => {
    dealModule = new DealModule();
  });

  it('should create an instance', () => {
    expect(dealModule).toBeTruthy();
  });
});
