"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CreateCollection from "@/components/Collection/CreateCollection";
import { Label } from "../ui/label";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";

interface Collection {
   id: string;
   name: string;
}

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;

function MyComponent() {
   const [data, setData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   const [collections, setCollections] = useState<Collection[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = Cookies.get("token");
            if (!token) {
               router.push("/Auth");
            } else {
               console.log("Token:", token);
               const response = await axios.get<Collection[]>(
                  `${SERVER_PORT}Collection`,
                  {
                     headers: {
                        Authorization: `Bearer ${token}`,
                     },
                  }
               );
               setCollections(response.data);

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
      <Select>
         <SelectTrigger className="w-[277px]">
            <SelectValue placeholder="Select Collection" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                     {collection.name}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}

export default MyComponent;
