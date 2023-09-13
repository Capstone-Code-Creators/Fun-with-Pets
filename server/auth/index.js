const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("You have reached the auth router");
});


router.post("/signIn", async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        },
    });

    if (user) {
        // const passwordMatch = await bcrypt.compare(password, user.password);

        // if (passwordMatch) {
            const tokenPayload = {
                id: user.id,
            };

            const token = jwt.sign(tokenPayload, process.env.JWT);

            res.send({ token });

        } else {
            res.send({ message: "Invalid Login" });
        }
    // } else {
    //     res.send({ message: "User not found" });
    // }
});




router.post("/register", async (req, res) => {
    try {
        const user = req.body;

        // user.password = await bcrypt.hash(user.password, 10);

        const result = await prisma.user.create({
            data: user,
        });

        if (result) {
            const token = jwt.sign({ id: result.id }, process.env.JWT);

            res.status(201).send({ token });
        } else {
            res.send({ message: "Could not add User" });
        }
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
