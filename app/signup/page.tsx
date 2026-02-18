import Link from "next/link";

export default function Signup() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md bg-primary rounded-2xl shadow-2xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary">Sign Up</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-2 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.7 1.22 9.19 3.61l6.87-6.87C35.92 2.69 30.39 0 24 0 14.82 0 6.71 5.29 2.69 13l8.23 6.39C12.76 13.37 17.95 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.68c-.55 2.97-2.2 5.49-4.7 7.18l7.23 5.62C43.97 37.18 46.5 31.36 46.5 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.92 28.39A14.49 14.49 0 019.5 24c0-1.53.26-3 .72-4.39L2 13.22A23.99 23.99 0 000 24c0 3.82.92 7.44 2.55 10.62l8.37-6.23z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.39 0 11.92-2.1 15.9-5.7l-7.23-5.62c-2.01 1.35-4.59 2.14-8.67 2.14-6.05 0-11.24-3.87-13.08-9.26l-8.37 6.23C6.71 42.71 14.82 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Already have account */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-secondary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
