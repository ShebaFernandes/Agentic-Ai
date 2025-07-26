import React, { useState } from "react";
import { auth } from "./firebase";
import { motion } from "framer-motion";

const Settings = ({ user }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("There was an issue signing out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-white/20"
      >
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Profile Settings</h2>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>
      </motion.div>

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            👤
          </span>
          Account Information
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-900 font-medium">{user?.displayName || "Not set"}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-900 font-medium">{user?.email || "Not set"}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
            <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <p className="text-green-800 font-medium">Active</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            ⚙️
          </span>
          Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates about your students and classes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Dark Mode</h4>
              <p className="text-sm text-gray-600">Switch to dark theme for better night viewing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-800">Auto-save Drafts</h4>
              <p className="text-sm text-gray-600">Automatically save your work as you type</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-red-200"
      >
        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center">
          <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            ⚠️
          </span>
          Account Actions
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">Sign Out</h4>
            <p className="text-sm text-red-600 mb-4">
              You will be signed out of your account and redirected to the login page.
            </p>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isSigningOut ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing Out...
                </div>
              ) : (
                "Sign Out"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;