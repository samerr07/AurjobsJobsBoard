import Card from "../components/Cards/Card"; 
import CardContent from "../components/Cards/CardContent";
import { Button } from "../components/Cards/Button";   
import { CheckCircle } from "lucide-react";

const PricingPlan = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      duration: "/ month",
      features: ["10GB Storage", "Basic Analytics", "Email Support"],
    },
    {
      name: "Pro",
      price: "$29",
      duration: "/ month",
      features: ["100GB Storage", "Advanced Analytics", "24/7 Support"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      duration: "/ month",
      features: ["1TB Storage", "Custom Analytics", "Dedicated Support"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600">
          Simple and transparent pricing. Upgrade or downgrade at any time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
              plan.highlight ? "bg-indigo-600 text-white" : "bg-white text-gray-800"
            }`}
          >
            <CardContent className="p-8 flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <p className="text-4xl font-extrabold">
                    {plan.price}
                  </p>
                  <span className="text-lg text-gray-500">
                    {plan.duration}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full mt-6 py-3 rounded-md font-semibold ${
                  plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
