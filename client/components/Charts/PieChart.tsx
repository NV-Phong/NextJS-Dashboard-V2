"use client";

import * as React from "react";
import { TrendingUp, Copy } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";

const chartData = [
   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
   { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
   visitors: {
      label: "Visitors",
   },
   chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
   },
   safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
   },
   firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
   },
   edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
   },
   other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
   },
} satisfies ChartConfig;

export function PieCharts() {
   const [isCodeVisible, setIsCodeVisible] = React.useState(false);
   const [isCopied, setIsCopied] = React.useState(false);

   const totalVisitors = React.useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
   }, []);

   const fullCodeString = `
"use client"

import * as React from "react"
import { TrendingUp, Copy } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig
 export function PieCharts() {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, []) 
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCodeVisible(true)}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Show chart data and configuration</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>

      <Dialog open={isCodeVisible} onOpenChange={setIsCodeVisible}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>PieChart</DialogTitle>
            <DialogDescription>
              Copy the entire component code below to use in your project.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <pre className="max-h-[400px] overflow-y-auto rounded-md bg-slate-950 p-4">
              <code className="text-sm text-slate-50">{fullCodeString}</code>
            </pre>
            <Button
              className="absolute right-4 top-4 glow1 mr-3"
              size="sm"
              onClick={handleCopyCode}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}`;

   const handleCopyCode = () => {
      navigator.clipboard.writeText(fullCodeString).then(() => {
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      });
   };

   return (
      <Card className="flex flex-col">
         <CardHeader className="flex flex-row items-center justify-between pb-0">
            <div>
               <CardTitle>Pie Chart - Donut with Text</CardTitle>
               <CardDescription>January - June 2024</CardDescription>
            </div>
            <Button
               variant="outline"
               size="icon"
               onClick={() => setIsCodeVisible(true)}
            >
               <Copy className="h-4 w-4" />
               <span className="sr-only">
                  Show chart data and configuration
               </span>
            </Button>
         </CardHeader>
         <CardContent className="flex-1 pb-0">
            <ChartContainer
               config={chartConfig}
               className="mx-auto aspect-square max-h-[250px]"
            >
               <PieChart>
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                     data={chartData}
                     dataKey="visitors"
                     nameKey="browser"
                     innerRadius={60}
                     strokeWidth={5}
                  >
                     <Label
                        content={({ viewBox }) => {
                           if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                 <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                 >
                                    <tspan
                                       x={viewBox.cx}
                                       y={viewBox.cy}
                                       className="fill-foreground text-3xl font-bold"
                                    >
                                       {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                       x={viewBox.cx}
                                       y={(viewBox.cy || 0) + 24}
                                       className="fill-muted-foreground"
                                    >
                                       Visitors
                                    </tspan>
                                 </text>
                              );
                           }
                        }}
                     />
                  </Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
               Showing total visitors for the last 6 months
            </div>
         </CardFooter>

         <Dialog open={isCodeVisible} onOpenChange={setIsCodeVisible}>
            <DialogContent className="sm:max-w-[1000px]">
               <DialogHeader>
                  <DialogTitle>PieChart</DialogTitle>
                  <DialogDescription>
                     Copy the entire component code below to use in your
                     project.
                  </DialogDescription>
               </DialogHeader>
               <div className="relative">
                  <pre className="max-h-[400px] overflow-y-auto rounded-md bg-slate-950 p-4">
                     <code className="text-sm text-slate-50">
                        {fullCodeString}
                     </code>
                  </pre>
                  <Button
                     className="absolute right-4 top-4 glow1 mr-3"
                     size="sm"
                     onClick={handleCopyCode}
                  >
                     {isCopied ? "Copied!" : "Copy"}
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </Card>
   );
}
