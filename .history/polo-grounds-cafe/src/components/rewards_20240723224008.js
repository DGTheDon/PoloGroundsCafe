import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const RewardItem = ({ icon, title, description }) => (
  <Card className="flex flex-col items-center text-center p-4">
    <CardHeader>
      <img src={icon} alt={title} className="w-16 h-16 mb-2" />
      <h3 className="text-lg font-bold">{title}</h3>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

const RewardsPage = () => {
  const rewards = [
    {
      icon: "/api/placeholder/64/64",
      title: "Free Coffee",
      description: "Earn 2 Stars per $1 spent to get free drinks. Customize your drink and order ahead with the app."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Free Food",
      description: "Use your Stars to get free food items like breakfast sandwiches, pastries, and more."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Birthday Reward",
      description: "Enjoy a free drink or food item of your choice on your birthday, every year."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Mobile Order & Pay",
      description: "Skip the line and earn Rewards when you order ahead with our mobile app."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Double Star Days",
      description: "Earn Stars twice as fast on select days. Boost your Rewards balance quickly!"
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Exclusive Offers",
      description: "Get access to special offers and Rewards member events throughout the year."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <img src="/api/placeholder/120/40" alt="Company Logo" className="h-10" />
        <nav className="mt-4">
          <ul className="flex space-x-4">
            <li><a href="#menu" className="text-gray-600 hover:text-gray-900">Menu</a></li>
            <li><a href="#rewards" className="text-gray-600 hover:text-gray-900">Rewards</a></li>
            <li><a href="#gift-cards" className="text-gray-600 hover:text-gray-900">Gift Cards</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Brand Rewards</h1>
          <p className="text-xl mb-6">Join our Rewards program to earn Stars for free food and drinks, get exclusive rewards, and chat with your favorite staff.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors">Join now</button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <RewardItem key={index} {...reward} />
          ))}
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>© 2023 Your Brand Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RewardsPage;