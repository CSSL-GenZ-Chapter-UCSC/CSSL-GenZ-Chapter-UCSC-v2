"use client";

import { useState, useEffect } from "react";
import { Container } from "../shared/Container";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    if (isOpen) window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <header className="absolute lg:sticky inset-x-0 top-0 z-40">
      <Container>
        <>Navbar</>
      </Container>
    </header>
  );
};
