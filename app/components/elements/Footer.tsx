"use client";

import { Container } from "../shared/Container";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  // Hide footer on studio routes
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className="">
      <Container>
        <p className="">Footer</p>
      </Container>
    </footer>
  );
};
