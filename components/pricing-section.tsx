import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$1",
      period: "/Monthly",
      description: "Get your business started with the basics",
      popular: false,
      features: [
        "Standard Filing Service",
        "100% Accuracy Guarantee",
        "Worry-Free Compliance Offer*",
      ],
    },
    {
      name: "Pro",
      price: "$17",
      period: "/Monthly",
      description: "Most popular plan for new businesses",
      popular: true,
      features: [
        "Rush Filing Service",
        "100% Accuracy Guarantee",
        "Worry-Free Compliance",
        "Operating Agreement",
        "ID Required To File Taxes",
      ],
    },
    {
      name: "Premium",
      price: "$25",
      period: "/Monthly",
      description: "Complete package for serious entrepreneurs",
      popular: false,
      features: [
        "Rush Filing Service",
        "100% Accuracy Guarantee",
        "Worry-Free Compliance",
        "Operating Agreement",
        "ID Required To File Taxes",
      ],
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Compare our packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our customized packages meet the compliance, filing speed, and
            support needs of your new business in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Starter"
                    ? "Get Starter"
                    : plan.name === "Pro"
                    ? "Get Pro"
                    : "Get Premium"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            *Promotional terms are based on receiving complete information.
            FaazFinancialGroup processing times do not include Secretary of
            State processing times, which can vary.
          </p>
        </div>
      </div>
    </section>
  );
}
