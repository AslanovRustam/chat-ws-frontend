"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function PortalCmp({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
