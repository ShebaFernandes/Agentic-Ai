import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import Settings from "./Settings";
import LessonPlan from "./LessonPlan";
import QuizGenerator from "./QuizGenerator";
import TimeSplitter from "./TimeSplitter";
import StudentManager from "./StudentManager";
import Alfred from "./Alfred";
import ParentCommunicator from "./ParentCommunicator";
import DoubtScheduler from "./DoubtScheduler";
import Integrations from "./Integrations";
import Translator from "./Translator";

// Enhanced Feature Card Component with animations
const FeatureCard = ({ icon, title, description, onClick, color = "blue", delay = 0 }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    teal: "from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600",
    purple: "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
    amber: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    pink: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
    green: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    orange: "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    indigo: "from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
    gray: "from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600",
    cyan: "from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group bg-gradient-to-br ${colorClasses[color]} text-white rounded-2xl shadow-lg p-8 flex flex-col items-start transition-all duration-300 feature-card overflow-hidden`}
      onClick={onClick}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm opacity-90 leading-relaxed">
          {description}
        </p>
        
        {/* Arrow indicator */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color = "blue", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = ({ user }) => {
  const [screen, setScreen] = useState("home");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollectionRef = collection(db, "students");
      const data = await getDocs(studentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchStudents();
  }, []);

  const features = [
    {
      id: "lesson-plan",
      icon: "📝",
      title: "Lesson Plan Generator",
      description: "Create engaging, curriculum-aligned lesson plans with AI assistance.",
      color: "purple",
      component: <LessonPlan />,
    },
    {
      id: "quiz",
      icon: "❓",
      title: "Assessment & Quiz Generator",
      description: "Design comprehensive quizzes and assessments tailored to your students.",
      color: "amber",
      component: <QuizGenerator />,
    },
    {
      id: "schedule",
      icon: "⏰",
      title: "Multigrade Time Splitter",
      description: "AI-powered schedule management for multi-grade classrooms.",
      color: "pink",
      component: <TimeSplitter />,
    },
    {
      id: "students",
      icon: "🎓",
      title: "Student Management",
      description: "Comprehensive student profiles, progress tracking, and analytics.",
      color: "green",
      component: <StudentManager />,
    },
    {
      id: "alfred",
      icon: "🤖",
      title: "Alfred AI Assistant",
      description: "Your intelligent teaching companion for instant help and guidance.",
      color: "blue",
      component: <Alfred />,
    },
    {
      id: "parent-comm",
      icon: "✉️",
      title: "Parent Communicator",
      description: "Streamlined communication with parents and guardians.",
      color: "orange",
      component: <ParentCommunicator />,
    },
    {
      id: "doubt-scheduler",
      icon: "📅",
      title: "Doubt Scheduler",
      description: "Schedule and manage one-on-one doubt clearing sessions.",
      color: "indigo",
      component: <DoubtScheduler />,
    },
    {
      id: "integrations",
      icon: "🔗",
      title: "Integrations",
      description: "Connect with Google Workspace, LMS, and other educational tools.",
      color: "gray",
      component: <Integrations />,
    },
    {
      id: "translator",
      icon: "🌐",
      title: "Multilingual Support",
      description: "Translate content and communicate in multiple languages.",
      color: "cyan",
      component: <Translator />,
    },
    {
      id: "settings",
      icon: "⚙️",
      title: "Settings & Profile",
      description: "Manage your account, preferences, and application settings.",
      color: "teal",
      component: <Settings user={user} />,
    },
  ];

  const renderNavBar = () => (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.displayName?.split(' ')[0] || "Teacher"}! 👋
            </h1>
            <p className="text-sm text-gray-600">Ready to inspire minds today?</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Online</span>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user?.displayName?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </motion.header>
  );

  const renderHome = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatsCard
          title="Total Students"
          value={students.length}
          icon="👥"
          color="from-blue-500 to-blue-600"
          delay={0.1}
        />
        <StatsCard
          title="Average Rating"
          value={`${(students.reduce((acc, s) => acc + (parseInt(s.rating) || 0), 0) / students.length || 0).toFixed(1)}/5`}
          icon="⭐"
          color="from-yellow-500 to-orange-500"
          delay={0.2}
        />
        <StatsCard
          title="Active Sessions"
          value="12"
          icon="📚"
          color="from-green-500 to-emerald-500"
          delay={0.3}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={0.1 * index}
              onClick={() => setScreen(feature.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderBackButton = () => (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -5 }}
      onClick={() => setScreen("home")}
      className="inline-flex items-center mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white/90 transition-all duration-300 shadow-lg border border-white/20 group"
    >
      <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to Dashboard
    </motion.button>
  );

  const renderScreen = () => {
    if (screen === "home") {
      return renderHome();
    }

    const activeFeature = features.find((f) => f.id === screen);
    if (activeFeature && activeFeature.component) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderBackButton()}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              {activeFeature.component}
            </div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return renderHome();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce-gentle" style={{animationDelay: '4s'}}></div>
      </div>

      {renderNavBar()}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {renderScreen()}
      </main>
    </div>
  );
};

export default Dashboard;