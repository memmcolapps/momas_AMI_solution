"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@?/components/ui/loader_animation";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/dashboard"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader message="Loading..." size="sm" fullScreen />
      </div>
    );
  }
}
