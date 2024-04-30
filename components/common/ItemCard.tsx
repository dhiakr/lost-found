import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

export default function ItemCard({ item }: { item: any }) {
  return (
    <Link href={`/item/${item.id}`}>
      <div className="text-start">
        <Image
          src={getImageUrl(item.image)}
          width={100}
          height={100}
          alt={item.title}
          className="w-full h-[300px] rounded-xl object-cover object-center"
          unoptimized
        />
        <p className="font-semibold">
          {item.city}, {item.country}
        </p>
        <p>{item.title}</p>
        <p>{item.status}</p>
      </div>
    </Link>
  );
}
