const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../utils/jwt');

const authenticateUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, name } });
    }
    console.log(user);
    const token = generateToken(user.uuid);
    res.json({ token, userId: user.uuid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
//   getAllUsers,
//   createUser,
  authenticateUser,
};
