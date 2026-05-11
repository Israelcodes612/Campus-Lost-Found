import { useState } from 'react';
import { Search, PlusCircle, LogOut, Shield, Menu, X, Home, Bell, User as UserIcon } from 'lucide-react';
import { ItemFeed } from './ItemFeed';
import { ReportForm } from './ReportForm';
import { AdminPanel } from './AdminPanel';
import { ClaimModal } from './ClaimModal';
import { ProfilePage } from './ProfilePage';
import { motion, AnimatePresence } from 'motion/react';

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

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

export function Dashboard({ user, onLogout, onUpdateUser }: DashboardProps) {
  const [view, setView] = useState<'feed' | 'report' | 'admin' | 'profile'>(user.role === 'Admin' ? 'admin' : 'feed');
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: 'claim-1',
      item_id: '1',
      claimer_id: 'student-001',
      claimer_name: 'Sarah Williams',
      status: 'Pending',
      verification_notes: 'This is my water bottle. It has a small dent on the bottom left side and my initials "SW" written on the cap with permanent marker. I lost it yesterday around 2 PM.',
      created_at: '2026-05-03T14:30:00Z'
    },
    {
      id: 'claim-2',
      item_id: '2',
      claimer_id: 'student-002',
      claimer_name: 'Michael Chen',
      status: 'Pending',
      verification_notes: 'This is my iPhone 13 Pro. Serial number: F2G3H4J5K6L7. The lock screen wallpaper is a photo of my dog, a golden retriever. There is also a small scratch on the camera lens.',
      created_at: '2026-05-03T16:45:00Z'
    }
  ]);
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      title: 'Blue Water Bottle',
      description: 'Stainless steel water bottle with university logo',
      private_description: 'Has a small dent on the bottom left corner. Inside there are scratches from ice cubes. The cap has "SW" initials written in permanent marker on the inside.',
      category: 'Personal Items',
      type: 'Found',
      location: 'Library 2nd Floor',
      image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZXxlbnwxfHx8fDE3NzY4MTMyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Pending',
      reporter_id: '123',
      created_at: '2026-05-04T10:30:00Z'
    },
    {
      id: '2',
      title: 'iPhone 13 Pro',
      description: 'Black iPhone with cracked screen protector',
      private_description: 'Serial number: F2G3H4J5K6L7M8N9. Lock screen has a photo of a golden retriever. Small scratch on the top-right corner of the back camera lens. Case is Spigen black with a PopSocket.',
      category: 'Electronics',
      type: 'Lost',
      location: 'Student Center',
      image_url: 'https://images.unsplash.com/photo-1635425730497-7e742924096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxMyUyMFBybyUyMGJsYWNrfGVufDF8fHx8MTc3ODA2OTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Pending',
      reporter_id: '456',
      created_at: '2026-05-04T14:20:00Z'
    },
    {
      id: '3',
      title: 'Student ID Card',
      description: 'ID card belonging to Sarah Johnson, Matric: 2023/1234',
      private_description: 'Card has a visible coffee stain on the bottom right. Small tear on the top left corner. Has a sticker on the back with my dorm room number B-405.',
      category: 'Documents',
      type: 'Found',
      location: 'Cafeteria',
      image_url: 'https://images.unsplash.com/photo-1668903678359-e810dd966016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaWQlMjBjYXJkfGVufDF8fHx8MTc3NjgxMzIzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'Matched',
      reporter_id: '789',
      created_at: '2026-05-03T09:15:00Z'
    },
    {
      id: '4',
      title: 'MacBook Pro Charger',
      description: 'Apple 96W USB-C power adapter with charging cable',
      private_description: 'Cable has a small nick about 6 inches from the USB-C end. Power brick has faint scratches on the side with Apple logo. Serial number on brick: C02TQ3ABGFWF.',
      category: 'Electronics',
      type: 'Found',
      location: 'Lecture Hall A',
      status: 'Pending',
      reporter_id: '234',
      created_at: '2026-05-04T08:45:00Z'
    },
    {
      id: '5',
      title: 'Red Backpack',
      description: 'Nike red backpack with laptop compartment, has a Physics textbook inside',
      private_description: 'The Physics textbook is "University Physics 14th Edition" with my name "Mike Torres" written inside the front cover. Backpack has a broken zipper on the small front pocket. Contains a blue pencil case with a broken clip.',
      category: 'Personal Items',
      type: 'Lost',
      location: 'Sports Complex',
      status: 'Pending',
      reporter_id: '567',
      created_at: '2026-05-03T16:30:00Z'
    },
    {
      id: '6',
      title: 'Car Keys (Toyota)',
      description: 'Toyota car key with blue keychain that says "Class of 2024"',
      private_description: 'Keychain has a small photo of my family on the other side. Also has a miniature Eiffel Tower charm attached. Key fob battery cover is slightly loose.',
      category: 'Personal Items',
      type: 'Found',
      location: 'Parking Lot',
      status: 'Pending',
      reporter_id: '890',
      created_at: '2026-05-04T12:00:00Z'
    },
    {
      id: '7',
      title: 'Prescription Glasses',
      description: 'Black frame prescription glasses in brown case',
      private_description: 'Prescription is -3.5 in left eye, -3.0 in right eye. Frame brand is Ray-Ban Model RB5228. Case has "Dr. Vision Optical" label inside. Left nose pad is slightly bent.',
      category: 'Personal Items',
      type: 'Lost',
      location: 'Library',
      status: 'Returned',
      reporter_id: '345',
      created_at: '2026-05-02T11:20:00Z'
    }
  ]);

  const handleReportItem = (newItem: Omit<Item, 'id' | 'reporter_id' | 'created_at' | 'status'>) => {
    const item: Item = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      reporter_id: user.id,
      created_at: new Date().toISOString(),
      status: 'Pending'
    };
    setItems([item, ...items]);
    setView('feed');
  };

  const handleClaimClick = (item: Item) => {
    setSelectedItem(item);
    setClaimModalOpen(true);
  };

  const handleSubmitClaim = (claimData: Omit<Claim, 'id' | 'created_at'>) => {
    const newClaim: Claim = {
      ...claimData,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setClaims([...claims, newClaim]);
  };

  const handleApproveClaim = (claimId: string, itemId: string) => {
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
      const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: claim.claimer_id,
        message: 'Your claim has been approved! You can now pick up the item from Campus Security.',
        type: 'claim_approved',
        item_title: items.find(i => i.id === itemId)?.title || '',
        read: false,
        created_at: new Date().toISOString()
      };
      setNotifications([...notifications, notification]);
    }
  };

  const handleRejectClaim = (claimId: string, itemId: string) => {
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
      const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: claim.claimer_id,
        message: 'Your claim has been reviewed. Please contact Campus Security for more information.',
        type: 'claim_rejected',
        item_title: items.find(i => i.id === itemId)?.title || '',
        read: false,
        created_at: new Date().toISOString()
      };
      setNotifications([...notifications, notification]);
    }
  };

  const userNotifications = notifications.filter(n => n.user_id === user.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md"
              >
                <Home className="text-white" size={20} />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Campus Lost & Found
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Your items, reunited</p>
              </div>
            </motion.div>
            
            {/* Desktop User Info */}
            <div className="hidden md:flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all relative"
                  title="Notifications"
                >
                  <motion.div
                    animate={unreadCount > 0 ? { rotate: [0, -15, 15, -15, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                  >
                    <Bell size={20} />
                  </motion.div>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      {userNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No notifications yet
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {userNotifications.map((notif, index) => (
                            <motion.div
                              key={notif.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
                              onClick={() => {
                                setNotifications(notifications.map(n =>
                                  n.id === notif.id ? { ...n, read: true } : n
                                ));
                              }}
                            >
                              <p className="text-sm font-medium text-gray-900 mb-1">{notif.item_title}</p>
                              <p className="text-xs text-gray-600">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notif.created_at).toLocaleString()}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <motion.button
                onClick={() => setView('profile')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {user.profile_photo ? (
                  <motion.img
                    whileHover={{ rotate: 5 }}
                    src={user.profile_photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                  >
                    {user.name.charAt(0)}
                  </motion.div>
                )}
              </motion.button>
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40 top-[57px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* User Profile in Mobile Menu */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => {
                      setView('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 mb-3 w-full hover:bg-gray-50 p-2 rounded-lg transition-all"
                  >
                    {user.profile_photo ? (
                      <img
                        src={user.profile_photo}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </button>
                  {unreadCount > 0 && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                      <p className="text-xs text-blue-900 font-medium">
                        {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setView('feed');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      view === 'feed'
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Search size={20} />
                    <span>Search Items</span>
                  </button>
                  <button
                    onClick={() => {
                      setView('report');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      view === 'report'
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <PlusCircle size={20} />
                    <span>Report Item</span>
                  </button>
                  <button
                    onClick={() => {
                      setView('profile');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      view === 'profile'
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <UserIcon size={20} />
                    <span>My Profile</span>
                  </button>
                  {user.role === 'Admin' && (
                    <button
                      onClick={() => {
                        setView('admin');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        view === 'admin'
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Shield size={20} />
                      <span>Admin Panel</span>
                      {claims.filter(c => c.status === 'Pending').length > 0 && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold ml-auto">
                          {claims.filter(c => c.status === 'Pending').length}
                        </span>
                      )}
                    </button>
                  )}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="w-full mt-6 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <motion.button
              onClick={() => setView('feed')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`py-3 px-6 border-b-2 transition-all flex items-center gap-2 rounded-t-lg ${
                view === 'feed'
                  ? 'border-blue-600 text-blue-600 bg-blue-50 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Search size={18} />
              <span>Search Items</span>
            </motion.button>
            <motion.button
              onClick={() => setView('report')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`py-3 px-6 border-b-2 transition-all flex items-center gap-2 rounded-t-lg ${
                view === 'report'
                  ? 'border-blue-600 text-blue-600 bg-blue-50 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <PlusCircle size={18} />
              <span>Report Item</span>
            </motion.button>
            {user.role === 'Admin' && (
              <motion.button
                onClick={() => setView('admin')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`py-3 px-6 border-b-2 transition-all flex items-center gap-2 rounded-t-lg ${
                  view === 'admin'
                    ? 'border-blue-600 text-blue-600 bg-blue-50 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Shield size={18} />
                <span>Admin Panel</span>
                {claims.filter(c => c.status === 'Pending').length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold"
                  >
                    {claims.filter(c => c.status === 'Pending').length}
                  </motion.span>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Main Content with Animation */}
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'feed' && <ItemFeed items={items} currentUserId={user.id} onClaimClick={handleClaimClick} />}
          {view === 'report' && <ReportForm onSubmit={handleReportItem} />}
          {view === 'profile' && <ProfilePage user={user} onUpdateUser={onUpdateUser} notifications={userNotifications} />}
          {view === 'admin' && user.role === 'Admin' && (
            <AdminPanel
              items={items}
              setItems={setItems}
              claims={claims}
              setClaims={setClaims}
              onApproveClaim={handleApproveClaim}
              onRejectClaim={handleRejectClaim}
            />
          )}
        </motion.div>
      </main>

      {selectedItem && (
        <ClaimModal
          isOpen={claimModalOpen}
          onClose={() => {
            setClaimModalOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          userName={user.name}
          userId={user.id}
          onSubmitClaim={handleSubmitClaim}
        />
      )}
    </div>
  );
}