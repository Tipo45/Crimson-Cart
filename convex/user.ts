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

// add address
export const addAddress = mutation({
  args: {
    street: v.string(),
    city: v.string(),
    state: v.string(),
    country: v.string(),
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

    return await ctx.db.insert("address", {
      userId: user._id,
      street: args.street,
      city: args.city,
      state: args.state,
      country: args.country,
    });
  },
});

// view address
export const getAddresses = query({
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

    return await ctx.db
      .query("address")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .collect();
  },
});

// update addresss
export const updateAddress = mutation({
  args: {
    addressId: v.id("address"),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    country: v.optional(v.string()),
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

    const existingAddress = await ctx.db.get(args.addressId);
    if (!existingAddress) throw new Error("Address not found");

    await ctx.db.patch(args.addressId, {
      street: args.street,
      city: args.city,
      state: args.state,
      country: args.country,
    });

    return args.addressId;
  },
});

// delete address
export const deleteAddress = mutation({
  args: {
    addressId: v.id("address"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.addressId);
  },
});

// update card
export const addCard = mutation({
  args: {
    brand: v.string(),
    name: v.string(),
    number: v.string(),
    expiry: v.string(),
    cvv: v.string(),
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

    return await ctx.db.insert("cards", {
      userId: user._id,
      brand: args.brand,
      name: args.name,
      number: args.number,
      expiry: args.expiry,
      cvv: args.cvv,
    });
  },
});

// view card
export const getCards = query({
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

    return await ctx.db
      .query("cards")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .collect();
  },
});

// delete card
export const deleteCard = mutation({
  args: {
    cardId: v.id("cards"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cardId);
  },
});

// update settings
export const updateSettings = mutation({
  args: {
    emailNotifications: v.optional(v.boolean()),
    pushNotifications: v.optional(v.boolean()),
    smsNotifications: v.optional(v.boolean()),
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

    const existingSettings = await ctx.db
      .query("notificationsettings")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .unique();

    if (existingSettings) {
      await ctx.db.patch(existingSettings._id, {
        emailNotifications: args.emailNotifications,
        pushNotifications: args.pushNotifications,
        smsNotifications: args.smsNotifications,
      });

      return existingSettings._id;
    }

    return await ctx.db.insert("notificationsettings", {
      userId: user._id,
      emailNotifications: args.emailNotifications ?? true,
      pushNotifications: args.pushNotifications ?? true,
      smsNotifications: args.smsNotifications ?? false,
    });
  },
});

// get settings 
export const getSettings = query({
  args: {},
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

    if (!user) {
      return null;
    }

    return await ctx.db
      .query("notificationsettings")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .unique();
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

// add to wishlist
export const toggleWishlist = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
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

    const existing = await ctx.db
      .query("wishlist")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", user._id).eq("productId", args.productId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);

      return {
        action: "removed",
      };
    }

    await ctx.db.insert("wishlist", {
      userId: user._id,
      productId: args.productId,
    });

    return {
      action: "added",
    };
  },
});

// remove from wishlist
export const removeFromWishlist = mutation({
  args: {
    wishlistItemId: v.id("wishlist"),
  },
  handler: async (ctx, args) => {


    const item = await ctx.db.get(args.wishlistItemId);

    if (!item) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.wishlistItemId);

    return true;
  },
});

// get wishlist items
export const getWishlist = query({
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

    const wishlistItems = await ctx.db
      .query("wishlist")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .collect();

    return await Promise.all(
      wishlistItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);

        return {
          ...item,
          product,
        };
      })
    );
  },
});

// get Wishlist ids
export const getWishlistProductIds = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) return [];

    const wishlistItems = await ctx.db
      .query("wishlist")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return wishlistItems.map((item) => item.productId);
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

// apply coupon
export const applyCoupon = mutation({
  args: {
    code: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return {
        success: false,
        message: "UNAUTHORIZED",
      };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      return {
        success: false,
        message: "USER_NOT_FOUND",
      };
    }

    const coupon = await ctx.db
      .query("coupons")
      .withIndex("by_code", (q) =>
        q.eq("code", args.code)
      )
      .unique();

    if (!coupon) {
      return {
        success: false,
        message: "INVALID_CODE",
      };
    }

    if (!coupon.active) {
      return {
        success: false,
        message: "INACTIVE",
      };
    }

    if (
      coupon.expiresAt &&
      Date.now() > new Date(coupon.expiresAt).getTime()
    ) {
      return {
        success: false,
        message: "EXPIRED",
      };
    }

    if (
      coupon.usageLimit &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return {
        success: false,
        message: "LIMIT_REACHED",
      };
    }

    const existingUsage = await ctx.db
      .query("couponUsages")
      .withIndex("by_coupon_user", (q) =>
        q.eq("couponId", coupon._id)
          .eq("userId", user._id)
      )
      .unique();

    if (existingUsage) {
      return {
        success: false,
        message: "ALREADY_USED",
      };
    }

    return {
      success: true,
      coupon,
    };
  },
});

//complete order
// await ctx.db.patch(coupon._id, {
    //   usedCount: coupon.usedCount + 1,
    // });

// get all products
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();

    return await Promise.all(
      products.map(async (product) => {
        const reviews = await ctx.db
          .query("reviews")
          .withIndex("by_product", (q) =>
            q.eq("productId", product._id)
          )
          .collect();

        const reviewCount = reviews.length;

        const averageRating =
          reviewCount > 0
            ? reviews.reduce(
              (sum, review) => sum + (review.rating ?? 0),
              0
            ) / reviewCount
            : 0;
        return {
          ...product,
          averageRating,
          reviewCount,
        };
      })
    );
  },
});

// add products

// display image from storage
export const getImageUrl = query({
  args: {
    imageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.imageId);
  },
});

// get a single product by ID
export const getProductById = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    // if (!args.productId) return null;
    const product = await ctx.db.get(args.productId);
    return product;
  },
});

// update inventory


// get categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .collect();

    return [...new Set(products.map(p => p.category))];
  },
});

// get products by category
export const getProductsByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();

    return products;
  },
});

// add ratings and reviews
export const addReview = mutation({
  args: {
    productId: v.id("products"),
    rating: v.number(),
    review: v.string(),
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

    const product = await ctx.db.get(args.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Seller cannot review own product
    if (product.userId === user._id) {
      throw new Error("You cannot review your own product");
    }

    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_product_and_user", (q) =>
        q.eq("productId", args.productId)
          .eq("userId", user._id)
      )
      .unique();

    if (existingReview) {
      throw new Error("You already reviewed this product");
    }

    return await ctx.db.insert("reviews", {
      productId: args.productId,
      userId: user._id,
      rating: args.rating,
      review: args.review,
    });
  },
});

// query individual ratings and review
export const getProductRatings = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_product", (q) =>
        q.eq("productId", args.productId)
      )
      .collect();

    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review) => {
        const user = await ctx.db.get(review.userId);

        return {
          ...review,
          userName: user?.email,
        };
      })
    );

    const reviewCount = reviews.length;

    const averageRating =
      reviewCount === 0
        ? 0
        : reviews.reduce(
          (sum, review) => sum + (review.rating ?? 0),
          0
        ) / reviewCount;

    return {
      averageRating: Number(
        averageRating.toFixed(1)
      ),
      reviewCount,
      reviews: reviewsWithUsers,
    };
  },
});

// query all ratings and reviews for a product
export const getRatings = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();

    return await Promise.all(
      products.map(async (product) => {
        const reviews = await ctx.db
          .query("reviews")
          .withIndex("by_product", (q) =>
            q.eq("productId", product._id)
          )
          .collect();

        const reviewCount = reviews.length;

        const averageRating =
          reviewCount === 0
            ? 0
            : reviews.reduce(
              (sum, review) => sum + (review.rating ?? 0),
              0
            ) / reviewCount;

        return {
          ...product,
          averageRating: Number(
            averageRating.toFixed(1)
          ),
          reviewCount,
        };
      })
    );
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