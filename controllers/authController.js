import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'



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

  // Create User
  let newUser = await User.create({ name, email, password })
  const token = newUser.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name, lastName: newUser.lastName, email: newUser.email, location: newUser.location }, token, location: newUser.location })
}

const login = async (req, res) => {
  const { email, password } = req.body
  // Validate User Credentials
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  // Login User
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  const { email, name, location, lastName } = req.body
  if (!email, !name, !location, !lastName) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.email = email
  user.name = name
  user.location = location
  user.lastName = lastName

  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }