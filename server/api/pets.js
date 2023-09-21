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

router.post("/", verifyToken, async (req, res) => {
    try {
        
        const petData = {
            ...req.body,
            userId: req.userId,
        };
        const pet = await prisma.pet.create({
            data: petData,
        })
        console.log(pet);
        res.status(201).send(pet);
    } catch (error) {
        console.error("Error creating pet:", error);
        res.status(500).send(error);
    }

});

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