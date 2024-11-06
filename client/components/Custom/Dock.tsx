"use client";
import Link from "next/link";
import {
   CalendarIcon,
   Home,
   HomeIcon,
   LogIn,
   LogOut,
   MailIcon,
   PencilIcon,
   User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "../Themes/mode-toggle";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
   calendar: (props: IconProps) => <CalendarIcon {...props} />,
   email: (props: IconProps) => <MailIcon {...props} />,
   linkedin: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M8 2V5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            d="M16 2V5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            d="M21 8.5V13.63C20.11 12.92 18.98 12.5 17.75 12.5C16.52 12.5 15.37 12.93 14.47 13.66C13.26 14.61 12.5 16.1 12.5 17.75C12.5 18.73 12.78 19.67 13.26 20.45C13.63 21.06 14.11 21.59 14.68 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            opacity="0.4"
            d="M7 11H13"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            opacity="0.4"
            d="M7 16H9.62"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            d="M23 17.75C23 18.73 22.72 19.67 22.24 20.45C21.96 20.93 21.61 21.35 21.2 21.69C20.28 22.51 19.08 23 17.75 23C16.6 23 15.54 22.63 14.68 22C14.11 21.59 13.63 21.06 13.26 20.45C12.78 19.67 12.5 18.73 12.5 17.75C12.5 16.1 13.26 14.61 14.47 13.66C15.37 12.93 16.52 12.5 17.75 12.5C18.98 12.5 20.11 12.92 21 13.63C22.22 14.59 23 16.08 23 17.75Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            opacity="0.4"
            d="M17.75 20.25C17.75 18.87 18.87 17.75 20.25 17.75C18.87 17.75 17.75 16.63 17.75 15.25C17.75 16.63 16.63 17.75 15.25 17.75C16.63 17.75 17.75 18.87 17.75 20.25Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
      </svg>
   ),
   x: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            opacity="0.4"
            d="M19.0992 20.2999C18.8992 20.2999 18.6992 20.2 18.5992 20.1C18.2992 19.8 18.2992 19.2999 18.5992 19C20.2992 17.3 21.1992 15 21.1992 12.5C21.1992 7.39995 17.0992 3.29995 11.9992 3.29995C6.89922 3.29995 2.79922 7.39995 2.79922 12.5C2.79922 14.9 3.69922 17.2 5.39922 19C5.69922 19.2999 5.69922 19.8 5.39922 20.1C5.09922 20.4 4.59922 20.4 4.29922 20.1C2.29922 18.1 1.19922 15.4 1.19922 12.6C1.19922 6.59995 6.09922 1.69995 11.9992 1.69995C17.8992 1.69995 22.7992 6.49995 22.7992 12.5C22.7992 15.3 21.6992 18 19.6992 20C19.4992 20.2 19.2992 20.2999 19.0992 20.2999Z"
            fill="#292D32"
         />
         <path
            d="M11.9996 22C14.1535 22 15.8996 20.2539 15.8996 18.1C15.8996 15.946 14.1535 14.2 11.9996 14.2C9.8457 14.2 8.09961 15.946 8.09961 18.1C8.09961 20.2539 9.8457 22 11.9996 22Z"
            fill="#292D32"
         />
         <path
            d="M16 8.5C14.9 8.5 14 9.4 14 10.5V11.3C14 12 14.6 12.5 15.2 12.5H16C17.1 12.5 18 11.6 18 10.5C18 9.4 17.1 8.5 16 8.5Z"
            fill="#292D32"
         />
      </svg>

      // 		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      // <path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      // <path opacity="0.4" d="M11.9999 10.9998C13.2867 10.9998 14.3299 9.95662 14.3299 8.6698C14.3299 7.38298 13.2867 6.33984 11.9999 6.33984C10.7131 6.33984 9.66992 7.38298 9.66992 8.6698C9.66992 9.95662 10.7131 10.9998 11.9999 10.9998Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      // <path opacity="0.4" d="M16 16.6599C16 14.8599 14.21 13.3999 12 13.3999C9.79 13.3999 8 14.8599 8 16.6599" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      // </svg>

      // <Button variant={"outline"}>Product</Button>
   ),
   youtube: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            opacity="0.4"
            d="M19.0992 20.2999C18.8992 20.2999 18.6992 20.2 18.5992 20.1C18.2992 19.8 18.2992 19.2999 18.5992 19C20.2992 17.3 21.1992 15 21.1992 12.5C21.1992 7.39995 17.0992 3.29995 11.9992 3.29995C6.89922 3.29995 2.79922 7.39995 2.79922 12.5C2.79922 14.9 3.69922 17.2 5.39922 19C5.69922 19.2999 5.69922 19.8 5.39922 20.1C5.09922 20.4 4.59922 20.4 4.29922 20.1C2.29922 18.1 1.19922 15.4 1.19922 12.6C1.19922 6.59995 6.09922 1.69995 11.9992 1.69995C17.8992 1.69995 22.7992 6.49995 22.7992 12.5C22.7992 15.3 21.6992 18 19.6992 20C19.4992 20.2 19.2992 20.2999 19.0992 20.2999Z"
            fill="#292D32"
         />
         <path
            d="M11.9996 22C14.1535 22 15.8996 20.2539 15.8996 18.1C15.8996 15.946 14.1535 14.2 11.9996 14.2C9.8457 14.2 8.09961 15.946 8.09961 18.1C8.09961 20.2539 9.8457 22 11.9996 22Z"
            fill="#292D32"
         />
         <path
            d="M16 8.5C14.9 8.5 14 9.4 14 10.5V11.3C14 12 14.6 12.5 15.2 12.5H16C17.1 12.5 18 11.6 18 10.5C18 9.4 17.1 8.5 16 8.5Z"
            fill="#292D32"
         />
      </svg>
   ),
   auth: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            opacity="0.4"
            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <g opacity="0.45">
            <path
               d="M19.1409 2.59015L15.5109 6.22015C15.3709 6.36015 15.2309 6.63015 15.2109 6.83015L15.0109 8.22015C14.9409 8.72015 15.2909 9.07015 15.7909 9.00015L17.1809 8.80015C17.3709 8.77015 17.6509 8.64015 17.7909 8.50015L21.4209 4.87015C22.0509 4.24015 22.3409 3.52015 21.4209 2.60015C20.4909 1.66015 19.7709 1.96015 19.1409 2.59015Z"
               stroke="#292D32"
               stroke-width="1.5"
               stroke-miterlimit="10"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M18.6191 3.10986C18.9291 4.20986 19.7891 5.06986 20.8891 5.37986"
               stroke="#292D32"
               stroke-width="1.5"
               stroke-miterlimit="10"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </g>
         <path
            opacity="0.4"
            d="M2.66992 18.9501L7.59992 15.6401C8.38992 15.1101 9.52992 15.1701 10.2399 15.7801L10.5699 16.0701C11.3499 16.7401 12.6099 16.7401 13.3899 16.0701L17.5499 12.5001C18.3299 11.8301 19.5899 11.8301 20.3699 12.5001L21.9999 13.9001"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
      </svg>
   ),
   cart: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            opacity="0.4"
            d="M12 19C14.2091 19 16 17.2091 16 15C16 12.7909 14.2091 11 12 11C9.79086 11 8 12.7909 8 15C8 17.2091 9.79086 19 12 19Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            opacity="0.4"
            d="M10.4395 15L11.0895 15.65C11.2795 15.84 11.5895 15.85 11.7795 15.66L13.5595 14.02"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            d="M9.0008 22H15.0008C19.0208 22 19.7408 20.39 19.9508 18.43L20.7008 12.43C20.9708 9.99 20.2708 8 16.0008 8H8.0008C3.7308 8 3.0308 9.99 3.3008 12.43L4.0508 18.43C4.2608 20.39 4.9808 22 9.0008 22Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <path
            opacity="0.4"
            d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
      </svg>
   ),
   product: (props: IconProps) => (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g opacity="0.4">
            <path
               d="M3.16992 7.43994L11.9999 12.5499L20.7699 7.46991"
               stroke="#292D32"
               stroke-width="1.5"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M12 21.61V12.54"
               stroke="#292D32"
               stroke-width="1.5"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M9.9306 2.48L4.59061 5.45003C3.38061 6.12003 2.39062 7.80001 2.39062 9.18001V14.83C2.39062 16.21 3.38061 17.89 4.59061 18.56L9.9306 21.53C11.0706 22.16 12.9406 22.16 14.0806 21.53L19.4206 18.56C20.6306 17.89 21.6206 16.21 21.6206 14.83V9.18001C21.6206 7.80001 20.6306 6.12003 19.4206 5.45003L14.0806 2.48C12.9306 1.84 11.0706 1.84 9.9306 2.48Z"
               stroke="#292D32"
               stroke-width="1.5"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </g>
         <path
            d="M16.9998 13.2401V9.58014L7.50977 4.1001"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
      </svg>
   ),
};

const DATA = {
   navbar: [
      { href: "/", icon: Home, label: "Home" },
      { href: "/profile", icon: User, label: "Profile" },
   ],
   contact: {
      social: {
         auth: {
            name: "auth",
            url: "/Auth",
            icon: Icons.auth,
         },
         LinkedIn: {
            name: "LinkedIn",
            url: "#",
            icon: Icons.linkedin,
         },
         X: {
            name: "X",
            url: "/Auth",
            icon: Icons.x,
         },
         product: {
            name: "Product",
            url: "/products",
            icon: Icons.product,
         },
         cart: {
            name: "cart",
            url: "/cart",
            icon: Icons.cart,
         },
         collection: {
            name: "collection",
            url: "/collection",
            icon: Icons.cart,
         },
      },
   },
};
const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;
export function DockDemo() {
   const router = useRouter();
   const handleLogout = async () => {
      try {
         await axios.post(`${SERVER_PORT}Auth/Logout`, {
            withCredentials: true,
         });
         Cookies.remove("access_token");
         Cookies.remove("refresh_token");
         router.push("/auth"); // Redirect to login page
      } catch (error) {
         console.error("Logout Error:", error);
         // Consider adding a toast notification for error feedback
      }
   };

   return (
      <TooltipProvider>
         {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
               Dock
            </span> */}
         <Dock direction="middle" className="shadow sticky fixed-element">
            {DATA.navbar.map((item) => (
               <DockIcon key={item.href}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Link
                           href={item.href}
                           className={cn(
                              buttonVariants({
                                 variant: "ghost",
                                 size: "icon",
                              }),
                              "size-12 rounded-full"
                           )}
                        >
                           <item.icon className="size-4" />
                        </Link>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{item.label}</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full" />
            {Object.entries(DATA.contact.social).map(([name, social]) => (
               <DockIcon key={name}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Link
                           href={social.url}
                           className={cn(
                              buttonVariants({
                                 variant: "ghost",
                                 size: "icon",
                              }),
                              "size-12 rounded-full"
                           )}
                        >
                           <social.icon className="size-4" />
                        </Link>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{name}</p>
                     </TooltipContent>
                  </Tooltip>
               </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full" />
            <DockIcon>
               <Tooltip>
                  <TooltipTrigger asChild>
                  <LogOut className="size-4" onClick={handleLogout}/>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Logout</p>
                  </TooltipContent>
               </Tooltip>
               
            </DockIcon>
         </Dock>
      </TooltipProvider>
   );
}
