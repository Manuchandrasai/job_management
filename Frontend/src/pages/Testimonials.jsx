export default function Testimonials() {
  const testimonials = [
    {
      name: "Arun Kumar",
      role: "Client",
      feedback:
        "CyberMinds Works has been a trusted partner in our technology journey. Their expertise in AI, cloud, and custom software gave us the confidence to scale our business efficiently.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Divya Shree",
      role: "Client",
      feedback:
        "Working with CyberMinds Works has been an excellent experience. The team is professional, innovative, and always delivers projects on time with high quality.",
      image: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    {
      name: "Raghav Narayanan",
      role: "Client",
      feedback:
        "The CyberMinds Works team truly understands business needs. Their solutions are practical, scalable, and have helped us achieve significant growth in a short span of time.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Meena Krishnan",
      role: "Client",
      feedback:
        "CyberMinds Works provided us with cutting-edge cybersecurity solutions. Their team is knowledgeable, responsive, and always puts client success first.",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Suresh Iyer",
      role: "Client",
      feedback:
        "From web applications to enterprise software, CyberMinds Works has consistently exceeded our expectations. Their professionalism sets them apart in the industry.",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
    },
    {
      name: "Anitha R.",
      role: "Client",
      feedback:
        "Partnering with CyberMinds Works was one of our best decisions. Their team is reliable, creative, and delivers solutions that truly make an impact.",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          What People Say About CyberMinds Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-600 shadow-sm"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-indigo-700">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
