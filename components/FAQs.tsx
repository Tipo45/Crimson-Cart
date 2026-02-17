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
      trigger: "Do I need an account to make a purchase?",
      content:
        "Yes, you'll need to create a buyer account to complete purchases. This helps us track your orders and provide a personalized experience.",
    },
    {
      value: "item-3",
      trigger: "Is my payment information secure?",
      content:
        "Yes. We use industry-standard encryption and never store full payment details on our servers. All transactions are processed through secure payment gateways.",
    },
    {
      value: "item-4",
      trigger: "Do I need to download an app from an app store?",
      content:
        "No! This is a Progressive Web App (PWA). When you visit our URL, you'll be prompted to 'Install' or 'Add to Home Screen'. This creates an app-like icon on your device without needing to visit any app store.",
    },
    // {
    //   value: "item-5",
    //   trigger: " What happens if I don't install the app?",
    //   content:
    //     "You can still use the website normally in your browser. Installing simply provides a faster, more convenient experience with offline access.",
    // },
    
    // {
    //   value: "item-6",
    //   trigger: "I installed the PWA but it's not working offline.",
    //   content:
    //     "Some features require an internet connection, but basic browsing of cached products should work offline. Try visiting the site while online first to cache content, then test offline mode.",
    // },
    // {
    //   value: "item-7",
    //   trigger: "How do I uninstall the PWA?",
    //   content:
    //     "On mobile, long-press the app icon and select 'Remove from Home Screen' or 'Uninstall.' On desktop, use your browser's settings to remove the installed app.",
    // },
    // {
    //   value: "item-8",
    //   trigger: "Who do I contact for help?",
    //   content:
    //     "You can reach our support team at [email address] or through the 'Contact Us' form in the website footer. We typically respond within 24-48 hours.",
    // },
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
