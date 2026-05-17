"use client";

import Loading from "@/components/auth/loading";
import { useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <AuthLoading>
                <Loading />
            </AuthLoading>
            <Authenticated>
                {children}
            </Authenticated>
            <Unauthenticated>
                {children}
            </Unauthenticated>
        </ConvexProviderWithClerk>
    )
}
