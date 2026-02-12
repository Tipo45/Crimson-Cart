
export default function Popularcategories() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="text-xl tablet:text-2xl font-bold text-secondary mb-4">
        Popular Categories
      </h1>
      <div className="grid grid-cols-2 tablet:grid-cols-3 xl:grid-cols-4 gap-4 border-2">
        <div className="p-10 text-center border-r-2 border-b-2">
          <h2 className="text-lg font-bold text-primary-text">
            Vegetables
          </h2>
        </div>
        <div className="p-10 text-center border-b-2 border-l-2">
          <h2 className="text-lg font-bold text-primary-text">
            Fruits
          </h2>
        </div>
        <div className="p-10 text-center border-r-2 border-b-2">
          <h2 className="text-lg font-bold text-primary-text">
            Grains
          </h2>
        </div>
        <div className="p-10 text-center border-l-2 border-b-2">
          <h2 className="text-lg font-bold text-primary-text">
            Meat
          </h2>
        </div>
        <div className="p-10 text-center border-r-2 border-b-2">
          <h2 className="text-lg font-bold text-primary-text">
            Dairy
          </h2>
        </div>
        <div className="p-10 text-center border-l-2 border-b-2">
          <h2 className="text-lg font-bold text-primary-text">
            Seafood
          </h2>
        </div>
        <div className="p-10 text-center border-r-2">
          <h2 className="text-lg font-bold text-primary-text">
            Spices
          </h2>
        </div>
        <div className="p-10 text-center border-l-2">
          <h2 className="text-lg font-bold text-primary-text">
            Oils
          </h2>
        </div>

      </div>
    </section>
  )
}