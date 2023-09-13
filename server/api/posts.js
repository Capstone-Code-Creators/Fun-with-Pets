const router = require("express").Router();
const { requireUser, requireAdmin } = require("./idRequired");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


//get all posts 
router.get("/", requireUser, async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.send(posts);
    } catch (error) {
        res.send(error)
    }
})
//get single post by id
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


//post new post
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
//delete posts that you posted
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

        // Send a success message
        res.send({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.send({ message: "Internal server error" });
    }
});


module.exports = router;