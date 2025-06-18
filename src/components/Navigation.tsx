"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is a mock authentication state - replace with your actual auth logic
const isAuthenticated = false;

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl">
            Chat App
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/chat" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Chat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 