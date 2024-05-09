import React from "react";
import BrandLogo from "./BrandLogo";
import { Search } from "lucide-react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SearchPopup from "../common/SearchPopup";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();
  return (
    <div>
      <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
        <div className=" md:block ">
          <BrandLogo />
        </div>
        <SearchPopup session={session} />
        <div className=" md:flex justify-center items-center space-x-4 mr-5">
          <Link
            href="/add-item"
            className="hidden md:flex text-sm font-semibold"
          >
            Add your item
          </Link>
          <NavMenu session={session.data?.session} />
        </div>
      </nav>
    </div>
  );
}
