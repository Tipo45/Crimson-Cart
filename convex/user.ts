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
  handler: async (ctx, args) => {
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
  handler: async (ctx, args) => {
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

// add to cart
export const addToCart = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
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

    const existingCartItem = await ctx.db
      .query("cart")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", user._id).eq("productId", args.productId)
      )
      .unique();

    if (existingCartItem) {
      await ctx.db.patch(existingCartItem._id, {
        quantity: existingCartItem.quantity + args.quantity,
      });

      return existingCartItem._id;
    }

    return await ctx.db.insert("cart", {
      userId: user._id,
      productId: args.productId,
      quantity: args.quantity,
    });
  },
});

// query cart
export const getCart = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      return [];
    }

    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .collect();

    return await Promise.all(
      cartItems.map(async (cartItem) => {
        const product = await ctx.db.get(cartItem.productId);

        if (!product) return null;

        return {
          _id: cartItem._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: cartItem.quantity,
          category: product.category,
        };
      })
    ).then((items) => items.filter(Boolean));
  },
});

// display image from storage
export const getImageUrl = query({
  args: {
    imageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.imageId);
  },
});

// remove item from cart
export const removeFromCart = mutation({
  args: {
    cartItemId: v.id("cart"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    const item = await ctx.db.get(args.cartItemId);

    if (!item || item.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.cartItemId);

    return true;
  },
});

// update cart quantity
export const updateCartQuantity = mutation({
  args: {
    cartItemId: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    const cartItem = await ctx.db.get(args.cartItemId);

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    // 🔒 ensure user owns this cart item
    if (cartItem.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    // ❌ prevent invalid quantity
    if (args.quantity <= 0) {
      await ctx.db.delete(args.cartItemId);
      return "removed";
    }

    // ✅ update quantity
    await ctx.db.patch(args.cartItemId, {
      quantity: args.quantity,
    });

    return "updated";
  },
});

// get all products
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return products;
  },
});

// get a single product by ID
export const getProductById = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    return product;
  },
});

// get products by category
// export const getProductsByCategory = query({
//   args: {
//     category: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const products = await ctx.db
//       .query("products")
//       .withIndex("by_category", (q) => q.eq("category", args.category))
//       .collect();

//     return products;
//   },
// });

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