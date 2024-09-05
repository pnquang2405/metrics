import { Test, TestingModule } from '@nestjs/testing';
import { MetricsRepository } from './metrics.repository';

describe('Repository', () => {
  let provider: MetricsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsRepository],
    }).compile();

    provider = module.get<MetricsRepository>(MetricsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
