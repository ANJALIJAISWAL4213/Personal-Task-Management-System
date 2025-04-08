import React, { useState } from 'react';
import './AuthPage.css';

export default function AuthPage() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'otp'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');

  const [users, setUsers] = useState([
    { email: 'test@example.com', password: '123456' }, // pre-registered user
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setMessage('✅ Login successful');
    } else {
      setMessage('❌ Invalid credentials');
    }
  };

  const handleSignup = () => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      setMessage('❌ Email already exists');
      return;
    }
    if (password !== confirm) {
      setMessage('❌ Passwords do not match');
      return;
    }
    setUsers([...users, { email, password }]);
    setMessage('✅ Registration successful');
    setView('login');
    setEmail('');
    setPassword('');
    setConfirm('');
  };

  const handleResetSubmit = () => {
    if (contact.trim()) {
      setView('otp');
    }
  };

  const handleVerifyOtp = () => {
    alert('✅ OTP Verified (mock)');
    setView('login');
  };

  return (
    <div className='container'>
      <div className='form-container'>
        {view !== 'forgot' && view !== 'otp' && (
          <div className='form-toggle'>
            <button className={view === 'login' ? 'active' : ''} onClick={() => { setView('login'); setMessage(''); }}>Login</button>
            <button className={view === 'signup' ? 'active' : ''} onClick={() => { setView('signup'); setMessage(''); }}>Signup</button>
          </div>
        )}

        {view === 'login' && (
          <div className='form'>
            <h2>Login</h2>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <a href='#' onClick={() => setView('forgot')}>Forgot Password?</a>
            <button onClick={handleLogin}>Login</button>
            <p>Not a member? <a href='#' onClick={() => setView('signup')}>Signup now</a></p>
            {message && <p className="status">{message}</p>}
          </div>
        )}

        {view === 'signup' && (
          <div className='form'>
            <h2>Signup</h2>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='password' placeholder='Confirm Password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
            {message && <p className="status">{message}</p>}
          </div>
        )}

        {view === 'forgot' && (
          <div className='form'>
            <h2>Forgot Password</h2>
            <div className="method-toggle">
              <button className={method === 'email' ? 'active' : ''} onClick={() => setMethod('email')}>Email</button>
              <button className={method === 'phone' ? 'active' : ''} onClick={() => setMethod('phone')}>Phone</button>
            </div>
            <p>Enter your {method} to receive a reset link.</p>
            <input type={method === 'email' ? 'email' : 'tel'} placeholder={method === 'email' ? 'Email' : 'Phone Number'} value={contact} onChange={(e) => setContact(e.target.value)} />
            <button onClick={handleResetSubmit}>Send Reset Link</button>
            <p><a href='#' onClick={() => setView('login')}>Back to Login</a></p>
          </div>
        )}

        {view === 'otp' && (
          <div className='form'>
            <h2>OTP Verification</h2>
            <p>Sent OTP to <b>{contact}</b></p>
            <input type='text' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
            <p>Didn’t receive it? <a href='#' onClick={handleResetSubmit}>Resend OTP</a></p>
            <p><a href='#' onClick={() => setView('forgot')}>Back</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
