import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
 import { motion, type Variants } from "framer-motion";

 type FAQItem = {
  value: string;
  trigger: string;
  content: string;
};

export default function FAQs() {

  const items: FAQItem[]= [
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

  return (
    <section className="relative mt-10">

        <div className="flex flex-col items-center justify-center mx-auto py-5 px-6">
          <motion.h1
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl tablet:text-3xl font-bold text-secondary mb-10 text-center"
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-2xl"
          >
            <Accordion type="single" collapsible defaultValue="item-1">
              {items.map((item) => (
                <motion.div key={item.value} variants={itemVariants}>
                  <AccordionItem value={item.value}>
                    <AccordionTrigger className="text-lg">
                      {item.trigger}
                    </AccordionTrigger>
                    <AccordionContent className="px-3">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>

    </section>
  );
}
