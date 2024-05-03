import React from "react";
import BrandLogo from "./BrandLogo";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function StaticNavbar() {
  const supabase = createClientComponentClient();
  const session = await supabase.auth.getSession();
  return (
    <div>
      <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
        <div className="hidden md:block">
          <BrandLogo />
        </div>

        <div className="hidden md:flex justify-center items-center space-x-4">
          <Link href="/add-item" className="text-sm font-semibold">
            Add you item
          </Link>
          <NavMenu session={session.data?.session} />
        </div>
      </nav>
    </div>
  );
}
