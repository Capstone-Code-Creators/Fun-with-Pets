const router = require("express").Router();
const { requireUser } = require("./idRequired"); // Import your user authentication middleware if needed
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all replies (if needed)
router.get("/", requireUser, async (req, res) => {
    try {
        const replies = await prisma.reply.findMany();
        res.send(replies);
    } catch (error) {
        console.error("Error fetching replies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST a new reply
router.post("/", requireUser, async (req, res) => {
    try {
        const { postId, commentId, replyText } = req.body;

        // Check if the comment exists
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const existingReplies = await prisma.reply.findMany({
            where: {
                commentId: commentId,
            }
        });

        const nextReplyId = existingReplies.length + 1;

        // Create a new reply
        const newReply = await prisma.reply.create({
            data: {
                postId: postId,
                commentId: commentId,
                replyId: nextReplyId,
                text: replyText,
            },
        });

        res.status(201).json(newReply);
    } catch (error) {
        console.error("Error creating reply:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE a reply by ID
router.delete("/:id", requireUser, async (req, res) => {
    try {
        const replyId = Number(req.params.id);

        const reply = await prisma.reply.findUnique({
            where: {
                id: replyId,
            },
        });

        if (!reply) {
            return res.status(404).json({ message: "Reply not found" });
        }

        await prisma.reply.delete({
            where: {
                id: replyId,
            },
        });

        res.status(204).send(); // No content response for successful deletion
    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;