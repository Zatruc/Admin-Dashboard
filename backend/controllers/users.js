import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// register user
const registerUser = async (req, res) => {
  const { name, email, password, rol, sales } = req.body;

  try {
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist)
      return res.status(400).json({ message: 'User already registered' });

    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
    const newUser = await prisma.user.create({
      data: { name, email, password: hash, rol, sales },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while registering', error: error.message });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    // check if the password matches
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};

export { registerUser, loginUser };
