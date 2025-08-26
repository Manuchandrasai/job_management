import { Link } from "react-router-dom";
export default function FindTalents() {
  return (
    <div className="px-6 sm:px-12 py-16 bg-white">
      {/* Section 1: Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-600">
          Find the Right Talents, Faster
        </h1>
      </div>

      {/* Section 2: Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Card 1 */}
        <div className="border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-lg transition">
          <img
            src="/icons/executive.png"
            alt="Executive Search"
            className="mx-auto mb-6 w-30 h-30"
          />
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Executive Search
          </h2>
          <p className="text-gray-600">
            We connect you with talents to drive your business forward.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-lg transition">
          <img
            src="/icons/masshiring.png"
            alt="Mass Hiring"
            className="mx-auto mb-6 w-30 h-25"
          />
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Mass Hiring
          </h2>
          <p className="text-gray-600">
            Efficient, high-volume recruitment solutions to scale your workforce
            quickly.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-lg transition">
          <img
            src="/icons/language.png"
            alt="Foreign Language Hiring"
            className="mx-auto mb-6 w-30 h-25"
          />
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Foreign Language Hiring
          </h2>
          <p className="text-gray-600">
            Tap into global markets with multilingual professionals.
          </p>
        </div>
      </div>

      {/* Section 3: Building Stronger Teams */}
      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Building Stronger Teams
          </h2>
          <p className="text-gray-700 mb-4">
            From executive search to bulk hiring and multilingual talent, we
            help businesses{" "}
            <span className="font-semibold text-gray-900">
              hire smarter, connect deeper, and grow faster.
            </span>
          </p>
          <p className="text-gray-700 font-semibold mb-6">
            This is your moment to hire better.
          </p>
           <button className="mt-6">
        <Link
          to="/about-us"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700"
        >
          Find the Right Talent
        </Link>
      </button>
        </div>

        {/* Right Features */}
        <div className="grid gap-8">
          <div className="flex items-start gap-4">
            <img src="/icons/discover.png" alt="Discover" className="w-20 h-15" />
            <div>
              <h3 className="font-bold text-lg">Discover</h3>
              <p className="text-gray-600">
                We learn what drives your business — and match you with people
                who move it forward.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src="/icons/strategy.png" alt="Strategize" className="w-20 h-15" />
            <div>
              <h3 className="font-bold text-lg">Strategize</h3>
              <p className="text-gray-600">
                We design purpose-led hiring plans for long-term team success.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src="/icons/evolve.png" alt="Evolve" className="w-20 h-15" />
            <div>
              <h3 className="font-bold text-lg">Evolve</h3>
              <p className="text-gray-600">
                We stay ahead of industry shifts to bring you future-ready
                talent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
