"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, X, Copy, ChevronDown, ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { CVADemo } from "@/components/cva-demo"
import { GroupHoverDemo } from "@/components/group-hover-demo"
import { ResponsiveDemo } from "@/components/responsive-demo"

const sections = [
  { id: "hero", label: "Introduction" },
  { id: "what-this-is", label: "What this is / isn't" },
  { id: "why-tailwind", label: "Why Tailwind" },
  { id: "mental-model", label: "Tailwind v4 mental model" },
  { id: "core-basics", label: "Core basics" },
  { id: "reading-code", label: "Reading Tailwind code" },
  { id: "cool-features", label: "Cool features" },
  { id: "cva", label: "Conditional styling with CVA" },
  { id: "reuse-patterns", label: "Reuse patterns" },
  { id: "backend-perspective", label: "Small tweaks" },
  { id: "resources", label: "Resources" },
]

export default function TailwindTechTalk() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const copyResources = () => {
    const resources = `Tailwind CSS v4 Documentation: https://tailwindcss.com/docs
Tailwind Variants Documentation: https://tailwindcss.com/docs/hover-focus-and-other-states
CVA (Class Variance Authority): https://cva.style
Internal Confluence: https://confluence.internal/tailwind-guide`
    navigator.clipboard.writeText(resources)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-sidebar p-6 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-sidebar-foreground">Using Tailwind CSS v4</h2>
          <p className="text-sm text-sidebar-foreground/60 mt-1">Practical patterns</p>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <nav className="space-y-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                  activeSection === id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">
          {/* Hero Section */}
          <motion.section
            id="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-[80vh] flex flex-col justify-center"
          >
            <Badge className="mb-4 w-fit bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
              North Tech Talk
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              Using Tailwind CSS Effectively
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Practical patterns for a long-lived React codebase
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToSection("cool-features")} className="group">
                Jump to examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("resources")}>
                Open Resources
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.section>

          {/* What this is / isn't */}
          <Section id="what-this-is" title="What this is / isn't">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-500/20 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg">This is</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>A practical guide to using Tailwind effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Patterns for component composition and reuse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Tips for reading and writing maintainable code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>Showcase some cool features and available tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="h-5 w-5 text-red-600" />
                    <h3 className="font-semibold text-lg">This isn't</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>A debate about CSS methodologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>Setup or configuration instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>A complete reference (see docs for that)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Why Tailwind */}
          <Section id="why-tailwind" title="Why Tailwind">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Consistency by default</h3>
                      <p className="text-sm text-muted-foreground">
                        Design tokens enforce spacing, colors, and sizing scales across your entire app
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Local reasoning</h3>
                      <p className="text-sm text-muted-foreground">
                        Styles live at the point of use—no hunting through SCSS files or cascade surprises
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">DX over time</h3>
                      <p className="text-sm text-muted-foreground">
                        Less drift, easier refactoring, and better onboarding as the codebase grows
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Quick example</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-sm">Traditional CSS</h4>
                    <pre className="text-xs font-mono overflow-x-auto">
                      <code className="text-foreground">
                        {`/* styles.css */
.alert-box {
  padding: 16px;
  border-radius: 8px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

/* Component.jsx */
<div className="alert-box">
  Error message
</div>`}
                      </code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-sm">Tailwind CSS</h4>
                    <pre className="text-xs font-mono overflow-x-auto">
                      <code className="text-foreground">
                        {`/* No separate CSS file needed */



/* Component.jsx */
<div className="`}
                        <span className="text-blue-600">{`p-4`}</span>
                        {` `}
                        <span className="text-orange-600">{`rounded-lg`}</span>
                        {` 
  `}
                        <span className="text-green-600">{`bg-red-50`}</span>
                        {` `}
                        <span className="text-purple-600">{`border border-red-200`}</span>
                        {` 
  `}
                        <span className="text-pink-600">{`text-red-800`}</span>
                        {`">
  Error message
</div>`}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Mental Model */}
          <Section id="mental-model" title="Tailwind v4 mental model">
            <div className="space-y-6">
              <p className="text-muted-foreground text-balance">
                Tailwind is about <strong>composing primitives</strong>, <strong>selecting from tokens</strong>, and{" "}
                <strong>avoiding cascade reasoning</strong>. You build UI by combining single-purpose utilities rather
                than writing custom CSS classes.
              </p>

              <Card className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex-1 text-center">
                      <div className="text-3xl mb-2">🎨</div>
                      <div className="font-semibold mb-1">Design Tokens</div>
                      <div className="text-xs text-muted-foreground">Spacing, colors, sizes</div>
                    </div>
                    <ChevronDown className="h-6 w-6 text-muted-foreground rotate-[-90deg]" />
                    <div className="flex-1 text-center">
                      <div className="text-3xl mb-2">⚙️</div>
                      <div className="font-semibold mb-1">Utility Classes</div>
                      <div className="text-xs text-muted-foreground">p-4, text-lg, rounded</div>
                    </div>
                    <ChevronDown className="h-6 w-6 text-muted-foreground rotate-[-90deg]" />
                    <div className="flex-1 text-center">
                      <div className="text-3xl mb-2">⚛️</div>
                      <div className="font-semibold mb-1">Atomic Design</div>
                      <div className="text-xs text-muted-foreground">Composed components over abstraction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

                  {/* Core Basics */}
          <Section id="core-basics" title="Core basics">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { category: "Layout", examples: "flex, grid, block" },
                { category: "Spacing", examples: "p-4, mx-2, gap-4" },
                { category: "Sizing", examples: "w-full, h-screen" },
                { category: "Typography", examples: "text-lg, font-bold" },
                { category: "Borders", examples: "border, rounded-lg" },
                { category: "Colors", examples: "bg-primary, text-white" },
              ].map((item) => (
                <Card key={item.category} className="hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">{item.category}</h4>
                    <p className="text-xs font-mono text-muted-foreground">{item.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-semibold">How classes are defined</h3>
              <p className="text-muted-foreground text-balance">
                Most utility classes are <strong>pre-defined by Tailwind</strong> with sensible defaults. In Tailwind
                v4, you can customize them using the <code className="text-primary">@theme</code> directive in your CSS.
              </p>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code className="text-foreground">
                      {`/* app/globals.css */
`}
                      <span className="text-blue-600">{`@theme`}</span>
                      {` {
  `}
                      <span className="text-green-600">{`/* Override spacing scale */`}</span>
                      {`
  `}
                      <span className="text-purple-600">{`--spacing-xs`}</span>
                      {`: `}
                      <span className="text-orange-600">{`0.5rem`}</span>
                      {`;
  `}
                      <span className="text-purple-600">{`--spacing-sm`}</span>
                      {`: `}
                      <span className="text-orange-600">{`0.75rem`}</span>
                      {`;
  `}
                      <span className="text-purple-600">{`--spacing-md`}</span>
                      {`: `}
                      <span className="text-orange-600">{`1rem`}</span>
                      {`;
  
  `}
                      <span className="text-green-600">{`/* Override colors */`}</span>
                      {`
  `}
                      <span className="text-purple-600">{`--color-primary`}</span>
                      {`: `}
                      <span className="text-orange-600">{`#3b82f6`}</span>
                      {`;
  `}
                      <span className="text-purple-600">{`--color-secondary`}</span>
                      {`: `}
                      <span className="text-orange-600">{`#10b981`}</span>
                      {`;
  
  `}
                      <span className="text-green-600">{`/* Add custom breakpoints */`}</span>
                      {`
  `}
                      <span className="text-purple-600">{`--breakpoint-xs`}</span>
                      {`: `}
                      <span className="text-orange-600">{`20rem`}</span>
                      {`;
  `}
                      <span className="text-purple-600">{`--breakpoint-xl`}</span>
                      {`: `}
                      <span className="text-orange-600">{`80rem`}</span>
                      {`;
}`}
                    </code>
                  </pre>
                </CardContent>
              </Card>

            </div>
          </Section>

          {/* Reading Tailwind Code */}
          <Section id="reading-code" title="Reading Tailwind code">
            <div className="space-y-4">
              <p className="text-muted-foreground text-balance">
                A recommended ordering makes Tailwind classes easier to scan:
              </p>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code className="text-foreground">
                      {`<button className="`}
                      <span className="text-purple-600">{`flex items-center gap-2`}</span>
                      {` `}
                      <span className="text-blue-600">{`px-4 py-2`}</span>
                      {` `}
                      <span className="text-green-600">{`text-sm font-semibold`}</span>
                      {` `}
                      <span className="text-orange-600">{`bg-primary text-primary-foreground rounded-lg`}</span>
                      {` `}
                      <span className="text-pink-600">{`hover:bg-primary/90 disabled:opacity-50`}</span>
                      {`">`}
                    </code>
                  </pre>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-purple-600" />
                      <span className="text-muted-foreground">Layout (flex, grid, items-center)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-blue-600" />
                      <span className="text-muted-foreground">Spacing (p-4, mx-2, gap-4)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-green-600" />
                      <span className="text-muted-foreground">Typography (text-lg, font-bold)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-orange-600" />
                      <span className="text-muted-foreground">Color & Effects (bg-primary, rounded)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-pink-600" />
                      <span className="text-muted-foreground">State & Responsive (hover:, md:, dark:)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-muted-foreground text-balance">
                <b>Tip:</b> Use a sorting plugin that establishes a consistent order.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
               
                <a
                  href="https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-sm">Tailwind's recommended class sorting</h4>
                    <p className="text-xs text-muted-foreground">Official sorting methodology</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>

                <a
                  href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-sm">Prettier Plugin TailwindCSS</h4>
                    <p className="text-xs text-muted-foreground">Automatic class sorting</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              </div>
            </div>
          </Section>

          {/* Cool Features */}
          <Section id="cool-features" title="Cool features">
            <div className="space-y-8">
              {/* Responsive */}
              <FeatureCard title="Responsive variants" description="Mobile-first breakpoints">
                <Tabs defaultValue="code">
                  <TabsList className="mb-4">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <Card className="bg-muted/50">
                      <CardContent className="pt-6">
                        <pre className="text-sm font-mono overflow-x-auto">
                          <code className="text-foreground">
                            {`<div className="`}
                            <span className="text-purple-600">{`grid grid-cols-1`}</span>
                            {` `}
                            <span className="text-blue-600 font-black">{`@md:grid-cols-2 @lg:grid-cols-4 gap-4`}</span>
                            {`">`}
                            {`
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</div>`}
                          </code>
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="preview">
                    <ResponsiveDemo />
                  </TabsContent>
                </Tabs>
              </FeatureCard>

              {/* State Variants */}
              <FeatureCard title="State variants" description="Hover, focus, active states">
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <pre className="text-sm font-mono overflow-x-auto mb-4">
                      <code className="text-foreground">
                        {`<button className="`}
                        <span className="text-green-600">{`bg-primary`}</span>
                        {` `}
                        <span className="text-blue-600 font-black">{`hover:bg-primary/90 hover:text-black hover:cursor-pointer hover:px-8`}</span>
                        {`
  `}
                        <span className="text-pink-600 font-black">{`disabled:opacity-50 disabled:cursor-not-allowed`}</span>
                        {`">`}
                      </code>
                    </pre>
                    <div className="flex flex-wrap gap-4">
                      <Button className="hover:text-black hover:cursor-pointer hover:px-8">Hover me</Button>
                      <Button disabled>Disabled</Button>
                    </div>
                  </CardContent>
                </Card>
              </FeatureCard>

              {/* Group/Peer */}
              <FeatureCard title="group/peer patterns" description="Parent-child relationships">
                <Tabs defaultValue="code">
                  <TabsList className="mb-4">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <Card className="bg-muted/50">
                      <CardContent className="pt-6">
                        <pre className="text-sm font-mono overflow-x-auto">
                          <code className="text-foreground">
                            {`<div className="`}
                            <span className="text-purple-600">{`group`}</span>
                            {`">
  <h3 className="`}
                            <span className="text-blue-600 font-black">{`group-hover:text-primary`}</span>
                            {`">Hover the card</h3>
  <ArrowRight className="`}
                            <span className="text-green-600 font-black">{`group-hover:translate-x-2`}</span>
                            {`" />
</div>`}
                          </code>
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="preview">
                    <GroupHoverDemo />
                  </TabsContent>
                </Tabs>
              </FeatureCard>

              {/* Arbitrary Values */}
              <FeatureCard
                title="Arbitrary values (escape hatch)"
                description="Use with discipline"
                badge="Use Sparingly"
              >
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code className="text-foreground">
                        {`<div className="`}
                        <span className="text-red-600 font-black">{`w-[372px] bg-[#1da1f2] top-[117px]`}</span>
                        {`">
  {/* When you need an exact value not in the scale */}
</div>`}
                      </code>
                    </pre>
                    <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-sm text-amber-600 dark:text-amber-500">
                        ⚠️ Prefer design tokens when possible. Arbitrary values opt out of the design system.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FeatureCard>
            </div>
          </Section>

          {/* CVA Section */}
          <Section id="cva" title="Conditional styling with CVA">
            <div className="space-y-6">
              <p className="text-muted-foreground text-balance">
                <strong>Class Variance Authority (CVA)</strong> provides a type-safe API for managing component
                variants. It centralizes styling logic and makes variant combinations explicit.
              </p>

              <CVADemo />

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Centralized styling logic per component</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>TypeScript autocomplete for variant options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Clear, declarative styling API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Compound variants for complex combinations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Reuse Patterns */}
          <Section id="reuse-patterns" title="Reuse patterns">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-green-500/20 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Do</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>React components</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Create reusable components with props</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>CVA for variants</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Type-safe styling with clear APIs</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <div>
                        <strong>Composition</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Build complex UIs from simple pieces</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-500/20 bg-amber-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <X className="h-5 w-5 text-amber-600" />
                    <h3 className="font-semibold text-lg">Avoid</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <div>
                        <strong>Overusing @apply</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Defeats local reasoning benefits</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <div>
                        <strong>Creating utility CSS files</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Use components instead</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">!</span>
                      <div>
                        <strong>Mixing methodologies</strong>
                        <p className="text-muted-foreground text-xs mt-0.5">Pick Tailwind or traditional CSS</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">ESLint + Tailwind: Enforcing consistency</h3>
                  <p className="text-muted-foreground text-md mb-4">
                  A powerful system for maintaining design system constraints and enforcing best practices across your team.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>Catch arbitrary values</strong> — Warn when developers use arbitrary
                          values like{" "}
                          <code className="text-xs bg-muted px-1 py-0.5 rounded">w-[372px]</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>Enforce class ordering</strong> — Automatic sorting keeps code scannable and reduces
                          diff noise in PRs
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>Prevent deprecated utilities</strong> — Get warnings when using outdated or forbidden classes or
                          patterns
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 text-sm font-bold">
                        4
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>Custom rules for your design system</strong> — Create project-specific lints to
                          enforce spacing scales, color palettes, or component patterns
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Backend Perspective */}
          <Section id="backend-perspective" title="When doing small tweaks">
            <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">How to safely tweak UI</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>IntelliSense is your friend</strong> — autocomplete shows you available utilities
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Stick to design tokens</strong> — use p-4 instead of p-[17px]
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Small changes are safe</strong> — adjusting spacing, colors, text size rarely breaks
                        things
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-bold">
                      4
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Copy patterns</strong> — look at similar components for reference
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-bold">
                      5
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>ESLint is your guide</strong> — Setup your IDE to highlight errors and warnings of design system.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Resources */}
          <Section id="resources" title="Resources">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <a
                    href="https://tailwindcss.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">Tailwind CSS v4 Documentation</h4>
                      <p className="text-sm text-muted-foreground">Official docs and API reference</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    href="https://tailwindcss.com/docs/hover-focus-and-other-states"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">Tailwind Variants Documentation</h4>
                      <p className="text-sm text-muted-foreground">Hover, focus, and responsive states</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    href="https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">Tailwind's Recommended Class Sorting</h4>
                      <p className="text-sm text-muted-foreground">Official sorting methodology</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">Prettier Plugin TailwindCSS</h4>
                      <p className="text-sm text-muted-foreground">Automatic class sorting</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">Tailwind CSS IntelliSense</h4>
                      <p className="text-sm text-muted-foreground">VS Code extension for autocomplete and hints</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    href="https://cva.style"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold">CVA (Class Variance Authority)</h4>
                      <p className="text-sm text-muted-foreground">Type-safe component variants</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <Button onClick={copyResources} className="w-full bg-transparent" variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy all resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Section>
        </div>

        {/* Footer */}
        <footer className="border-t border-border mt-24 py-8">
          <div className="max-w-4xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>Built with Next.js, Tailwind CSS v4, and Framer Motion</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-8 min-h-screen flex flex-col"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">{title}</h2>
      {children}
    </motion.section>
  )
}

function FeatureCard({
  title,
  description,
  badge,
  children,
}: {
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">—</span>
        <span className="text-sm text-muted-foreground">{description}</span>
        {badge && (
          <Badge variant="outline" className="ml-auto">
            {badge}
          </Badge>
        )}
      </div>
      {children}
    </div>
  )
}
