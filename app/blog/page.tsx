import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "The Complete Guide to Starting an LLC in 2024",
    excerpt:
      "Everything you need to know about forming a Limited Liability Company, from choosing a state to ongoing compliance requirements.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Business Formation",
    image: "business formation guide with documents and laptop",
  }

  const blogPosts = [
    {
      title: "Delaware vs. Nevada: Which State is Best for Your LLC?",
      excerpt:
        "Compare the benefits and drawbacks of forming your LLC in Delaware versus Nevada, including tax implications and business-friendly laws.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "State Comparison",
      image: "state comparison map with business icons",
    },
    {
      title: "Do You Need an Operating Agreement for Your LLC?",
      excerpt:
        "Learn why an operating agreement is crucial for your LLC's success and what key provisions should be included.",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "5 min read",
      category: "Legal Documents",
      image: "legal documents and contract signing",
    },
    {
      title: "How to Get an EIN for Your New Business",
      excerpt:
        "Step-by-step guide to obtaining your Employer Identification Number from the IRS, including common mistakes to avoid.",
      author: "David Kim",
      date: "March 8, 2024",
      readTime: "4 min read",
      category: "Tax & Compliance",
      image: "tax forms and calculator on desk",
    },
    {
      title: "Business Banking: How to Choose the Right Account",
      excerpt:
        "Essential factors to consider when selecting a business bank account, including fees, features, and requirements.",
      author: "Lisa Wang",
      date: "March 5, 2024",
      readTime: "7 min read",
      category: "Banking & Finance",
      image: "business banking with credit cards and statements",
    },
    {
      title: "Registered Agent Services: What You Need to Know",
      excerpt:
        "Understanding the role of a registered agent and whether you should use a professional service or serve as your own.",
      author: "James Thompson",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Business Services",
      image: "professional office building with business address",
    },
    {
      title: "Annual Report Requirements by State",
      excerpt:
        "Stay compliant with your state's annual reporting requirements. Learn deadlines, fees, and consequences of missing filings.",
      author: "Sarah Johnson",
      date: "March 1, 2024",
      readTime: "6 min read",
      category: "Compliance",
      image: "annual report forms and calendar",
    },
  ]

  const categories = [
    "All Posts",
    "Business Formation",
    "State Comparison",
    "Legal Documents",
    "Tax & Compliance",
    "Banking & Finance",
    "Business Services",
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-cyan-100 text-cyan-800">Business Blog</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Business Formation Insights
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Expert advice, guides, and insights to help you start and grow your business successfully.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input type="text" placeholder="Search articles..." className="pl-12 py-4 text-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={`/abstract-geometric-shapes.png?height=400&width=600&query=${featuredPost.image}`}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-cyan-100 text-cyan-800">{featuredPost.category}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button className="w-fit bg-cyan-600 hover:bg-cyan-700">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={`/abstract-geometric-shapes.png?height=200&width=400&query=${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-cyan-100 text-cyan-800">{post.category}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Updated</h2>
              <p className="text-xl text-gray-600 mb-8">
                Get the latest business formation tips and insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button className="bg-cyan-600 hover:bg-cyan-700">Subscribe</Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">No spam. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
