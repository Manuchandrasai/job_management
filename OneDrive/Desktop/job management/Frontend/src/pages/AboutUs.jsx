export default function AboutUs() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          About CyberMinds Works
        </h1>

        {/* Company Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <strong>CyberMinds Works</strong> is a leading technology company specializing in
          innovative solutions for businesses worldwide. We bridge the gap between advanced
          technology and real-world business challenges by delivering scalable, efficient,
          and smart solutions.
        </p>

        {/* Vision */}
        <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-3">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          To empower companies to harness technology for smarter operations, enhanced
          security, and sustainable growth.
        </p>

        {/* Services */}
        <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-3">Our Services</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>AI and Machine Learning Solutions</li>
          <li>Cloud Infrastructure and DevOps Consulting</li>
          <li>Custom Web and Mobile Application Development</li>
          <li>Cybersecurity Services</li>
          <li>Data Analytics and Business Intelligence</li>
        </ul>

        {/* Leadership Section */}
        <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-6 text-center">
          Meet Our Leadership
        </h2>

        {/* CEO */}
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-4 rounded-xl mb-6 shadow-sm">
          <img
            src="https://weekday-user-pictures.s3.ap-south-1.amazonaws.com/profile-images/jayasurya-jeyakodi-82753b20.jpg"
            alt="CEO"
            className="w-32 h-32 rounded-full shadow-md border-2 border-indigo-600"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-indigo-700">Jayasurya Jeyakodi</h3>
            <p className="text-gray-600 font-medium">Co-Founder</p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              Rajesh is a visionary leader with 5+ years of experience and Helping startups, founders and mid-size enterprises build their technology stack from the groundup. Experts in creating complex custom software solutions like CRM, Realtime-apps, end-to-end platforms - E-commerce, Online Examination.
            </p>
          </div>
        </div>

        {/* Co-CEO */}
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-4 rounded-xl shadow-sm">
          <img
            src="https://images.crunchbase.com/image/upload/c_thumb,h_170,w_170,f_auto,g_face,z_0.7,b_white,q_auto:eco,dpr_1/285dbb76ec9241e5a6e8844b0335e690"
            alt="Co-CEO"
            className="w-32 h-32 rounded-full shadow-md border-2 border-indigo-600"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-indigo-700">Boopesh Mahendran</h3>
            <p className="text-gray-600 font-medium">Co-Founder</p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              Boopesh Mahendran is the Co-Founder of CyberMind Works. He previously worked at Adobe as a Member of Technical Staff 2. Boopesh Mahendran attended Anna University Chennai.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Contact us:{" "}
            <a
              href="mailto:contact@cybermindworks.com"
              className="text-indigo-600 underline"
            >
              contact@cybermindworks.com
            </a>{" "}
            | +91 75000 53535
          </p>
          <p className="text-gray-600 mt-1">
            Visit:{" "}
            <a
              href="https://www.cybermindsworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              www.cybermindsworks.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
