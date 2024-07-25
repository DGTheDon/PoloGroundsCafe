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
      title: "Free Polo Lessons",
      description: "Earn points for every game played to get free polo lessons. Book your lesson through our app."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Equipment Discounts",
      description: "Use your points for discounts on polo equipment, including mallets, helmets, and more."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Birthday Reward",
      description: "Enjoy a free polo session or equipment rental on your birthday, every year."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Mobile Booking",
      description: "Skip the line and earn rewards when you book your polo sessions through our mobile app."
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Double Points Days",
      description: "Earn points twice as fast on select days. Boost your rewards balance quickly!"
    },
    {
      icon: "/api/placeholder/64/64",
      title: "Exclusive Events",
      description: "Get access to special polo events and member-only tournaments throughout the year."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto mt-8 p-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">PoloGrounds Rewards</h1>
          <p className="text-xl mb-6">Join our Rewards program to earn points for free polo sessions, equipment discounts, and exclusive events.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">Join now</button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <RewardItem key={index} {...reward} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default RewardsPage;