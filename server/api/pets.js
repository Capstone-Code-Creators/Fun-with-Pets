const router = require("express").Router();
const { requireUser } = require("./idRequired");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//get all pets
router.get("/", requireUser, async (req, res) => {
    try {
        const pets = await prisma.pet.findMany();
        res.send(pets);
    } catch (error) {
        res.send(error)
    }
})

//get single pet by id
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


//post new pet
router.post("/", requireUser, async (req, res) => {
    try {
        const petData = {
            ...req.body,
            userId: req.userId,
        };
        const pet = await prisma.pet.create({
            data: petData,
        })
   
        res.send(pet)
    } catch (error) {
        res.send(error)
    }

})
//delete pets by id
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

        // Send a success message
        res.send({ message: "Pet deleted successfully" });

    } catch (error) {
        console.error("Error deleting pet:", error);
        res.send({ message: "Internal server error" });
    }
});


module.exports = router;