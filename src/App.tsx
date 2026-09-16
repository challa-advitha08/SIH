import React, { useState } from 'react';
import { Header } from './components/Header';
import { HelpModal } from './components/HelpModal';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { DistrictDetail } from './components/DistrictDetail';
import { CourseDetail } from './components/CourseDetail';
import { EmergingSkills } from './components/EmergingSkills';
import { EmployerPortal } from './components/EmployerPortal';
import { EmployerConfirmation } from './components/EmployerConfirmation';
import { EmployerResponses } from './components/EmployerResponses';
import { PythonProjectModal } from './components/PythonProjectModal';
import { JobSubmission, Language, PageId, Role } from './types';
import { INITIAL_JOBS } from './data/mockDb';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Pune');
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('en');
  const [currentRole, setCurrentRole] = useState<Role>('admin');

  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);

  // Persistent employer submissions state
  const [responses, setResponses] = useState<JobSubmission[]>(INITIAL_JOBS);

  const handleSelectDistrict = (districtName: string) => {
    setSelectedDistrict(districtName);
    setCurrentPage('district');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (courseId: number) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobSubmit = (newJob: Omit<JobSubmission, 'id' | 'created_at'>) => {
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const createdJob: JobSubmission = {
      ...newJob,
      id: responses.length + 1,
      created_at: formattedDate,
    };
    setResponses([createdJob, ...responses]);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Universal Top Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        language={language}
        setLanguage={setLanguage}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            language={language}
            onSetRole={setCurrentRole}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            language={language}
            onSetRole={setCurrentRole}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'dashboard' && (
          <AdminDashboard
            onSelectDistrict={handleSelectDistrict}
            onNavigate={handleNavigate}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'district' && (
          <DistrictDetail
            districtName={selectedDistrict}
            onSelectCourse={handleSelectCourse}
            onBackToDashboard={() => handleNavigate('dashboard')}
            onNavigate={handleNavigate}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'course' && (
          <CourseDetail
            courseId={selectedCourseId}
            onBackToDistrict={() => handleNavigate('district')}
            onNavigate={handleNavigate}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'skills' && (
          <EmergingSkills
            onNavigate={handleNavigate}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'employer' && (
          <EmployerPortal
            onSubmitJob={handleJobSubmit}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentPage === 'confirmation' && (
          <EmployerConfirmation
            onNavigate={handleNavigate}
            language={language}
          />
        )}

        {currentPage === 'responses' && (
          <EmployerResponses
            responses={responses}
            language={language}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}
      </main>

      {/* Low-Literacy Audio/Visual Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        currentPage={currentPage}
        language={language}
      />

      {/* SIH Python Flask & SQLite Project Code Inspector Modal */}
      <PythonProjectModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />
    </div>
  );
}
