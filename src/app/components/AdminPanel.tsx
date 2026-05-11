import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, AlertCircle, Tag } from 'lucide-react';
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

interface Claim {
  id: string;
  item_id: string;
  claimer_id: string;
  claimer_name: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  verification_notes: string;
  created_at: string;
}

interface AdminPanelProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  claims: Claim[];
  setClaims: (claims: Claim[]) => void;
  onApproveClaim: (claimId: string, itemId: string) => void;
  onRejectClaim: (claimId: string, itemId: string) => void;
}

export function AdminPanel({ items, setItems, claims, setClaims, onApproveClaim, onRejectClaim }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Matched' | 'Returned'>('Pending');
  const [activeTab, setActiveTab] = useState<'items' | 'claims'>('claims');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (itemId: string, newStatus: 'Pending' | 'Matched' | 'Returned') => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  const handleApproveClaim = (claimId: string, itemId: string) => {
    setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'Approved' as const } : c));
    setItems(items.map(i => i.id === itemId ? { ...i, status: 'Matched' as const } : i));
    onApproveClaim(claimId, itemId);
  };

  const handleRejectClaim = (claimId: string, itemId: string) => {
    setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'Rejected' as const } : c));
    onRejectClaim(claimId, itemId);
  };

  const handleMarkAsReturned = (itemId: string) => {
    setItems(items.map(i => i.id === itemId ? { ...i, status: 'Returned' as const } : i));
  };

  const stats = {
    pending: items.filter(i => i.status === 'Pending').length,
    matched: items.filter(i => i.status === 'Matched').length,
    returned: items.filter(i => i.status === 'Returned').length,
    pendingClaims: claims.filter(c => c.status === 'Pending').length,
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-orange-50 border border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Pending Claims</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-3xl font-bold text-orange-900 mt-1"
              >
                {stats.pendingClaims}
              </motion.p>
            </div>
            <motion.div
              animate={{ rotate: stats.pendingClaims > 0 ? [0, 10, -10, 0] : 0 }}
              transition={{ repeat: stats.pendingClaims > 0 ? Infinity : 0, duration: 2 }}
            >
              <AlertCircle className="text-orange-400" size={40} />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending Items</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-3xl font-bold text-yellow-900 mt-1"
              >
                {stats.pending}
              </motion.p>
            </div>
            <Clock className="text-yellow-400" size={40} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Matched Items</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-3xl font-bold text-blue-900 mt-1"
              >
                {stats.matched}
              </motion.p>
            </div>
            <CheckCircle className="text-blue-400" size={40} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Returned Items</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-3xl font-bold text-green-900 mt-1"
              >
                {stats.returned}
              </motion.p>
            </div>
            <CheckCircle className="text-green-400" size={40} />
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex">
            <motion.button
              onClick={() => setActiveTab('claims')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'claims'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Claim Requests {stats.pendingClaims > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  {stats.pendingClaims}
                </motion.span>
              )}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('items')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'items'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              All Items
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'claims' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Verify Claim Requests</h3>
              {claims.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertCircle className="mx-auto mb-3 text-gray-300" size={48} />
                  <p>No claim requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {claims.map(claim => {
                    const item = items.find(i => i.id === claim.item_id);
                    if (!item) return null;

                    return (
                      <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                claim.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                claim.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {claim.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Claimed by: <strong>{claim.claimer_name}</strong>
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                              {new Date(claim.created_at).toLocaleString()}
                            </p>
                          </div>
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded ml-4"
                            />
                          )}
                        </div>

                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Claimer's Verification Details:</p>
                          <p className="text-sm text-gray-900">{claim.verification_notes}</p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
                          <p className="text-xs font-medium text-orange-900 mb-1 flex items-center gap-1">
                            <span>🔒</span> Reporter's Private Description (For Verification):
                          </p>
                          <p className="text-sm text-gray-900 font-medium">{item.private_description}</p>
                        </div>

                        <div className="bg-blue-50 rounded p-3 mb-3">
                          <p className="text-xs font-medium text-blue-700 mb-1">Public Description:</p>
                          <p className="text-sm text-gray-900">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Location: {item.location}</p>
                        </div>

                        {claim.status === 'Pending' && (
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => handleApproveClaim(claim.id, item.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <CheckCircle size={16} />
                              Approve Claim
                            </motion.button>
                            <motion.button
                              onClick={() => handleRejectClaim(claim.id, item.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <XCircle size={16} />
                              Reject Claim
                            </motion.button>
                          </div>
                        )}

                        {claim.status === 'Approved' && item.status === 'Matched' && (
                          <motion.button
                            onClick={() => handleMarkAsReturned(item.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                          >
                            Mark as Returned (Item Picked Up)
                          </motion.button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'items' && (
            <div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Pending' | 'Matched' | 'Returned')}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Matched">Matched</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Image</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Item</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Tag className="text-gray-400" size={24} />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{item.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Lost'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.location}</td>
                  <td className="py-4 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as 'Pending' | 'Matched' | 'Returned')}
                      className={`px-3 py-1 rounded text-sm font-medium border-0 ${
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        item.status === 'Matched' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Matched">Matched</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No items found</p>
          </div>
        )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
