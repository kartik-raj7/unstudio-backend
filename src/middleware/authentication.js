const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    try {
      const dbUser = await prisma.user.findUnique({
        where: { uuid: user.uuid },
      });
      if (!dbUser) return res.sendStatus(404);
      req.user = dbUser;
      next();
    } catch (dbError) {
      res.status(500).json({ error: dbError.message });
    }
  });
};

module.exports = authenticateToken;
