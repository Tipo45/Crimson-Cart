import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        address: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
    }).index("by_token", ["tokenIdentifier"]),

    products: defineTable({
        userId: v.id("users"),
        category: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        imageId: v.optional(v.id("_storage")),
    }),

    cart: defineTable({
        userId: v.id("users"),
        productId: v.id("products"),
        quantity: v.number(),
    }).index("by_user", ["userId"])
    .index("by_product", ["productId"])
    .index("by_user_product", ["userId", "productId"]),

    wishlist: defineTable({
        userId: v.id("users"),
        productId: v.id("products"),
    }).index("by_user", ["userId"]),
});