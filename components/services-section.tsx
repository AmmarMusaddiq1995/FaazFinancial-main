export function ServicesSection() {
  const services = [
    {
      icon: "🚀",
      title: "Start Strong",
      description:
        "Select your LLC package, appoint a registered agent, secure your Employer ID Number (EIN), set up your company online with a professional website, and keep your personal and business banking separate with our personal and business banking.",
      image: "/business-formation-documents-and-laptop.png",
    },
    {
      icon: "🛡️",
      title: "Stay Protected",
      description:
        "Meet all ongoing local, state, and federal requirements by securing the business licenses and permits you need to legally operate, completing annual reports and filings, and managing your business finances to file your business tax returns.",
      image: "/business-compliance-and-protection-documents.png",
    },
    {
      icon: "📈",
      title: "Strengthen and Grow",
      description:
        "Access business tools and educational resources that help refine your business plan, expand your online presence, automate your finances, and streamline your sales and marketing.",
      image: "/business-growth-charts-and-analytics-dashboard.png",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Everything You Need to Start, Protect, and Grow Your Business
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From formation to ongoing compliance, we provide comprehensive business services to help entrepreneurs
            succeed at every stage.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="mb-8">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6 text-pretty">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
