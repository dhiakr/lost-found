"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/config/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Categories() {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState<string>("");

  useEffect(() => {
    if (params?.get("category")) {
      setCat(params?.get("category")!);
    }
  }, [params]);

  const handleClick = (cat: string) => {
    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set("category", cat);
    router.replace(`/${fullUrl.search}`);
  };

  return (
    <div className="flex items-center space-x-8 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
      {categories.map((item) => (
        <div
          className="flex justify-center flex-col items-center cursor-pointer "
          key={item.name}
          onClick={() => handleClick(item.name)}
        >
          <FontAwesomeIcon icon={item.icon} size="lg" />{" "}
          <span
            className={`${
              cat === item.name ? "inline-block border-b-4 border-brand" : ""
            } text-sm`}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}
