import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";


const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {
    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body;

        if (!userId || !recipeId || !title) {
            return res.status(400).json({
                error: "Missing required fields",
            });
        }

        const newFavorite = await db
            .insert(favoritesTable)
            .values({
                userId,
                recipeId,
                title,
                image,
                cookTime,
                servings,
            })
            .returning();

        res.status(201).json(newFavorite[0]);
    } catch (error) {
        console.log("Error adding Favorite", error);
        res.status(500).json({
            error: "Something went wrong",
        });
    }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const { userId, recipeId } = req.params;

       await db
        .delete(favoritesTable)
        .where(
            and(
            eq(favoritesTable.userId, userId),
            eq(favoritesTable.recipeId, recipeId)
            ));

        res.status(200).json({ message: "Favorite deleted successfully" });
    }catch (error) {
        console.log("Error deleting a favorite", error);
        res.status(500).json({
            error: "Something went wrong",
        });
    }
}); // Delete a favorite recipe for a user > npm start, and then test with Postman DELETE request to http://localhost:5001/api/favorites/1/123 (assuming userId=1 and recipeId=123) 

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
