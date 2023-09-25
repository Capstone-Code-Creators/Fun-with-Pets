const router = require("express").Router();
const { requireUser, requireAdmin } = require("./idRequired"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:id", requireUser, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (!user) {
        res.send({ error: true, message: "user Not Found" });
      } else {
        res.send(user);
      }
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;