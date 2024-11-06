"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CreateCollection from "@/components/Collection/CreateCollection";

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;

function MyComponent() {
   const [data, setData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = Cookies.get("token");
            if (!token) {
               router.push("/Auth");
            } else {
               console.log("Token:", token);
               const response = await axios.get(`${SERVER_PORT}Collection`, {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               });

               setData(response.data);
            }
         } catch (error: any) {
            if (error.response) {
               // Xử lý lỗi cụ thể từ server (ví dụ: 401 Unauthorized)
               setError(
                  error.response.data.message || error.response.statusText
               );
            } else if (error.request) {
               // Yêu cầu đã được gửi nhưng không nhận được phản hồi
               setError("No response from server");
            } else {
               // Xử lý các lỗi khác
               setError(error.message);
            }
         }
      };

      fetchData();
   }, [router]);

   if (error) return <div>Lỗi: {error}</div>;
   if (!data) return <div>Đang tải...</div>;

   return (
      <div className="mt-32">
         {/* Hiển thị dữ liệu */}
         <pre>{JSON.stringify(data, null, 2)}</pre>
         <CreateCollection/>
      </div>
   );
}

export default MyComponent;
