import Navbar from "@/components/base/Navbar";
import React from "react";

import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ItemsType } from "@/types";

export default async function ShowItem({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("items")
    .select("* ,users (metadata->name)")
    .eq("id", params?.id);
  const item: ItemsType | null = data?.[0];
  return (
    <div className="mb-10">
      <Navbar />
      <div className="container mt-5">
        {/* Title and Country details */}
        <div>
          <h1 className="text-2xl font-bold">{item?.title}</h1>
          <p>
            {item?.city} , {item?.state} ,{item?.country}
          </p>
        </div>

        <Image
          src={getImageUrl(item?.image)}
          width={100}
          height={100}
          alt="item_img"
          className="w-full rounded-lg h-[500px] object-cover object-center my-5"
          unoptimized
        />
        <h1 className="text-2xl font-bold text-brand">
          Hosted By {item?.users?.name}
        </h1>

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
