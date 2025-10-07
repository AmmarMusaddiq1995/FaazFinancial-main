"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RefreshCw, Search } from "lucide-react"
import Link from "next/link"

export default function BusinessNameGeneratorPage() {
  const [keyword, setKeyword] = useState("")
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const businessSuffixes = [
    "LLC",
    "Inc",
    "Corp",
    "Co",
    "Group",
    "Solutions",
    "Services",
    "Partners",
    "Enterprises",
    "Ventures",
  ]
  const businessPrefixes = [
    "Pro",
    "Elite",
    "Prime",
    "Smart",
    "Digital",
    "Global",
    "Modern",
    "Advanced",
    "Premier",
    "Strategic",
  ]
  const businessWords = [
    "Tech",
    "Solutions",
    "Systems",
    "Dynamics",
    "Innovations",
    "Consulting",
    "Capital",
    "Holdings",
    "Management",
    "Development",
  ]

  const generateNames = () => {
    if (!keyword.trim()) return

    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      const names = []
      const baseKeyword = keyword.trim()

      // Generate different types of names
      for (let i = 0; i < 12; i++) {
        const type = i % 4
        let name = ""

        switch (type) {
          case 0: // Keyword + Suffix
            name = `${baseKeyword} ${businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)]}`
            break
          case 1: // Prefix + Keyword
            name = `${businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)]} ${baseKeyword}`
            break
          case 2: // Keyword + Business Word
            name = `${baseKeyword} ${businessWords[Math.floor(Math.random() * businessWords.length)]}`
            break
          case 3: // Prefix + Keyword + Suffix
            name = `${businessPrefixes[Math.floor(Math.random() * businessPrefixes.length)]} ${baseKeyword} ${businessSuffixes[Math.floor(Math.random() * businessSuffixes.length)]}`
            break
        }

        if (!names.includes(name)) {
          names.push(name)
        }
      }

      setGeneratedNames(names)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Business Name Generator</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Generate unique and memorable business names for your company. Get creative suggestions based on your
            keywords and industry.
          </p>
        </div>
      </section>

      {/* Generator Tool */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generate Business Names
              </CardTitle>
              <CardDescription>
                Enter a keyword related to your business to generate creative name suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Enter your business keyword (e.g., tech, consulting, design)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && generateNames()}
                  className="flex-1"
                />
                <Button onClick={generateNames} disabled={!keyword.trim() || isGenerating}>
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Generate
                </Button>
              </div>

              {generatedNames.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Generated Names:</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {generatedNames.map((name, index) => (
                      <Badge key={index} variant="secondary" className="p-3 text-sm justify-center">
                        {name}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Next Steps:</strong> Once you find a name you like, check its availability and register
                      your business.
                    </p>
                    <Link href="/start-business">
                      <Button className="mt-2">Check Name Availability & Start Business</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Business Naming Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Keep It Simple</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose a name that's easy to spell, pronounce, and remember. Avoid complex words or unusual spellings.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Make It Memorable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A catchy, unique name will help your business stand out and be more memorable to customers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Check Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensure the name isn't already taken and check domain availability for your website.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consider Your Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Think about your target market and choose a name that resonates with your ideal customers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Future-Proof</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Avoid names that are too specific to your current products or services in case you expand.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Legal Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Make sure your chosen name complies with your state's naming requirements and isn't trademarked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Register Your Business Name?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Once you've found the perfect name, let us help you register your business and make it official.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Business Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
