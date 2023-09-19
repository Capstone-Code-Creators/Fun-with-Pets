const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10
router.get("/", (req, res) => {
    res.send("You have reached the auth router");
});

router.post("/Login", async (req, res) => {
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

            res.send({token, tokenPayload});

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
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
        user.password = hashedPassword
        console.log(user)
        const result = await prisma.user.create({
            data: user,
        });
        delete result.password
        if (result) {
            const token = jwt.sign(result , process.env.JWT);

            res.status(201).send({ user: result, token });
        } else {
            res.status(400).send({ message: "Could not add User" });
        }
    } catch (error) {
        console.log('Error during registration:', error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
