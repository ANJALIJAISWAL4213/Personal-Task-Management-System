import { useState } from 'react';
import axios from 'axios';

export default function LoginWithOTP() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact) {
      setError('Please enter your email or phone number.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/send-otp', { contact }); // <-- replace with your backend
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/verify-otp', { contact, otp }); // <-- replace with your backend
      alert('OTP Verified Successfully!');
      // You can redirect or store auth token here
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {step === 'login' && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-blue-600">Login with OTP</h2>
            <input
              type="text"
              placeholder="Enter email or phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-green-600">Verify OTP</h2>
            <p className="text-sm text-gray-500 text-center">
              OTP has been sent to <span className="font-medium">{contact}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <p className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep('login');
                  setOtp('');
                  setError('');
                }}
                className="text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
