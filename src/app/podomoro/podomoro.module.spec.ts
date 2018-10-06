import { PodomoroModule } from './podomoro.module';

describe('PodomoroModule', () => {
  let podomoroModule: PodomoroModule;

  beforeEach(() => {
    podomoroModule = new PodomoroModule();
  });

  it('should create an instance', () => {
    expect(podomoroModule).toBeTruthy();
  });
});
