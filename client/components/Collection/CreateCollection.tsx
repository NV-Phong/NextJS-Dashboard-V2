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

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;
interface CollectionData {
   name: string;
   create_or_save: boolean;
}

const CreateCollection: React.FC = () => {
   const [name, setname] = useState("");
   const [create_or_save, setcreate_or_save] = useState("");
	const [isOpen, setIsOpen] = useState(false);

   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   const SubmitCreate = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      const data = {
         name,
         create_or_save:true,
      };

      try {
         const token = Cookies.get("token");
         console.log("Token:", token);
         const response = await axios.post(`${SERVER_PORT}Collection`, data, {
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
            <Button className="glow1">Create Collection</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={SubmitCreate}>
               <DialogHeader>
                  <DialogTitle>Create Collection</DialogTitle>
                  <DialogDescription>
                     Make changes to your collection here. Click save when you
                     &apos;re done.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-left">
                        Name
                     </Label>

                     <Input
                        id="name"
                        placeholder="Enter Your Collection Name"
                        className="col-span-3"
                        value={name}
                        onChange={(event) => setname(event.target.value)}
                     />
                  </div>
               </div>
               <DialogFooter>
                  <Button
                     className="glow3"
                     type="submit"
                     disabled={isSubmitting}
                  >
                     Create
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
      // </form>
   );
};

export default CreateCollection;
function setIsOpen(arg0: boolean) {
	throw new Error("Function not implemented.");
}

