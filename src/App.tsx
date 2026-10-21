import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { QuestionList } from './components/QuestionList';
import { ProjectHub } from './components/ProjectHub';
import { LeaderboardView } from './components/LeaderboardView';
import { StudyRoomsView } from './components/StudyRoomsView';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import { AskQuestionModal } from './components/AskQuestionModal';
import { PitchIdeaModal } from './components/PitchIdeaModal';
import { ProfileModal } from './components/ProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 pb-20 lg:pb-12">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 flex gap-6">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Center Stage */}
        <section className="flex-1 min-w-0">
          {activeTab === 'qna' && <QuestionList />}
          {activeTab === 'ideas' && <ProjectHub />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'study_rooms' && <StudyRoomsView />}
        </section>
      </main>

      {/* Modals & Overlays */}
      <QuestionDetailModal />
      <AskQuestionModal />
      <PitchIdeaModal />
      <ProfileModal />
      
      {/* Mobile Navigation */}
      <MobileBottomNav />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
