import { X, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Claim {
  id: string;
  item_id: string;
  claimer_id: string;
  claimer_name: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  verification_notes: string;
  created_at: string;
}

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    description: string;
    private_description: string;
    type: 'Lost' | 'Found';
  };
  userName: string;
  userId: string;
  onSubmitClaim: (claim: Omit<Claim, 'id' | 'created_at'>) => void;
}

export function ClaimModal({ isOpen, onClose, item, userName, userId, onSubmitClaim }: ClaimModalProps) {
  const [verificationNotes, setVerificationNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitClaim({
      item_id: item.id,
      claimer_id: userId,
      claimer_name: userName,
      status: 'Pending',
      verification_notes: verificationNotes
    });
    setVerificationNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Claim Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provide verification details
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Help us verify this is your item. Include identifying details like serial numbers,
              unique marks, contents, or anything that proves ownership.
            </p>
            <textarea
              required
              rows={4}
              placeholder="e.g., The water bottle has a small dent on the bottom and my initials 'JD' written on the cap..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Next steps:</strong> Your claim will be reviewed by Campus Security.
              They will verify your details and contact you for pickup if approved.
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Submit Claim
            </motion.button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
