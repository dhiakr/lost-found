import Navbar from "@/components/base/Navbar";
import Toast from "@/components/base/Toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import DeleteItembtn from "@/components/DeleteItembtn";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
export default async function Dashboard() {
  const serverSupabase = createServerComponentClient({ cookies });
  const { data: user } = await serverSupabase.auth.getUser();
  const { data: items } = await serverSupabase
    .from("items")
    .select("id ,image ,title ,country ,city ,status ,created_at")
    .eq("user_id", user.user?.id);
  return (
    <div>
      <Navbar />
      <Toast />
      <div className="container mt-5">
        {items && items.length > 0 && (
          <Table>
            <TableCaption>Your added Airbnb Items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Image
                      src={getImageUrl(item.image)}
                      width={40}
                      height={40}
                      alt="Item_img"
                      className="rounded-full w-10 h-10"
                    />
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DeleteItembtn id={item.id} />
                      <Link href={`/item/${item.id}`}>
                        <Button size="icon" className="bg-green-400">
                          <Eye />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {items && items.length < 1 && (
          <h1 className="text-center font-bold text-xl">
            No Item found. Please add your item
          </h1>
        )}
      </div>
    </div>
  );
}
