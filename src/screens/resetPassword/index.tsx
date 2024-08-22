'use client'; 

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import './index.css';
import { toastError, toastSuccess } from '@/utils/toast';
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/api/login/reset', {
        oldPassword,
        newPassword,
        confirmPassword
      });
      toastSuccess(response.data.message)
      setMessage('')
      setConfirmPassword('')
      setNewPassword('')
      setOldPassword('')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toastError(error.response.data.message || 'An error occurred')
      } else {
        toastError("An unexpected error occurred")
      }
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="old-password">Old Password</label>
          <div className="password-field">
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon" onClick={() => setShowOldPassword(!showOldPassword)}>
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <div className="password-field">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
