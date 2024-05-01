"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { countries } from "@/config/countries";
import { Input } from "./ui/input";

import { categories } from "@/config/categories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemSchemaType, itemSchema } from "@/validation/itemSchema";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "./ui/textarea";

export default function AddItemForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [itemCategories, setItemCategories] = useState<Array<string> | []>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ItemSchemaType>({
    resolver: yupResolver(itemSchema),
  });

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  useEffect(() => {
    setValue("categories", itemCategories);
    setValue("description", description);
  }, [itemCategories, description, status, setValue]);

  const submit = async (payload: ItemSchemaType) => {

    setLoading(true);
    const user = await supabase.auth.getUser();
    const uniquePath = Date.now() + "_" + generateRandomNumber();
    const { data: imgData, error: imgErr } = await supabase.storage
      .from(Env.S3_BUCKET)
      .upload(uniquePath, image!);
    if (imgErr) {
      toast.error(imgErr.message, { theme: "colored" });
      setLoading(false);

      return;
    }

    // * Store item
    const { error: itemErr } = await supabase.from("items").insert({
      user_id: user.data.user?.id,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      title: payload.title,
      status: payload.status,
      description: payload.description,
      categories: itemCategories,
      image: imgData?.path,
    });

    if (itemErr) {
      toast.error(itemErr.message, { theme: "colored" });
      setLoading(false);
 
      return;
    }
console.log("payload");
    router.push("/dashboard?success=Item added successfully!");
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="mb-5">
      <ToastContainer />
      <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
        <div className="mt-5">
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Enter title"
            id="title"
            onChange={(e) => setValue("title", e.target.value)}
          />
          <span className="text-red-500 font-bold">
            {errors?.title?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="countries">Countries</Label>
          <select
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
            id="countries"
            {...register("country")}
          >
            <option value=""> -- Select Counrties --</option>
            {countries.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 font-bold">
            {errors?.country?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="state">State</Label>
          <Input placeholder="Enter state" id="state" {...register("state")} />
          <span className="text-red-500 font-bold">
            {errors?.state?.message}
          </span>
        </div>
        <div className="mt-5">
          <Label htmlFor="city">City</Label>
          <Input placeholder="Enter city" id="city" {...register("city")} />
          <span className="text-red-500 font-bold">
            {errors?.city?.message}
          </span>
        </div>
        <div className="mt-5 flex items-center">
          <span className="text-gray-700 mr-2">Status:</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-found"
              {...register("status")}
              value="found"
              checked={status === "found"}
              onChange={() => setStatus("found")}
              className="mr-2 appearance-none bg-gray-300 border-2 border-gray-300 rounded-md w-6 h-6 checked:bg-green-600 checked:border-transparent focus:outline-none"
            />
            <label
              htmlFor="status-found"
              className="text-sm mr-4 cursor-pointer"
            >
              Found
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-lost"
              {...register("status")}
              value="lost"
              checked={status === "lost"}
              onChange={() => setStatus("lost")}
              className="mr-2 appearance-none bg-gray-300 border-2 border-gray-300 rounded-md w-6 h-6 checked:bg-brand checked:border-transparent focus:outline-none"
            />
            <label htmlFor="status-lost" className="text-sm cursor-pointer">
              Lost
            </label>
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            placeholder="Enter image"
            id="image"
            onChange={handleImage}
          />
          <span className="text-red-500 font-bold">
            {errors?.image?.message}
          </span>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Write your description here.."
          id="description"
          {...register("description")}
        ></Textarea>
        <span className="text-red-500 font-bold">
          {errors?.description?.message}
        </span>
      </div>
      <div className="mt-5">
        <Label htmlFor="categories">Categories</Label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div className="items-top flex space-x-2" key={item.name}>
              <input
                type="checkbox"
                checked={(itemCategories as string[]).includes(item.name)}
                id={item.name}
                value={item.name}
                className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                onChange={(event) => {
                  if (event.target.checked) {
                    setItemCategories([...itemCategories, item.name]);
                  } else {
                    const filterCategories = itemCategories.filter(
                      (item) => item !== event.target.value
                    );
                    setItemCategories(filterCategories);
                  }
                }}
              />
              <label htmlFor={item.name} className="text-sm font-medium ">
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <span className="text-red-500 font-bold mt-2">
          {errors?.categories?.message}
        </span>
      </div>
      <div className="mt-5">
        <Button className="bg-brand w-full" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
