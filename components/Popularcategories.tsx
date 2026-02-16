export default function Popularcategories() {
  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Meat",
    "Dairy",
    "Seafood",
    "Spices",
    "Oils",
  ];

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-xl tablet:text-2xl font-bold text-secondary mb-6">
        Popular Categories
      </h1>

      <div className="
        grid 
        grid-cols-2 
        tablet:grid-cols-3 
        xl:grid-cols-4
        border border-secondary/30
        divide-x divide-y divide-secondary/30
      ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="
              p-10 
              text-center 
              hover:bg-secondary/5 
              transition
            "
          >
            <h2 className="text-lg font-semibold text-primary-text">
              {category}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
