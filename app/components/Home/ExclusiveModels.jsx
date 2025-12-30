
import { FaHeart } from "react-icons/fa";
import ModelCard from "../Common/ModelCard";

const models = [
  {
    name: "Shaifali",
    country: "India",
    image: "/es.jpg",
    price: "12,000",
    rating: 5,
    isPremium: true,
    description:
      "Shaifali is a premium Indian escort in Delhi NCR, offering elegant companionship tailored to your desires.",
  },
  {
    name: "Alina",
    country: "Russia",
    image: "/es.jpg",
    price: "18,000",
    rating: 5,
    isPremium: true,
    description:
      "Alina is an elite Russian companion known for charm, sophistication, and unforgettable experiences.",
  },
  {
    name: "Mia",
    country: "France",
    image: "/es.jpg",
    price: "20,000",
    rating: 4,
    isPremium: false,
    description:
      "Mia brings Parisian elegance and warmth, perfect for refined and classy companionship.",
  },
  {
    name: "Sakura",
    country: "Japan",
    image: "/es.jpg",
    price: "22,000",
    rating: 5,
    isPremium: true,
    description:
      "Sakura offers graceful beauty and a calm presence for a truly luxurious experience.",
  },
  {
    name: "Sakura",
    country: "Japan",
    image: "/es.jpg",
    price: "22,000",
    rating: 5,
    isPremium: true,
    description:
      "Sakura offers graceful beauty and a calm presence for a truly luxurious experience.",
  },
  {
    name: "Sakura",
    country: "Japan",
    image: "/es.jpg",
    price: "22,000",
    rating: 5,
    isPremium: true,
    description:
      "Sakura offers graceful beauty and a calm presence for a truly luxurious experience.",
  },
  {
    name: "Sakura",
    country: "Japan",
    image: "/es.jpg",
    price: "22,000",
    rating: 5,
    isPremium: true,
    description:
      "Sakura offers graceful beauty and a calm presence for a truly luxurious experience.",
  },
  {
    name: "Sakura",
    country: "Japan",
    image: "/es.jpg",
    price: "22,000",
    rating: 5,
    isPremium: true,
    description:
      "Sakura offers graceful beauty and a calm presence for a truly luxurious experience.",
  },
];

export default function ExclusiveModels() {
  return (
    <section className="bg-[#141414] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="text-center font-serif text-4xl md:text-5xl">
          Our Exclusive Escorts
        </h2>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center gap-4">
          <span className="h-px w-24 bg-[#9b8a6a]" />
          <FaHeart className="text-[#9b8a6a]" />
          <span className="h-px w-24 bg-[#9b8a6a]" />
        </div>

        {/* Description */}
        <p className="mx-auto mb-16 max-w-3xl text-center text-gray-400 leading-relaxed">
          Meet our carefully selected elite companions. Each model is chosen
          for their exceptional beauty, intelligence, and captivating
          personality. Browse our gallery to find your perfect match.
        </p>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((model, index) => (
            <ModelCard key={index} {...model} />
          ))}
        </div>
       <div className="flex justify-center mt-10">
        <button className="bg-[#9b8a6a] p-3 cursor-pointer">Load More</button>
       </div>
      </div>
    </section>
  );
}
