"use client";

import * as React from "react";
import {
   AudioWaveform,
   BadgeCheck,
   Bell,
   BookOpen,
   Bot,
   ChevronRight,
   ChevronsUpDown,
   Command,
   CreditCard,
   Folder,
   Forward,
   Frame,
   GalleryVerticalEnd,
   LogOut,
   Map,
   MoreHorizontal,
   PieChart,
   Plus,
   Settings2,
   Sparkles,
   SquareTerminal,
   Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarInset,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarProvider,
   SidebarRail,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { DockDemo } from "@/components/Custom/Dock";
import { Button } from "@/components/ui/button";
import { NextStep } from "@/components/Custom/NextStep";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CodeUploadPage from "@/app/upload/page";
import CodePreviewComponent from "@/app/editor/page";
const data = {
   user: {
      name: "NV-Phong",
      email: "nvphong@gmail.com",
      avatar: "/The Girl [ 3 ].jpg",
   },
   teams: [
      {
         name: "UI Engineer",
         logo: GalleryVerticalEnd,
         plan: "UI / UX",
      },
      {
         name: "HealthCare",
         logo: AudioWaveform,
         plan: "UI / UX",
      },
      {
         name: "Task Manager",
         logo: Command,
         plan: "UI / UX",
      },
   ],
   navMain: [
      {
         title: "Component",
         url: "#",
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: "Button",
               url: "#",
            },
            {
               title: "Chart",
               url: "charts",
            },
            {
               title: "Dock",
               url: "#",
            },
            {
               title: "Tab",
               url: "#",
            },
         ],
      },

      {
         title: "UI Kit",
         url: "#",
         icon: Bot,
         items: [
            {
               title: "Genesis",
               url: "#",
            },
            {
               title: "Explorer",
               url: "#",
            },
            {
               title: "Quantum",
               url: "#",
            },
         ],
      },
      
      // {
      //    title: "Documentation",
      //    url: "#",
      //    icon: BookOpen,
      //    items: [
      //       {
      //          title: "Introduction",
      //          url: "#",
      //       },
      //       {
      //          title: "Get Started",
      //          url: "#",
      //       },
      //       {
      //          title: "Tutorials",
      //          url: "#",
      //       },
      //       {
      //          title: "Changelog",
      //          url: "#",
      //       },
      //    ],
      // },
      {
         title: "Settings",
         url: "#",
         icon: Settings2,
         items: [
            {
               title: "General",
               url: "#",
            },
            {
               title: "Team",
               url: "#",
            },
            {
               title: "Billing",
               url: "#",
            },
            {
               title: "Limits",
               url: "#",
            },
         ],
      },
   ],
   projects: [
      {
         name: "React Code Preview",
         url: "#",
         icon: Frame,
      },
      // {
      //    name: "Sales & Marketing",
      //    url: "#",
      //    icon: PieChart,
      // },
      // {
      //    name: "Travel",
      //    url: "#",
      //    icon: Map,
      // },
   ],
};
const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;
export default function UILibrary() {
   const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
   const router = useRouter();
   const handleLogout = async () => {
      try {
         Cookies.remove("access_token");
         Cookies.remove("refresh_token");
         router.push("/auth"); 
      } catch (error) {
         console.error("Logout Error:", error);
      }
   };

   return (
      <SidebarProvider>
         <Sidebar collapsible="icon">
            <SidebarHeader>
               <SidebarMenu>
                  <SidebarMenuItem>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuButton
                              size="lg"
                              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                           >
                              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                 <activeTeam.logo className="size-4" />
                              </div>
                              <div className="grid flex-1 text-left text-sm leading-tight">
                                 <span className="truncate font-semibold">
                                    {activeTeam.name}
                                 </span>
                                 <span className="truncate text-xs">
                                    {activeTeam.plan}
                                 </span>
                              </div>
                              <ChevronsUpDown className="ml-auto" />
                           </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                           align="start"
                           side="bottom"
                           sideOffset={4}
                        >
                           <DropdownMenuLabel className="text-xs text-muted-foreground">
                              Teams
                           </DropdownMenuLabel>
                           {data.teams.map((team, index) => (
                              <DropdownMenuItem
                                 key={team.name}
                                 onClick={() => setActiveTeam(team)}
                                 className="gap-2 p-2"
                              >
                                 <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <team.logo className="size-4 shrink-0" />
                                 </div>
                                 {team.name}
                                 <DropdownMenuShortcut>
                                    ⌘{index + 1}
                                 </DropdownMenuShortcut>
                              </DropdownMenuItem>
                           ))}
                           <DropdownMenuSeparator />
                           <DropdownMenuItem className="gap-2 p-2">
                              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                 <Plus className="size-4" />
                              </div>
                              <div className="font-medium text-muted-foreground">
                                 Add team
                              </div>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </SidebarMenuItem>
               </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
               <SidebarGroup>
                  <SidebarGroupLabel>Element</SidebarGroupLabel>
                  <SidebarMenu>
                     {data.navMain.map((item) => (
                        <Collapsible
                           key={item.title}
                           asChild
                           defaultOpen={item.isActive}
                           className="group/collapsible"
                        >
                           <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                 <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                 </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                 <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                       <SidebarMenuSubItem key={subItem.title}>
                                          <SidebarMenuSubButton asChild>
                                             <a href={subItem.url}>
                                                <span>{subItem.title}</span>
                                             </a>
                                          </SidebarMenuSubButton>
                                       </SidebarMenuSubItem>
                                    ))}
                                 </SidebarMenuSub>
                              </CollapsibleContent>
                           </SidebarMenuItem>
                        </Collapsible>
                     ))}
                  </SidebarMenu>
               </SidebarGroup>
               <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarMenu>
                     {data.projects.map((item) => (
                        <SidebarMenuItem key={item.name}>
                           <SidebarMenuButton asChild>
                              <a href={item.url}>
                                 <item.icon />
                                 <span>{item.name}</span>
                              </a>
                           </SidebarMenuButton>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                 </SidebarMenuAction>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                 className="w-48 rounded-lg"
                                 side="bottom"
                                 align="end"
                              >
                                 <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <span>View Project</span>
                                 </DropdownMenuItem>
                                 <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <span>Share Project</span>
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete Project</span>
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </SidebarMenuItem>
                     ))}
                     <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                           <MoreHorizontal className="text-sidebar-foreground/70" />
                           <span>More</span>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
               <SidebarMenu>
                  <SidebarMenuItem>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <SidebarMenuButton
                              size="lg"
                              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                           >
                              <Avatar className="h-8 w-8 rounded-lg">
                                 <AvatarImage
                                    src={data.user.avatar}
                                    alt={data.user.name}
                                 />
                                 <AvatarFallback className="rounded-lg">
                                    CN
                                 </AvatarFallback>
                              </Avatar>
                              <div className="grid flex-1 text-left text-sm leading-tight">
                                 <span className="truncate font-semibold">
                                    {data.user.name}
                                 </span>
                                 <span className="truncate text-xs">
                                    {data.user.email}
                                 </span>
                              </div>
                              <ChevronsUpDown className="ml-auto size-4" />
                           </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                           side="bottom"
                           align="end"
                           sideOffset={4}
                        >
                           <DropdownMenuLabel className="p-0 font-normal">
                              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                 <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                       src={data.user.avatar}
                                       alt={data.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                       CN
                                    </AvatarFallback>
                                 </Avatar>
                                 <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                       {data.user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                       {data.user.email}
                                    </span>
                                 </div>
                              </div>
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem>
                                 <Sparkles size={16} className="mr-3" />
                                 Upgrade to Pro
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem>
                                 <BadgeCheck size={16} className="mr-3" />
                                 Account
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <CreditCard size={16} className="mr-3" />
                                 Billing
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <Bell size={16} className="mr-3" />
                                 Notifications
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={handleLogout}>
                              <LogOut size={16} className="mr-3"  />
                              Log out
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </SidebarMenuItem>
               </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
         </Sidebar>
         <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
               <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                           <BreadcrumbLink href="#">Component</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                           <BreadcrumbPage>Chart</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
               <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                  {/* <NextStep/> */}

                  {/* <Button className="m-3 glow1">Button 1</Button>
                  <Button className="m-3 glow2">Button 2</Button>
                  <Button className="m-3 glow3">Button 3</Button>
               <CodeUploadPage/> */}
               <CodePreviewComponent></CodePreviewComponent>
					</div>
            </div>
         </SidebarInset>
      </SidebarProvider>
   );
}
