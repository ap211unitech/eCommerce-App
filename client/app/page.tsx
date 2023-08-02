"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main>
      <Button>Welcome to Quick Mart</Button>
      <p>eCommerce</p>

      <Button size={"sm"} onClick={() => setTheme("dark")}>
        <Moon /> Dark
      </Button>
      <Button onClick={() => setTheme("light")}>
        <Sun /> Light
      </Button>
    </main>
  );
}
