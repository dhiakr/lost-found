"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import StaticNavbar from "@/components/base/StaticNavbar";

export default function UserDetailsPage() {
  const supabase = createClientComponentClient();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
  } | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          router.push("/");
        } else {
          const { user_metadata, email } = user;
          const { name, phoneNumber } = user_metadata;
          setUserDetails({ email: email || "", name, phoneNumber });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (error === "User data not found") {
    return <p>User data not found. Please log in again.</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error}</p>;
  }

  return (
    <div>
      <StaticNavbar />
      <h1>User Details</h1>
      {userDetails ? (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone Number: {userDetails.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}
