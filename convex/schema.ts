import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        phoneNumber: v.optional(v.string()),
        role: v.optional(v.union(
            v.literal("buyer"),
            v.literal("vendor"),
            v.literal("admin")
        )),

        vendorApproved: v.optional(v.boolean()),
    }).index("by_token", ["tokenIdentifier"]),

    vendors: defineTable({
        userId: v.id("users"),
        businessName: v.string(),
        businessEmail: v.string(),
        phoneNumber: v.string(),
        businessAddress: v.string(),
        description: v.optional(v.string()),
        logo: v.optional(v.string()),
        approved: v.boolean(),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),

    address: defineTable({
            userId: v.id("users"),
            street: v.string(),
            city: v.string(),
            state: v.string(),
            country: v.string(),
        }).index("by_user", ["userId"]),

    cards: defineTable({
        userId: v.id("users"),
        brand: v.string(),
        name: v.string(),
        number: v.string(),
        expiry: v.string(),
        cvv: v.string(),
    }).index("by_user", ["userId"]),

    notificationsettings: defineTable({
        userId: v.id("users"),
        emailNotifications: v.optional(v.boolean()),
        pushNotifications: v.optional(v.boolean()),
        smsNotifications: v.optional(v.boolean()),
    }).index("by_user", ["userId"]),

    products: defineTable({
        userId: v.id("users"),
        category: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        imageId: v.optional(v.id("_storage")),
    }).index("by_category", ["category"])
        .index("by_user", ["userId"]),

    cart: defineTable({
        userId: v.id("users"),
        productId: v.id("products"),
        quantity: v.number(),
    }).index("by_user", ["userId"])
        .index("by_product", ["productId"])
        .index("by_user_product", ["userId", "productId"]),

    coupons: defineTable({
        code: v.string(),
        discountType: v.union(
            v.literal("percentage"),
            v.literal("fixed")
        ),
        discountValue: v.number(),
        active: v.boolean(),
        expiresAt: v.string(),
        usageLimit: v.number(),
        usedCount: v.number(),
    })
        .index("by_code", ["code"]),

    couponUsages: defineTable({
        couponId: v.id("coupons"),
        userId: v.id("users"),
        usedAt: v.number(),
    })
        .index("by_coupon_user", ["couponId", "userId"])
        .index("by_user", ["userId"]),

    wishlist: defineTable({
        userId: v.id("users"),
        productId: v.id("products"),
    }).index("by_user", ["userId"])
        .index("by_user_product", ["userId", "productId"]),

    reviews: defineTable({
        productId: v.id("products"),
        userId: v.id("users"),
        rating: v.optional(v.number()),
        review: v.optional(v.string()),
    }).index("by_product", ["productId"])
        .index("by_user", ["userId"])
        .index("by_product_and_user", ["productId", "userId"]),
});