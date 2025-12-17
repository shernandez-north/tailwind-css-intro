"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function GroupHoverDemo() {
  return (
    <Card className="group cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">Hover this card</h4>
            <p className="text-sm text-muted-foreground">Watch the title and arrow change together</p>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
        </div>
      </CardContent>
    </Card>
  )
}
