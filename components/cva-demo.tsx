"use client"

import type React from "react"

import { useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
)

type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: React.ReactNode
}

function DemoButton({ intent, size, children }: ButtonProps) {
  return <button className={buttonStyles({ intent, size })}>{children}</button>
}

export function CVADemo() {
  const [intent, setIntent] = useState<"primary" | "secondary" | "danger">("primary")
  const [size, setSize] = useState<"sm" | "md" | "lg">("md")

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Code */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-4 text-sm">Button Variant Definition</h4>
          <pre className="text-xs font-mono overflow-x-auto mb-6">
            <code>{`const buttonStyles = cva(
  "inline-flex items-center...",
  {
    variants: {
      intent: {
        primary: "bg-blue-600...",
        secondary: "bg-gray-200...",
        danger: "bg-red-600...",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
  }
)`}</code>
          </pre>

          <h4 className="font-semibold mb-4 text-sm">Usage in React</h4>
          <pre className="text-xs font-mono overflow-x-auto">
            <code>{`<Button 
  intent="${intent}" 
  size="${size}"
>
  Click me
</Button>`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-4">Live Preview</h4>

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="intent" className="text-sm mb-2 block">
                Intent
              </Label>
              <Select value={intent} onValueChange={(v: any) => setIntent(v)}>
                <SelectTrigger id="intent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="danger">Danger</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size" className="text-sm mb-2 block">
                Size
              </Label>
              <Select value={size} onValueChange={(v: any) => setSize(v)}>
                <SelectTrigger id="size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border border-border rounded-lg p-8 bg-background flex items-center justify-center">
            <DemoButton intent={intent} size={size}>
              Click me
            </DemoButton>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
