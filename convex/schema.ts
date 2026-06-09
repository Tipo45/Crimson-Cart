import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        address: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
    }).index("by_token", ["tokenIdentifier"]),

    // vendors: defineTable({
    //     businessName: v.string(),
    // }),

    products: defineTable({
        userId: v.id("users"),
        category: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        imageId: v.optional(v.id("_storage")),
        // vendor: v.id("vendors"),
    })
        .index("by_category", ["category"])
        .index("by_user", ["userId"]),

    reviews: defineTable({
        productId: v.id("products"),
        userId: v.id("users"),
        rating: v.optional(v.number()),
        review: v.optional(v.string()),
    }).index("by_product", ["productId"])
    .index("by_user", ["userId"])
    .index("by_product_and_user", ["productId", "userId"]),

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