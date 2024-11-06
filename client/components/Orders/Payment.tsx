import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
 import { Button } from "@/components/ui/button"
 import { useRouter } from "next/navigation";
 import Cookies from "js-cookie";
import axios from "axios";

const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;

 export function Payment() {
  const router = useRouter();
  const handlePayment = async () => {
    try {
       router.push("/dashboard/payment");
    } catch (error) {
       console.error(error);
    }
 };
   return (
     <AlertDialog>
       <AlertDialogTrigger asChild>
         <Button className="glow1">Payment</Button>
       </AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
           <AlertDialogDescription>
             This action cannot be undone. Make sure you have provided complete and correct payment information.
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction onClick={handlePayment}>Continue</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   )
 }
 