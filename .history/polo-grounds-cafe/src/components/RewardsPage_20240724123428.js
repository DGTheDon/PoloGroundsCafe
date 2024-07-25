import React from 'react';
import { Star, Coffee, Gift, Zap, Calendar, Users, ArrowRight } from 'lucide-react';

const RewardItem = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="bg-green-100 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-green-800">{title}</h3>
    <p className="text-green-700">{description}</p>
  </div>
);

const RewardsPage = () => {
  const rewards = [
    {
      icon: <Coffee className="w-8 h-8 text-green-700" />,
      title: "Free Drinks",
      description: "Earn 2 Stars per $1 spent to get free drinks. Customize your drink and order ahead with our app."
    },
    {
      icon: <Gift className="w-8 h-8 text-green-700" />,
      title: "Birthday Reward",
      description: "Enjoy a free drink or food item of your choice on your birthday, every year."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-700" />,
      title: "Double Star Days",
      description: "Earn Stars twice as fast on select days. Boost your Rewards balance quickly!"
    },
    {
      icon: <Users className="w-8 h-8 text-green-700" />,
      title: "Exclusive Events",
      description: "Get access to special offers and Rewards member events throughout the year."
    }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Polo Grounds Rewards</h1>
          <p className="text-xl mb-8">Join our Rewards program to earn Stars for free drinks, exclusive benefits, and more!</p>
          <button className="bg-white text-green-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300">
            Join now
          </button>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Getting Started is Easy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Create an account</h3>
              <p className="text-green-700">Join in the app or online for free. You'll start earning Stars right away!</p>
            </div>
            <div className="text-center">
              <div className="bg-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Order and pay how you'd like</h3>
              <p className="text-green-700">Use cash, credit/debit card or save some time and pay right through the app.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-800">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Earn Stars, get Rewards</h3>
              <p className="text-green-700">As you earn Stars, you can redeem them for Rewards—like free food and drinks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Rewards You'll Love</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rewards.map((reward, index) => (
              <RewardItem key={index} {...reward} />
            ))}
          </div>
        </div>
      </section>

      {/* Endless Extras Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Endless Extras</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-800">Fun freebies</h3>
              <p className="text-green-700">Not only can you earn free coffee, look forward to a birthday treat plus coffee and tea refills.</p>
            </div>
            <div className="text-center">
              <Zap className="w-16 h-16 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-800">Order & pay ahead</h3>
              <p className="text-green-700">Enjoy the convenience of in-app ordering and paying. Saving time has never been easier.</p>
            </div>
            <div className="text-center">
              <Star className="w-16 h-16 text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-800">Get to free faster</h3>
              <p className="text-green-700">Earn Stars even quicker with Bonus Star challenges, Double Star Days and exciting games.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cash or Card Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Cash or card, you earn Stars</h2>
              <p className="text-xl mb-6">No matter how you pay, you can earn Stars with your morning coffee. Those Stars add up to (really delicious) Rewards.</p>
              <button className="bg-white text-green-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition duration-300 flex items-center">
                Learn more <ArrowRight className="ml-2" />
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="Payment methods" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Start earning today section */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Start earning today</h2>
          <p className="text-xl mb-8 text-green-700">Join now to start earning Rewards on every sip and bite.</p>
          <button className="bg-green-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">
            Join now
          </button>
          <p className="mt-4 text-green-700">Or <a href="#" className="underline">join in the app</a> for the best experience</p>
        </div>
      </section>
    </div>
  );
};

export default RewardsPage;