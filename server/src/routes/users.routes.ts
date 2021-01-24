// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import {Router} from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try{
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.json(user)
  } catch(err) {
    // o catch vai pegar qualquer erro que alguma das funções dispare, ex: throw Error('...')
    // dentro do err vai receber apenas o err.message
    return response.status(400).json({error: err.message})
  }
})

export default usersRouter
