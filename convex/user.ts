import { v } from "convex/values";
import { mutation, query } from "./_generated/server"

// store user from clerk
export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        if (user !== null) {
            return user._id;
        }

        const userId = await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email!,
        });

        return userId;

}
});

// update address
export const addAddress = mutation({
    args: {
        address: v.optional(v.string()),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      address: args.address,
    });

    return user._id;
    },
});

// update phone number
export const addPhoneNumber = mutation({
    args: {
        phoneNumber: v.optional(v.string()),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      phoneNumber: args.phoneNumber,
    });

    return user._id;
    },
});

// get user by id
export const getUserById = query({
  args: {
    id: v.id("users"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// display user details
export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        return user;
    },
});