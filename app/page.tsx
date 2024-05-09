import Categories from "@/components/common/Categories";
import Navbar from "@/components/base/Navbar";
import Toast from "@/components/base/Toast";
import ItemCard from "@/components/common/ItemCard";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "../public/service-worker";
import Head from "next/head";

export default async function Item({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });
  const query = supabase
    .from("items")
    .select("id ,image ,title ,country ,city ,status , users (metadata->name)");
  if (searchParams?.country) {
    query.ilike("country", `%${searchParams?.country}%`);
  }
  if (searchParams?.category) {
    query.contains("categories", [searchParams?.category]);
  }

  const { data: items } = await query;

  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Navbar />
      <Toast />
      <div className="flex justify-center">
        <Categories />
      </div>

      {/* Load the item cards */}
      {items && items?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10">
          {items?.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      )}

      {items && items?.length < 1 && (
        <div className="text-center mt-4">
          <h1 className="text-brand font-bold text-2xl">No item found!</h1>
        </div>
      )}
    </div>
  );
}
