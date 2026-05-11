import { useState } from 'react';
import { Upload, MapPin, Tag, FileText, CheckCircle, ArrowLeft, ArrowRight, Shield, PartyPopper, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReportFormProps {
  onSubmit: (item: {
    title: string;
    description: string;
    private_description: string;
    category: string;
    type: 'Lost' | 'Found';
    location: string;
    image_url?: string;
  }) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedType, setSubmittedType] = useState<'Lost' | 'Found'>('Lost');
  const [formData, setFormData] = useState({
    type: 'Lost' as 'Lost' | 'Found',
    title: '',
    description: '',
    private_description: '',
    category: 'Electronics',
    location: '',
    image_url: ''
  });

  const categories = ['Electronics', 'Documents', 'Personal Items', 'Clothing', 'Books', 'Other'];
  const locations = [
    'Library',
    'Student Center',
    'Cafeteria',
    'Lecture Hall A',
    'Lecture Hall B',
    'Sports Complex',
    'Dormitory',
    'Parking Lot',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedType(formData.type);
    onSubmit(formData);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setFormData({
      type: 'Lost',
      title: '',
      description: '',
      private_description: '',
      category: 'Electronics',
      location: '',
      image_url: ''
    });
    setStep(1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
      >
        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ width: '0%' }}
                animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: step >= 1 ? 1 : 0.8,
                }}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                  step >= 1 ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > 1 ? <CheckCircle size={20} /> : '1'}
              </motion.div>
              <span className="text-xs sm:text-sm font-medium mt-2 text-gray-600 hidden sm:block">Type</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: step >= 2 ? 1 : 0.8,
                }}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                  step >= 2 ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > 2 ? <CheckCircle size={20} /> : '2'}
              </motion.div>
              <span className="text-xs sm:text-sm font-medium mt-2 text-gray-600 hidden sm:block">Details</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: step >= 3 ? 1 : 0.8,
                }}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                  step >= 3 ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                3
              </motion.div>
              <span className="text-xs sm:text-sm font-medium mt-2 text-gray-600 hidden sm:block">Location</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Type Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What happened?</h2>
                <p className="text-gray-600 text-sm sm:text-base">Let us know if you lost or found an item</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Lost' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 sm:p-8 rounded-2xl border-2 transition-all ${
                    formData.type === 'Lost'
                      ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-5xl sm:text-6xl mb-3">😢</div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">I Lost Something</h3>
                  <p className="text-sm text-gray-600">Report an item you can't find</p>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'Found' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 sm:p-8 rounded-2xl border-2 transition-all ${
                    formData.type === 'Found'
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-5xl sm:text-6xl mb-3">🎉</div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">I Found Something</h3>
                  <p className="text-sm text-gray-600">Help reunite an item with its owner</p>
                </motion.button>
              </div>
              
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Item Details</h2>
                <p className="text-gray-600 text-sm sm:text-base">Help us identify the item</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Blue Water Bottle, iPhone 13, Student ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Tag size={16} className="text-purple-600" />
                  Public Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Brief description visible to all students (e.g., Blue water bottle with university logo)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-orange-600" />
                  Detailed Description (For Verification)
                </label>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-2">
                  <p className="text-xs text-orange-900">
                    <strong>🔒 Private & Secure:</strong> This detailed description is only visible to Campus Security admins.
                    Include specific details like serial numbers, unique marks, scratches, or contents that only the true owner would know.
                  </p>
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="E.g., Has my initials 'JD' written on the cap in permanent marker, small dent on bottom left, serial number XYZ123..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  value={formData.private_description}
                  onChange={(e) => setFormData({ ...formData, private_description: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.private_description.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        formData.category === cat
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Upload size={16} className="text-green-600" />
                  Upload Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center hover:border-blue-400 transition-all bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.image_url ? (
                      <div className="relative">
                        <img src={formData.image_url} alt="Preview" className="max-h-48 mx-auto rounded-xl" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({ ...formData, image_url: '' });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                        <p className="text-sm font-medium text-gray-700 mb-1">Click to upload an image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.title || !formData.description || !formData.private_description}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Location & Review */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Almost Done!</h2>
                <p className="text-gray-600 text-sm sm:text-base">Where was it {formData.type === 'Lost' ? 'last seen' : 'found'}?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-red-600" />
                  Location
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="">Select a location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Review Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 sm:p-6">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Review Your Report
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Type</p>
                    <p className="font-semibold text-gray-900">{formData.type === 'Lost' ? '😢 Lost Item' : '🎉 Found Item'}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Item</p>
                    <p className="font-semibold text-gray-900">{formData.title}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">{formData.category}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">{formData.location || 'Not selected'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={!formData.location}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  <span>Submit Report</span>
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseSuccess}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseSuccess}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              {submittedType === 'Found' ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <PartyPopper className="text-white" size={40} />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
                    Thank You! 🎉
                  </h2>
                  <p className="text-center text-gray-600 mb-6">
                    Your found item has been reported successfully!
                  </p>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 mb-6">
                    <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Shield size={18} />
                      Important Next Steps:
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Please take the found item to the <strong className="text-blue-900">Campus Security Office</strong> or <strong className="text-blue-900">Admin Post</strong> as soon as possible. Our team will help reunite it with its rightful owner. Thank you for being honest and helpful! 💙
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Heart className="text-white" size={40} />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
                    Report Submitted
                  </h2>
                  <p className="text-center text-gray-600 mb-6">
                    We've received your lost item report.
                  </p>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5 mb-6">
                    <p className="text-sm text-gray-700 leading-relaxed text-center">
                      We're really sorry about your lost item. 😔 Our team is working hard to help you find it. Keep checking the feed for updates, and we'll notify you if someone reports finding it. Stay hopeful! 🙏✨
                    </p>
                  </div>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCloseSuccess}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Got it, thanks!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}