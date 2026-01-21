import { statesData, unionTerritoriesData } from "../../data/locations";

export default function CitiesByState() {
  return (
    <section className="bg-[#0f0f0f] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <h2 className="mb-14 text-center font-serif text-4xl md:text-5xl text-[#d6c29f]">
          Cities by State & Union Territory
        </h2>

        {/* States Section */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-semibold text-[#c2a97e] border-b border-[#3a2c1a] pb-3">
            States
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(statesData).map(([state, cities]) => (
              <div
                key={state}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-[#3a2c1a] hover:border-[#c2a97e] transition-colors"
              >
                <h4 className="text-xl font-semibold text-[#d6c29f] mb-4">
                  {state}
                </h4>
                <ul className="space-y-2">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      className="text-[#c2a97e] hover:text-[#d6c29f] transition-colors cursor-pointer text-sm"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Union Territories Section */}
        <div>
          <h3 className="mb-8 text-2xl font-semibold text-[#c2a97e] border-b border-[#3a2c1a] pb-3">
            Union Territories
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(unionTerritoriesData).map(([territory, cities]) => (
              <div
                key={territory}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-[#3a2c1a] hover:border-[#c2a97e] transition-colors"
              >
                <h4 className="text-xl font-semibold text-[#d6c29f] mb-4">
                  {territory}
                </h4>
                <ul className="space-y-2">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      className="text-[#c2a97e] hover:text-[#d6c29f] transition-colors cursor-pointer text-sm"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

