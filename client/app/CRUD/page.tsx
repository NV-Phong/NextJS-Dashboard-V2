"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import router from "next/router";

function MyComponent() {
   const [data, setData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = Cookies.get("token");
            console.log("Token:", token);

            const response = await axios.get("http://localhost:333/CRUD", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            setData(response.data);
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
   }, []);

   const handleLogout = () => {
      Cookies.remove("token");
      router.push('/Auth'); // Chuyển hướng sau khi đăng xuất
  };

   if (error) return <div>Lỗi: {error}</div>;
   if (!data) return <div>Đang tải...</div>;

   return (
      <div>
         {/* Hiển thị dữ liệu */}
         <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
   );
}

export default MyComponent;
