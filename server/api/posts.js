const router = require("express").Router();
const { requireUser, requireAdmin } = require("./idRequired");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", requireUser, async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.send(posts);
    } catch (error) {
        res.send(error)
    }
})

router.get("/:id", requireUser, async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!post) {
            res.send({ error: true, message: "Post Not Found" });
        } else {
            res.send(post);
        }
    } catch (error) {
        res.send(error);
    }
});
router.get("/user/:userId", requireUser, async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId,
            },
        });

        res.send(userPosts);
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", requireUser, async (req, res) => {
    try {
        const postData = {
            ...req.body,
            userId: req.userId,
        };
        const post = await prisma.post.create({
            data: postData,
        })
   
        res.send(post)
    } catch (error) {
        res.send(error)
    }

})

router.delete("/:id", requireUser, async (req, res) => {
    try {
        const postId = Number(req.params.id);

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        
        if (!post) {
            return res.send({ message: "Post not found" });
        }

        await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        res.send({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.send({ message: "Internal server error" });
    }
});

module.exports = router;