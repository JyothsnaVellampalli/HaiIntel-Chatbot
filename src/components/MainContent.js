const MainContent = () => {
  return (
    <main className="pt-20 flex-1">
      <div className="container mx-auto px-4 pt-12 min-h-full">
        <section className="text-center mb-12">
          <h2 class="text-4xl lg:text-5xl font-bold text-foreground">AI Accelerators That Deliver Outcomes — Not Just Tools</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed pt-6">
            Each HaiProduct is modular, intelligence-powered, and built to drive measurable business results. 
            Use them standalone or combine within an end-to-end HaiIntel engagement.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Cutting-edge technology solutions that drive your business forward.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Reliability</h3>
            <p className="text-gray-600">
              Dependable services you can trust for critical business operations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Excellence</h3>
            <p className="text-gray-600">
              Committed to delivering the highest quality in everything we do.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default MainContent;