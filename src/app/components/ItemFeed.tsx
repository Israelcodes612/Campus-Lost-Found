import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Tag, TrendingUp, Package, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Item {
  id: string;
  title: string;
  description: string;
  private_description: string;
  category: string;
  type: 'Lost' | 'Found';
  location: string;
  image_url?: string;
  status: 'Pending' | 'Matched' | 'Returned';
  reporter_id: string;
  created_at: string;
}

interface ItemFeedProps {
  items: Item[];
  currentUserId: string;
  onClaimClick: (item: Item) => void;
}

export function ItemFeed({ items, currentUserId, onClaimClick }: ItemFeedProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Lost' | 'Found'>('All');

  const categories = ['All', 'Electronics', 'Documents', 'Personal Items', 'Clothing', 'Books'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const stats = {
    total: items.length,
    lost: items.filter(i => i.type === 'Lost').length,
    found: items.filter(i => i.type === 'Found').length,
    matched: items.filter(i => i.status === 'Matched').length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-500 mb-1">Lost</p>
              <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-red-600 rotate-180" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-500 mb-1">Found</p>
              <p className="text-2xl font-bold text-green-600">{stats.found}</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Sparkles className="text-green-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-500 mb-1">Matched</p>
              <p className="text-2xl font-bold text-purple-600">{stats.matched}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Sparkles className="text-purple-600" size={20} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6"
      >
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for your lost item or browse found items..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-gray-400" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setTypeFilter('All')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                typeFilter === 'All'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setTypeFilter('Lost')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                typeFilter === 'Lost'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              😢 Lost
            </button>
            <button
              onClick={() => setTypeFilter('Found')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                typeFilter === 'Found'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎉 Found
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      {searchTerm && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600 mb-4"
        >
          Found <strong>{filteredItems.length}</strong> item{filteredItems.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </motion.p>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
          >
            {/* Image */}
            <div className="h-48 sm:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <Tag size={48} className="text-gray-400" />
              )}
              {/* Type Badge Overlay */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                  item.type === 'Lost'
                    ? 'bg-red-500/90 text-white'
                    : 'bg-green-500/90 text-white'
                }`}>
                  {item.type === 'Lost' ? '😢 Lost' : '🎉 Found'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <div className="mb-3">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} className="text-purple-500 flex-shrink-0" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Tag size={14} className="text-green-500 flex-shrink-0" />
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                  item.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                  item.status === 'Matched' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {item.status === 'Pending' ? '⏳ Available' : item.status === 'Matched' ? '🔍 Under Review' : '✅ Retrieved'}
                </span>
                
                {item.status === 'Pending' && (
                  <button
                    onClick={() => onClaimClick(item)}
                    className="text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-1.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Claim
                  </button>
                )}
                {item.status === 'Matched' && (
                  <span className="text-xs text-gray-500 italic">In review</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-2xl shadow-sm"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('All');
              setTypeFilter('All');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}