"use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/auth-context"; 
import { SidebarNav } from "@?/components/sidebar-nav";
import { SidebarProvider } from "@?/components/ui/sidebar";
import { Navbar } from "@?/components/navbar";
import { Loader } from "@?/components/ui/loader_animation";
import { useEffect, useState } from "react";


const hardcodedUser = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@company.com",
    business: {
        businessName: "Acme Corporation",
    },
};

const useHardcodedAuth = () => {
    return {
        user: hardcodedUser,
        isLoading: false,
    };
};

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const { user, isLoading } = useAuth(); 
    const { isLoading } = useHardcodedAuth();
    const [screenWidth, setScreenWidth] = useState<number | null>(null);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);
    //   const router = useRouter();

    // useEffect(() => {
    //   if (!isLoading && !user) {
    //     router.push("/login");
    //   }
    // }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader message="Loading application..." size="sm" />
            </div>
        );
    }

    // if (!user) {
    //   return null;
    // }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Mobile message - only shows on small screens */}
                <div className="bg-background fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
                    <div className="max-w-md text-center">
                        <h2 className="mb-4 text-3xl font-black">Screen Too Small</h2>
                        <p className="mb-4 text-2xl font-semibold">
                            This application is designed for larger screens. Please use a
                            tablet or desktop computer for the best experience.
                        </p>
                        <p>
                            Current screen size: {screenWidth ? `${screenWidth}px` : "…"}
                        </p>
                    </div>
                </div>

                <div className="hidden w-full md:flex overflow-hidden">
                    <div className="w-80 shrink-0">
                        <SidebarNav />
                    </div>
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <Navbar />
                        <main
                            className="flex-1 px-2 overflow-x-hidden"
                            style={{
                                backgroundImage: `url('/images/bgframe.jpg')`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "500px",
                                backgroundAttachment: "fixed",
                            }}
                        >
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}