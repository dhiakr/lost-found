import AddItemForm from "@/components/AddItemForm";
import Navbar from "@/components/base/Navbar";
import Counter from "@/components/common/Counter";
import { generateRandomNumber } from "@/lib/utils";

import Image from "next/image";
import React from "react";

export default function AddItem() {
  return (
    <div>
      <Navbar />
      <div className="container mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4">
          <div>
            <h1 className="text-green-800 font-bold text-7xl">
              Found it or
            </h1>
            <h1 className="text-brand font-bold text-7xl">
              Lost it
            </h1>
            <h1 className="text-black font-semibold text-3xl mb-3">
              You could earn
            </h1>
            <div className="flex space-x-4 items-center">
              <Counter num={generateRandomNumber()} />
              <strong className="text-3xl">per night</strong>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-2 mt-5">
              <Image
                src="/images/item_img.jpeg"
                width={200}
                height={200}
                alt="item"
                className="rounded-2xl object-cover"
              />
              <Image
                src="/images/item_img1.jpeg"
                width={205}
                height={205}
                alt="item"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="">
            <AddItemForm />
          </div>
        </div>
      </div>
    </div>
  );
}
