import { useState } from 'react';
import { LogIn, UserPlus, GraduationCap, Shield, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthPageProps {
  onLogin: (user: { id: string; name: string; email: string; role: string }) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    matricNumber: '',
    role: 'Student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for admin credentials
    if (formData.email === 'admin@university.edu' && formData.password === 'admin123') {
      onLogin({
        id: 'admin-001',
        name: 'Campus Security Admin',
        email: formData.email,
        role: 'Admin'
      });
      return;
    }

    // Check for regular user credentials (for demo purposes)
    if (formData.email === 'student@university.edu' && formData.password === 'student123') {
      onLogin({
        id: 'student-001',
        name: 'John Doe',
        email: formData.email,
        role: 'Student'
      });
      return;
    }

    // Mock authentication for any other email/password - in production this would call your JWT backend
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email,
      role: isSignup ? formData.role : 'Student'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <GraduationCap className="text-white" size={40} />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Campus Lost & Found
          </h1>
          <p className="text-gray-600">🎓 Reuniting students with their belongings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
          <motion.button
            onClick={() => setIsSignup(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
              !isSignup
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn size={18} />
              <span>Login</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setIsSignup(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
              isSignup
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={18} />
              <span>Sign Up</span>
            </div>
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matric Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="2024/12345"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.matricNumber}
                  onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
                />
              </motion.div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institutional Email
            </label>
            <input
              type="email"
              required
              placeholder="student@university.edu"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {isSignup && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Student' })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.role === 'Student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <GraduationCap className="mx-auto mb-1" size={20} />
                  <span className="text-xs">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Staff' })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.role === 'Staff'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Users className="mx-auto mb-1" size={20} />
                  <span className="text-xs">Staff</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'Admin' })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.role === 'Admin'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Shield className="mx-auto mb-1" size={20} />
                  <span className="text-xs">Admin</span>
                </button>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isSignup ? (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Made with 💙 for campus community
          </p>
        </div>
      </motion.div>
    </div>
  );
}