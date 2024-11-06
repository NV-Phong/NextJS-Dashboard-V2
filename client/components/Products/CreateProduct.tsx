"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import Cookies from "js-cookie";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import SelectCollection from "../Collection/SelectCollection";
import { PlusCircle } from "lucide-react";

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;
interface Collection {
   id: string;
   name: string;
}

const Createproduct: React.FC = () => {
   const [name, setname] = useState("");
   const [description, setdescription] = useState("");
   const [isprivate, setisprivate] = useState("");
   const [price, setprice] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const [collectionname, setcollectionname] = useState("");
   const [collections, setCollections] = useState<Collection[]>([]);

   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

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
            }
         } catch (error: any) {
            if (error.response) {
            } else if (error.request) {
            } else {
            }
         }
      };

      fetchData();
   }, [router]);

   const SubmitCreate = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      const data = {
         name,
         description,
         price,
         isprivate,
         collectionname,
      };

      try {
         const token = Cookies.get("token");
         console.log("Token:", token);
         const response = await axios.post(`${SERVER_PORT}Products`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         console.log(response);
         console.log("Create Successfully!");

         if (response.status === 201) {
            toast({
               variant: "default",
               title: "Create Successfully!",
               description: "Let go! to unleash your dreams.",
               action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            window.location.reload();
            setIsOpen(false);
         }
      } catch (error) {
         console.error(error);
         console.log("Create Failed!");

         if (axios.isAxiosError(error) && error.response?.status === 401) {
            toast({
               variant: "default",
               title: "Create Failed",
               description: "Please login again.",
               action: <ToastAction altText="Thử lại">Retry</ToastAction>,
            });
         } else {
            console.error("Login Error:", error);
            toast({
               variant: "destructive",
               title: "Login Error",
               description: "An error occurred. Please try again later.",
            });
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button className="glow2">Add Product</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={SubmitCreate}>
               <DialogHeader>
                  <DialogTitle>Create Product</DialogTitle>
                  <DialogDescription>
                     Make changes to your product here. Click save when you
                     &apos;re done.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-5 py-5">
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Name
                     </Label>

                     <Input
                        id="name"
                        placeholder="Enter Your Product Name"
                        className="col-span-3"
                        value={name}
                        onChange={(event) => setname(event.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Description
                     </Label>

                     <Textarea
                        id="description"
                        placeholder="Enter Your Description"
                        className="col-span-3"
                        value={description}
                        onChange={(event) => setdescription(event.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Display
                     </Label>

                     <Select onValueChange={(value) => setisprivate(value)}>
                        <SelectTrigger className="w-[277px]">
                           <SelectValue placeholder="Select Display Mode" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectItem value="false">Public</SelectItem>
                              <SelectItem value="true">Private</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Collection
                     </Label>
                     <Select onValueChange={(value) => setcollectionname(value)}>
                        <SelectTrigger className="w-[277px]">
                           <SelectValue placeholder="Select Collection" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              {collections.map((collection) => (
                                 <SelectItem
                                    key={collection.id}
                                    value={collection.name}
                                 >
                                    {collection.name}
                                 </SelectItem>
                              ))}
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Price
                     </Label>

                     <Input
                        id="name"
                        placeholder="Enter Price"
                        className="col-span-3"
                        type="number"
                        value={price}
                        onChange={(event) => setprice(event.target.value)}
                     />
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     className="glow3"
                     type="submit"
                     disabled={isSubmitting}
                  >
                      Save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
      // </form>
   );
};

export default Createproduct;
function setIsOpen(arg0: boolean) {
   throw new Error("Function not implemented.");
}
