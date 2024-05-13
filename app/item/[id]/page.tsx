import Navbar from "@/components/base/Navbar";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { getImageUrl } from "@/lib/utils";
import { ItemsType } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default async function ShowItem({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    toast({
      title: "Logged out!",
      description: "Logged out successfully!",
      className: "bg-error",
    });
  }

  const { data } = await supabase
    .from("items")
    .select("* ,users (metadata->name)")
    .eq("id", params?.id);
  const item: ItemsType | null = data?.[0];
  return (
    <div className="mb-10">
      <Navbar />
      <div className="container mt-5">
        <div>
          <h1 className="text-2xl font-bold">{item?.title}</h1>
          <h1
            className="text-2xl font-bold"
            style={{
              color:
                item?.status === "Lost"
                  ? "red"
                  : item?.status === "Found"
                  ? "green"
                  : "black",
            }}
          >
            {item?.status}
          </h1>
          <p>
            {item?.city} , {item?.state} ,{item?.country}
          </p>
        </div>

        <Image
          src={getImageUrl(item?.image)}
          width={100}
          height={100}
          alt="item_img"
          className="w-full rounded-lg h-fit object-cover object-center my-5"
          unoptimized
        />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">
            Hosted By {item?.name}
          </h1>

          <Button className="text-lg font-bold bg-brand" disabled={!user}>
            <Link href="/">{user ? "Contact" : "Login to Contact"}</Link>
          </Button>
        </div>

        <h1 className="text-xl font-semibold">
          {item?.title} in {item?.city} , {item?.state} ,{item?.country}
        </h1>

        <div
          className="mt-5"
          dangerouslySetInnerHTML={{
            __html: item?.description,
          }}
        ></div>
      </div>
    </div>
  );
}
