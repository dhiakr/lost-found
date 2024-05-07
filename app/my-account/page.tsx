"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import StaticNavbar from "@/components/base/StaticNavbar";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function UserDetailsPage() {
  const supabase = createClientComponentClient();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const qrCodeRef = useRef(null);

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
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, supabase.auth]);

  if (error === "User data not found") {
    return <p>User data not found. Please log in again.</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error}</p>;
  }

  // Generate the URL for the user profile page
  const userProfileUrl = userDetails
    ? `http://localhost:3000/${userDetails.email}`
    : "";

  // Function to handle download
  const handleDownload = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "qr_code.jpeg";
        link.click();
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <StaticNavbar />
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">User Details</h1>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 p-4">
            {loading ? (
              <div className="text-center">
                <p>Loading user details...</p>
              </div>
            ) : (
              <div>
                {userDetails && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Name:</span>{" "}
                      {userDetails.name}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {userDetails.email}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Phone Number: </span>
                      {"+216 "}
                      {userDetails.phoneNumber}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            {userProfileUrl && (
              <div className="text-center">
                <p className="text-lg mb-2 font-semibold">User QR Code:</p>
                <div ref={qrCodeRef}>
                  <QRCode value={userProfileUrl} />
                </div>
                <button
                  onClick={handleDownload}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
