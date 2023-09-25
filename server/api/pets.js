const express = require("express")
const router = express.Router();
const verifyToken = require('./verifyToken');
const { requireUser } = require("./idRequired");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", requireUser, async (req, res) => {
    try {
        const pets = await prisma.pet.findMany();
        res.send(pets);
    } catch (error) {
        res.send(error)
    }
})

router.get("/:id", requireUser, async (req, res) => {
    try {
        const pet = await prisma.pet.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!pet) {
            res.send({ error: true, message: "Pet Not Found" });
        } else {
            res.send(pet);
        }
    } catch (error) {
        res.send(error);
    }
});
router.get("/userpets/:userId", requireUser, async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        const userPets = await prisma.pet.findMany({
            where: {
                userId: userId,
            },
        });

        res.send(userPets);
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/", requireUser, async (req, res) => {
    try {
        const petData = {
            ...req.body,
            userId: req.userId,
        };
        const pet = await prisma.pet.create({
            data: petData,
        });
        console.log(pet)
        res.send(pet)
    } catch (error) {
        if (error) {
            // Handle Prisma validation error, e.g., log it or send an appropriate response
            console.error("Prisma validation error:", error.message);
            res.status(400).json({ error: "Validation error" });
        } else {
            // Handle other errors
            console.error("Other error:", error);
            res.status(500).json({ error: "An internal server error occurred" });
        }
    }
})    

router.delete("/:id", requireUser, async (req, res) => {
    try {
        const petId = Number(req.params.id);

        const pet = await prisma.pet.findUnique({
            where: {
                id: petId,
            },
        });
        
        if (!pet) {
            return res.send({ message: "pet not found" });
        }

        await prisma.pet.delete({
            where: {
                id: petId,
            },
        });

        res.send({ message: "Pet deleted successfully" });

    } catch (error) {
        console.error("Error deleting pet:", error);
        res.send({ message: "Internal server error" });
    }
});


module.exports = router;