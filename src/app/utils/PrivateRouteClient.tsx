"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectisUserAuthenticated } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

export default function PrivateRouteClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectisUserAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
