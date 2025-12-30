export default function TopSearches() {
    const searches = [
        "call girl in Indore",
        "call girl in Jaipur",
        "call girl in Delhi",
        "call girl in Mumbai",
        "call girl in Bangalore",
        "call girl in Pune",
        "call girl in Ahmedabad",
        "call girl in Bhopal",
        "call girl in Noida",
        "call girl in Gurugram",
        "call girl in Chandigarh",
        "call girl in Kolkata",
        "call girl in Chennai",
        "call girl in Hyderabad",
        "call girl in Surat",
        "call girl in Vadodara",
        "call girl in Udaipur",
        "call girl in Jodhpur"
      ]
      
  
    return (
      <section className="bg-[#141414] py-20">
        <div className="mx-auto max-w-7xl px-6">
  
          {/* Heading */}
          <h2 className="text-center text-white mb-10 font-serif text-4xl md:text-5xl">
          Top Search 
        </h2>
  
          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {searches.map((item, index) => (
              <span
                key={index}
                className="rounded-xl bg-[#9b8a6a]/70 px-6 py-3 text-sm md:text-base text-white transition cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  