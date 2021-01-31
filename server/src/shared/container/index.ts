/*
  ? Vai controlar as dependencias da aplicação, vai dizer para os services quais repositorios vão ser injetado nas classes
*/
import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// (nome do id desse repositorio quando for chamado, valor)
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

// (nome do id desse repositorio quando for chamado, valor)
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);