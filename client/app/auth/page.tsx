import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/styles/style.css";
import Login from "@/app/auth/Login";
import Register from "@/app/auth/Register";
import { DockDemo } from "@/components/Custom/Dock";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";

const Auth: React.FC = () => {
   return (
      <div className="flex justify-center items-center min-h-screen">
         <DockDemo />
         {/* <Tabs defaultValue="login" className="w-[400px] mt-20"> */}
         <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="login">Login</TabsTrigger>
               <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <Login />
            <Register />
         </Tabs>
         {/* <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      /> */}
      </div>
   );
};

export default Auth;
