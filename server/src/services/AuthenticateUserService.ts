import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign  } from 'jsonwebtoken'
import authConfig from '../config/auth'

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService{
  public async execute({email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where: { email }
    })

    if(!user) {
      throw new Error("Invalid Email/Password combination.")
    }

    if(!user.password) throw new Error("Invalid Password")

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new Error("Invalid Email/Password combination.")
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id, // id do usuario
      expiresIn //tempo de duração do token
    });

    return { user, token }
  }
}

export default AuthenticateUserService;