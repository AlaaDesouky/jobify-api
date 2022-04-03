import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'



const register = async (req, res) => {
  const { name, email, password } = req.body
  // validation
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }

  let newUser = await User.create({ name, email, password })
  const token = newUser.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name, lastName: newUser.lastName, email: newUser.email, location: newUser.location }, token, location: newUser.location })
}

const login = async (req, res) => {
  res.send('login')
}

const updateUser = (req, res) => {
  res.send('updateUser')
}

export { register, login, updateUser }