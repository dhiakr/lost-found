import Navbar from "@/components/base/Navbar";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ShowItem({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const [item, setItem] = useState<ItemsType | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const { data: itemData, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", params?.id)
        .single();

      if (error) {
        console.error("Error fetching item:", error.message);
        return;
      }

      setItem(itemData);

      // Fetch user name separately
      if (itemData?.user_id) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("metadata->name")
          .eq("id", itemData.user_id)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError.message);
          return;
        }

        setUserName(userData?.metadata?.name || null);
      }
    };

    fetchItem();
  }, [params?.id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-10">
      <Navbar />
      <div className="container mt-5">
        {/* Title and Country details */}
        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <h1 className="text-2xl font-bold">{item.status}</h1>
          <p>
            {item.city} , {item.state} ,{item.country}
          </p>
        </div>

        <Image
          src={getImageUrl(item.image)}
          width={100}
          height={100}
          alt="item_img"
          className="w-full rounded-lg h-[500px] object-cover object-center my-5"
          unoptimized
        />
        {userName && (
          <h1 className="text-2xl font-bold text-brand">
            Hosted By {userName}
          </h1>
        )}

        <h1 className="text-xl font-semibold">
          {item.title} in {item.city} , {item.state} ,{item.country}
        </h1>

        <div
          className="mt-5"
          dangerouslySetInnerHTML={{
            __html: item.description || "",
          }}
        ></div>
      </div>
    </div>
  );
}
