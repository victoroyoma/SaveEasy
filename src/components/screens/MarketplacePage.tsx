import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { formatCurrency } from '../../data/mockData';

interface MarketplaceItem {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  price: number;
  category: 'electronics' | 'fashion' | 'food' | 'services' | 'education';
  images: string[];
  location: string;
  condition: 'new' | 'used' | 'refurbished';
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  views: number;
  favorites: number;
  rating: number;
  paymentMethods: ('cash' | 'bank_transfer' | 'mobile_money' | 'crypto')[];
}

export const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'orders'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All', icon: 'marketplace', color: '#87CEEB' },
    { key: 'electronics', label: 'Electronics', icon: 'bills', color: '#228B22' },
    { key: 'fashion', label: 'Fashion', icon: 'profile', color: '#FFD700' },
    { key: 'food', label: 'Food', icon: 'bills', color: '#FF4040' },
    { key: 'services', label: 'Services', icon: 'community', color: '#87CEEB' },
    { key: 'education', label: 'Education', icon: 'literacy', color: '#228B22' }
  ];

  const items: MarketplaceItem[] = [
    {
      id: '1',
      sellerId: 'seller1',
      sellerName: 'Kemi Electronics',
      title: 'Samsung Galaxy A54 - Like New',
      description: 'Barely used Samsung Galaxy A54 with all accessories. Perfect condition.',
      price: 280000,
      category: 'electronics',
      images: ['phone1.jpg'],
      location: 'Lagos, Nigeria',
      condition: 'used',
      status: 'available',
      createdAt: '2025-07-01',
      views: 156,
      favorites: 23,
      rating: 4.8,
      paymentMethods: ['cash', 'bank_transfer', 'mobile_money']
    },
    {
      id: '2',
      sellerId: 'seller2',
      sellerName: 'Fashion Hub',
      title: 'Traditional Ankara Dress',
      description: 'Beautiful handmade Ankara dress. Perfect for special occasions.',
      price: 15000,
      category: 'fashion',
      images: ['dress1.jpg'],
      location: 'Abuja, Nigeria',
      condition: 'new',
      status: 'available',
      createdAt: '2025-06-28',
      views: 89,
      favorites: 12,
      rating: 4.9,
      paymentMethods: ['cash', 'bank_transfer']
    },
    {
      id: '3',
      sellerId: 'seller3',
      sellerName: 'TechTeach Academy',
      title: 'Web Development Course',
      description: 'Complete web development bootcamp. 6 months intensive training.',
      price: 120000,
      category: 'education',
      images: ['course1.jpg'],
      location: 'Online',
      condition: 'new',
      status: 'available',
      createdAt: '2025-06-25',
      views: 234,
      favorites: 45,
      rating: 4.7,
      paymentMethods: ['bank_transfer', 'mobile_money', 'crypto']
    },
    {
      id: '4',
      sellerId: 'seller4',
      sellerName: 'Fresh Meals Lagos',
      title: 'Home-cooked Jollof Rice',
      description: 'Delicious homemade jollof rice with chicken. Ready for delivery.',
      price: 2500,
      category: 'food',
      images: ['food1.jpg'],
      location: 'Lagos, Nigeria',
      condition: 'new',
      status: 'available',
      createdAt: '2025-07-02',
      views: 67,
      favorites: 8,
      rating: 4.6,
      paymentMethods: ['cash', 'mobile_money']
    },
    {
      id: '5',
      sellerId: 'seller5',
      sellerName: 'Home Services Pro',
      title: 'House Cleaning Service',
      description: 'Professional house cleaning service. Reliable and affordable.',
      price: 8000,
      category: 'services',
      images: ['service1.jpg'],
      location: 'Lagos, Nigeria',
      condition: 'new',
      status: 'available',
      createdAt: '2025-06-30',
      views: 123,
      favorites: 19,
      rating: 4.5,
      paymentMethods: ['cash', 'bank_transfer', 'mobile_money']
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics': return 'bills';
      case 'fashion': return 'profile';
      case 'food': return 'bills';
      case 'services': return 'community';
      case 'education': return 'literacy';
      default: return 'marketplace';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return 'bills';
      case 'bank_transfer': return 'savings';
      case 'mobile_money': return 'bills';
      case 'crypto': return 'crypto';
      default: return 'bills';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#87CEEB] to-[#A0D8F1] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="marketplace" color="white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Marketplace</h2>
              <p className="text-sm opacity-90">Buy, sell, and trade with your community</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {[
          { key: 'browse', label: 'Browse' },
          { key: 'sell', label: 'Sell Item' },
          { key: 'orders', label: 'My Orders' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'bg-[#87CEEB] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Icon name="marketplace" color="#87CEEB" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-[#87CEEB] focus:border-[#87CEEB]"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="flex overflow-x-auto space-x-3 pb-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] ${
                    selectedCategory === category.key
                      ? 'bg-[#87CEEB] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon 
                    name={category.icon as any} 
                    color={selectedCategory === category.key ? 'white' : category.color} 
                    size={20} 
                    className="mb-1"
                  />
                  <span className="text-xs font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">
                {selectedCategory === 'all' ? 'All Items' : categories.find(c => c.key === selectedCategory)?.label}
                <span className="text-gray-500 text-sm ml-2">({filteredItems.length} items)</span>
              </h3>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id}>
                  <div className="flex space-x-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Icon name={getCategoryIcon(item.category) as any} color="#87CEEB" size={24} />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{formatCurrency(item.price)}</div>
                          <Badge 
                            text={item.condition} 
                            variant="secondary" 
                            size="xs"
                          />
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span>{item.sellerName}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Icon name="profile" size={12} className="mr-1" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="profile" size={12} />
                          <span>{item.views}</span>
                          <Icon name="goals" size={12} />
                          <span>{item.favorites}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-1">
                          {item.paymentMethods.slice(0, 3).map((method, index) => (
                            <div key={index} className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                              <Icon name={getPaymentMethodIcon(method) as any} size={12} color="#666" />
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                          <Button variant="primary" size="sm">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sell' && (
        <div className="space-y-6">
          <Card>
            <h3 className="font-medium mb-4">List New Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Samsung Galaxy A54 - Like New"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  placeholder="Describe your item..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input 
                    type="number" 
                    placeholder="₦50,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]">
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Food</option>
                    <option>Services</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]">
                    <option>New</option>
                    <option>Used</option>
                    <option>Refurbished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input 
                    type="text" 
                    placeholder="Lagos, Nigeria"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Methods
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Cash', 'Bank Transfer', 'Mobile Money', 'Crypto'].map((method) => (
                    <label key={method} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Icon name="profile" size={40} color="#87CEEB" className="mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photos</p>
                </div>
              </div>

              <Button className="w-full">
                List Item
              </Button>
            </div>
          </Card>

          {/* Selling Tips */}
          <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="literacy" color="#87CEEB" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Selling Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Take clear, well-lit photos from multiple angles</li>
                  <li>• Write detailed and honest descriptions</li>
                  <li>• Price competitively by checking similar items</li>
                  <li>• Respond to messages quickly and professionally</li>
                  <li>• Meet in safe, public places for transactions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-medium">Your Orders</h3>
          
          {/* Order History */}
          <div className="space-y-3">
            {[
              {
                id: 'ORD001',
                item: 'Samsung Galaxy A54',
                seller: 'Kemi Electronics',
                amount: 280000,
                status: 'delivered',
                date: '2025-06-25'
              },
              {
                id: 'ORD002',
                item: 'Web Development Course',
                seller: 'TechTeach Academy',
                amount: 120000,
                status: 'in_progress',
                date: '2025-06-20'
              }
            ].map((order) => (
              <Card key={order.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Icon name="marketplace" color="#333333" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{order.item}</h4>
                      <p className="text-sm text-gray-600">{order.seller}</p>
                      <p className="text-xs text-gray-500">
                        Order #{order.id} • {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(order.amount)}</div>
                    <Badge 
                      text={order.status === 'delivered' ? 'Delivered' : 'In Progress'} 
                      variant={order.status === 'delivered' ? 'success' : 'secondary'}
                      size="sm"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card variant="elevated">
            <div className="text-center">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our support team for order assistance
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" fullWidth>
                  Live Chat
                </Button>
                <Button variant="outline" fullWidth>
                  Call Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
