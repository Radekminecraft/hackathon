// pages/subscriptions.js
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Subscriptions() {
  return (
    <>
    <Header/>
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose Your Solution
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tier 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Buy the camera and software
            </h2>
            <p className="text-gray-600 mb-6">
              Full suite
            </p>
            <div className="text-gray-800 text-4xl font-bold mb-6">
              $100<span className="text-xl text-gray-500">one time payment</span>
            </div>
            <div className="text-gray-800 text-4xl font-bold mb-6">
              +$50<span className="text-xl text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 text-gray-600 mb-6">
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Get started
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Buy just the software
            </h2>
            <p className="text-gray-600 mb-6">
              For your own camera
            </p>
            <div className="text-gray-800 text-4xl font-bold mb-6">
              $100<span className="text-xl text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>✔️ Support all modern cameras</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
}
