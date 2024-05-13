"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MenuIcon } from "lucide-react";
import SignupModal from "../auth/SignupModal";
import LoginModal from "../auth/LoginModal";
import SignOutBtn from "../auth/SignOutBtn";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function NavMenu({ session }: { session: object | null }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser({ id: user.id });
        }
      } catch (error) {
        console.error("Error fetching user:");
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session, supabase.auth]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="mr-6">
        <ul>
          {session && user ? (
            <>
              <Link href="/dashboard">
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                  Dashboard
                </li>
              </Link>
              <Link href="/add-item">
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                  Add Item
                </li>
              </Link>
              <Link href={`/my-account/${user.id}`}>
                <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                  Profile
                </li>
              </Link>
              <SignOutBtn />
            </>
          ) : (
            <>
              <LoginModal />
              <SignupModal />
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
