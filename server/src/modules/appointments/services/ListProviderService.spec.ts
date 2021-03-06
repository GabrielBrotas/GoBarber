import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderService: ListProviderService;

// o describe cria uma categoria para o teste
describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderService = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Warren Buffet',
      email: 'warrenbuffet@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'teste@gmail.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
