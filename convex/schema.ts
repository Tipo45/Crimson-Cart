import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        address: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
    })
    .index("by_token", ["tokenIdentifier"]),
    
});

