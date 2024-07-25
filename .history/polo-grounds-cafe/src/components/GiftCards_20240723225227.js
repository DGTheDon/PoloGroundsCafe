import React from 'react';

const GiftCards = () => {
  const giftCardOptions = [
    { id: 1, name: 'Standard Gift Card', image: '/api/placeholder/300/200', description: 'Perfect for any occasion' },
    { id: 2, name: 'Holiday Special', image: '/api/placeholder/300/200', description: 'Festive design for the holiday season' },
    { id: 3, name: 'Thank You Card', image: '/api/placeholder/300/200', description: 'Show your appreciation' },
    { id: 4, name: 'Birthday Celebration', image: '/api/placeholder/300/200', description: 'Make their birthday extra special' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">Gift Cards</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Choose a Gift Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCardOptions.map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-green-800">{card.name}</h3>
                  <p className="text-green-600 mb-4">{card.description}</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-green-100 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Purchase a Gift Card</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-green-700 mb-2">Amount</label>
              <input 
                type="number" 
                id="amount" 
                name="amount" 
                min="10" 
                step="5" 
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label htmlFor="recipient" className="block text-green-700 mb-2">Recipient's Email</label>
              <input 
                type="email" 
                id="recipient" 
                name="recipient" 
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter recipient's email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-green-700 mb-2">Personal Message (optional)</label>
              <textarea 
                id="message" 
                name="message" 
                rows="3" 
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
              Purchase Gift Card
            </button>
          </form>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Why Choose Our Gift Cards?</h2>
          <p className="text-green-700 mb-4">
            Polo Grounds Cafe gift cards are perfect for any occasion. They're easy to send, delightful to receive, and can be used for our full range of delicious drinks and treats.
          </p>
          <ul className="text-green-600 list-disc list-inside mb-4">
            <li>Available in any amount from $10 to $500</li>
            <li>Never expires or loses value</li>
            <li>Can be used across all our locations</li>
            <li>Reloadable and easy to check balance</li>
          </ul>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GiftCards;