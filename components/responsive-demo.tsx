"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Tablet, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

export function ResponsiveDemo() {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const widths = {
    desktop: "w-full",
    tablet: "w-[640px]",
    mobile: "w-[375px]",
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          size="sm"
          variant={viewport === "desktop" ? "default" : "outline"}
          onClick={() => setViewport("desktop")}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </Button>
        <Button size="sm" variant={viewport === "tablet" ? "default" : "outline"} onClick={() => setViewport("tablet")}>
          <Tablet className="h-4 w-4 mr-2" />
          Tablet
        </Button>
        <Button size="sm" variant={viewport === "mobile" ? "default" : "outline"} onClick={() => setViewport("mobile")}>
          <Smartphone className="h-4 w-4 mr-2" />
          Mobile
        </Button>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <div className={cn("transition-all duration-300 @container", widths[viewport])}>
          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-4 border border-border rounded-lg p-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="h-20 flex items-center justify-center bg-primary/10 rounded text-primary font-semibold">
                    Item {i}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
