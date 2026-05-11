import { useState } from 'react';
import { Camera, Mail, User, Shield, Bell, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'claim_approved' | 'claim_rejected';
  item_title: string;
  read: boolean;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_photo?: string;
}

interface ProfilePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
  notifications: Notification[];
}

export function ProfilePage({ user, onUpdateUser, notifications }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ ...user, profile_photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    onUpdateUser({ ...user, name: editedName });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 sm:h-40 relative">
          <div className="absolute -bottom-16 left-6 sm:left-8">
            <div className="relative">
              {user.profile_photo ? (
                <img
                  src={user.profile_photo}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-4xl sm:text-5xl font-bold">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <motion.label
                htmlFor="profile-photo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 sm:p-2.5 rounded-full cursor-pointer hover:bg-blue-700 transition-all shadow-lg"
              >
                <Camera size={18} />
                <input
                  type="file"
                  id="profile-photo"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </motion.label>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 sm:pt-24 px-6 sm:px-8 pb-8">
          <div className="mb-8">
            {isEditing ? (
              <div className="flex items-center gap-3 mb-2">
                <motion.input
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-blue-600 outline-none px-2 py-1"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveName}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditedName(user.name);
                    setIsEditing(false);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </motion.button>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={18} className="text-blue-600" />
              <span className="font-medium">{user.role}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="font-medium text-gray-900">{user.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            </div>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="mx-auto mb-3 text-gray-300" size={48} />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 5).map(notif => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-white rounded-lg p-4 border ${
                      notif.type === 'claim_approved'
                        ? 'border-green-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notif.type === 'claim_approved'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        <CheckCircle size={16} className={
                          notif.type === 'claim_approved'
                            ? 'text-green-600'
                            : 'text-gray-600'
                        } />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {notif.item_title}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notif.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
