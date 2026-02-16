import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQs() {
  const items = [
    {
      value: "item-1",
      trigger: "What is Crimson Cart?",
      content:
        "Crimson Cart is an e-commerce platform that offers a wide range of products at unbeatable prices.",
    },
    {
      value: "item-2",
      trigger: "Can I change my subscription plan?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
    },
    {
      value: "item-3",
      trigger: "What payment methods do you accept?",
      content:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    },
  ];

  return (
    <section className="relative h-[120vh] mt-10">
      
      {/* Sticky FAQ Card */}
      <div className="sticky top-0 z-10">

        <div className="flex flex-col items-center justify-center mx-auto py-5 px-6">
          <h1 className="text-xl tablet:text-3xl font-bold text-secondary mb-10 text-center">
            Frequently Asked Questions
          </h1>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full max-w-2xl"
          >
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-lg">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent className="px-3">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>

    </section>
  );
}
