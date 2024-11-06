"use client";
import React, { useState } from "react";
import axios from "axios";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { NextStep } from "../../components/Custom/NextStep";

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT || 3000;

const Register: React.FC = () => {
   const [username, setusername] = useState("");
   const [password, setpassword] = useState("");
   const [displayName, setdisplayName] = useState("");
   const [email, setemail] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { toast } = useToast();

   const SubmitRegister = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      const data = {
         username,
         password,
         DisplayName:displayName,
         Email:email,
      };

      try {
         const response = await axios.post(`${SERVER_PORT}Auth/Register`, data);
         console.log(response);
         console.log("Đăng Ký Thành Công!");
         if (response.status === 201) {
            const handleLoginNowClick = () => {
               window.location.reload(); 
            };
            toast({
               variant: "default",
               title: "Register Successfully",
               description: "Let Login to unleash your dreams.",
               action: (
                  <ToastAction
                     altText="Login Now"
                     onClick={handleLoginNowClick}
                  >
                     Login Now
                  </ToastAction>
               ),
            });
            setTimeout(() => {
               window.location.reload();
            }, 1500);
         }
      } catch (error) {
         console.error(error);
         console.log("Đăng Ký Thất Bại!");

         if (axios.isAxiosError(error) && error.response?.status === 401) {
            toast({
               variant: "default",
               title: "Register Failed",
               description: "Please check your login information again.",
               action: <ToastAction altText="Thử lại">Retry</ToastAction>,
            });
         } else {
            console.error("Register Error:", error);
            toast({
               variant: "destructive",
               title: "Register Error",
               description: "An error occurred. Please try again later.",
            });
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div >
         <form onSubmit={SubmitRegister}>
            <TabsContent value="register" >
               <Card>
                  <CardHeader>
                     <CardTitle>Register</CardTitle>
                     <CardDescription>
                        Create Your Account to Unleash Your Dreams
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <div className="space-y-1">
                        <Label htmlFor="current">UserName</Label>
                        <Input
                           className="glassi"
                           id="name"
                           value={username}
                           onChange={(event) => setusername(event.target.value)}
                           placeholder="Enter Your UserName"
                        />
                     </div>
                     <div className="space-y-1">
                        <Label htmlFor="current">Email</Label>
                        <Input
                           className="glassi"
                           id="name"
                           type="email"
                           value={email}
                           onChange={(event) => setemail(event.target.value)}
                           placeholder="Enter Your Email"
                        />
                     </div>
                     <div className="space-y-1">
                        <Label htmlFor="current">Password</Label>
                        <Input
                           className="glassi"
                           id="current"
                           type="password"
                           value={password}
                           onChange={(event) => setpassword(event.target.value)}
                           placeholder="Enter Your Password"
                        />
                     </div>
                     <div className="space-y-1">
                        <Label htmlFor="new">Display Name</Label>
                        <Input
                           className="glassi"
                           id="new"
                           type="text"
                           value={displayName}
                           onChange={(event) =>
                              setdisplayName(event.target.value)
                           }
                           placeholder="Enter Your Display name"
                        />
                     </div>
                  </CardContent>
                  <CardFooter className="align">
                     <Button variant="outline">Cancel</Button>
                     <Button className="glow3" disabled={isSubmitting}>
                        Register
                     </Button>
                     {/* <NextStep disabled={isSubmitting}/> */}
                  </CardFooter>
               </Card>
            </TabsContent>
         </form>
      </div>
   );
};

export default Register;
