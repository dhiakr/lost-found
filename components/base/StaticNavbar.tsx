import React from "react";
import BrandLogo from "./BrandLogo";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function StaticNavbar() {
  const supabase = createClientComponentClient();
  const session = await supabase.auth.getSession();

  return (
    <div>
      <nav className="flex justify-between items-center md:px-12 py-2 border-b-[1px]">
        <BrandLogo />

        <div className="flex justify-between items-end w-full md:w-auto">
          <Link href="/add-item" className="text-sm font-semibold">
            Add your item
          </Link>
          <NavMenu session={session.data?.session} />
        </div>
      </nav>
    </div>
  );
}
