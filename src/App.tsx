import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import AllCourses from "./pages/AllCourses";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AIFeatures from "./pages/AIFeatures";
import WelcomeLoader from "./components/WelcomeLoader";

// Auth Pages
import Login from "./auth/Login";
import UserRegistration from "./auth/UserRegistration";
import AdminDash from "./admin/AdminDash";

// Admin Pages
// 
{/*
import CreateAssessment from "./admin/CreateAssessment";
import CreateCourse from "./admin/createcourse/CreateCourse";
import EditQuiz from "./admin/assessment/EditQuiz";
import EditUser from "./admin/special-access/EditUser";
import CreateUser from "./admin/special-access/CreateUser";
import SuperLogin from "./admin/special-access/SuperLogin";
import InstitutionMain from "./admin/special-access/InstitutionMain";
import InstitutionCreate from "./admin/special-access/InstitutionCreate";
import InstitutionManage from "./admin/special-access/InstitutionManage";
import InstitutionEdit from "./admin/special-access/InstitutionEdit";
import EditCourse from "./admin/editcourse/EditCourse";
import DisplayCourse from "./admin/editcourse/DisplayCourse";
import UserCrud from "./admin/special-access/UserCrud";
*/}

// AI Server Pages
{/*import AIChatBot from "./admin/ai-server/AIChatBot";
import AIQuizCreator from "./admin/ai-server/AIQuizCreator";
import AICourseCreator from "./admin/ai-server/AICourseCreator";
import TestPage from "./admin/ai-server/testPage";
import ServerTest from "./admin/ai-server/ServerTest";
import AiPdf from "./admin/ai-server/AiPdf";
*/}

// Assessment Pages
import ViewQuizzes from "./admin/assessment/ViewQuizzes";
{/*
import QuizCreator from "./admin/assessment/QuizCreator";
import ViewQuizzes from "./admin/assessment/ViewQuizzes";
import AttemptQuiz from "./admin/assessment/AttemptQuiz";
import ResultPage from "./admin/assessment/ResultPage";
import Certificate from "./admin/courseattempt/certificate/Certificate";*/}
import GenCertificate from "./admin/courseattempt/certificate/GenCertificate";

// Other Pages
import LoadingPopup from "./components/LoadingPopup";
import DSASolver from "./pages/misc-features/DSASolver";
{/*
import CourseAttempt from "./admin/courseattempt/CourseAttempt";
import CourseLoader from "./admin/courseattempt/components/CourseLoader";
import { Course } from "./admin/courseattempt/types/course";*/}
import MiscFeatures from "./pages/misc-features/MiscFeatures";
import CodeArena from "./pages/misc-features/CodeArena";
import Communication from "./pages/misc-features/speech/Communication";
import ChallengeCode from "./pages/misc-features/ChallengeCode";
{/*import FlashCardsView from "./pages/misc-features/FlashcardsView";
import FlashCardsCreate from "./pages/misc-features/FlashcardsCreate";*/}
import FlashCards from "./pages/misc-features/Flashcards";

// --- ADDED FALLBACK PAGE IMPORT ---
import NotFound from "./pages/NotFound"; // Assuming this is the path

// Layout Wrapper Component for Navigation & Footer
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const location = useLocation();
 const currentPath = location.pathname;

 const authPages = ["/login", "/register"];
 const shouldHideLayout = authPages.includes(currentPath);
 const isRegistrationPage = currentPath === "/register";

 return (
  <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
   {!shouldHideLayout && <Navigation />}
   <main className={`${shouldHideLayout ? "" : "w-full min-h-screen"} ${isRegistrationPage ? "registration-page" : ""}`}>
    {children}
   </main>
   {!shouldHideLayout && <Footer />}
  </div>
 );
};

const App = () => {
 const [loading, setLoading] = useState<boolean>(true);
 return (
  <>
  {loading && <WelcomeLoader onAnimationComplete={() => setLoading(false)} />}
   {!loading && (
  <Router>
   <LayoutWrapper>
    <Routes>
     {/* Public Routes */}
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/all-courses" element={<AllCourses />} />
     <Route path="/aifeatures" element={<AIFeatures />} />

     {/* Auth Routes */}
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<UserRegistration />} />
     <Route path="/admin_dashboard" element={<AdminDash />} />

     {/* Admin Routes 
     
     <Route path="/create-assessment" element={<CreateAssessment />} />
     <Route path="/create-course" element={<CreateCourse />} />
     <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
     <Route path="/admin/edit-user/:userId" element={<EditUser />} />
     <Route path="/create-user" element={<CreateUser />} />
     <Route path="/admin-login" element={<SuperLogin />} />
     <Route path="/admin/institution" element={<InstitutionMain />} />
     <Route path="/admin/institution/create" element={<InstitutionCreate />} />
     <Route path="/admin/institution/manage" element={<InstitutionManage />} />
     <Route path="/admin/institution-edit/:institutionId" element={<InstitutionEdit />} />
     <Route path="/edit-course/:courseId" element={<EditCourse />} />
     <Route path="/display-course" element={<DisplayCourse />} />
     <Route path="/user-crud" element={<UserCrud />} />
     */}
     
     {/* AI Server Routes 
     <Route path="/ai-chatbot" element={<AIChatBot />} />
     <Route path="/ai-quiz-creator" element={<AIQuizCreator />} />
     <Route path="/ai-pdf" element={<AiPdf />} />
     <Route path="/ai-course-creator" element={<AICourseCreator />} />
     <Route path="/test-page" element={<TestPage />} />
     <Route path="/server-test" element={<ServerTest />} />
     */}
     
     {/* Assessment Routes */}
     <Route path="/view-quizzes" element={<ViewQuizzes />} />
     {/*}
     <Route path="/create-quiz" element={<QuizCreator />} />
     <Route path="/view-quizzes" element={<ViewQuizzes />} />
     <Route path="/quiz/:quizId" element={<AttemptQuiz />} />
     <Route path="/quiz/result/:quizId" element={<ResultPage />} />
     <Route path="/certificate" element={<Certificate />} />*/}
-     <Route path="/admin/generate-certificate" element={<GenCertificate />} />
     
     {/* Course Attempt Routes */}
     
     {/* Course Routes 
     <Route
      path="/course/:courseId"
      element={
       <CourseLoader>
        {(course: Course, id: string) => <CourseAttempt courseData={course} courseId={id} />}
       </CourseLoader>
      }
     />*/}
     
     {/* Misc Routes */}
     <Route path="/loading" element={<LoadingPopup />} />
     <Route path="/misc-features" element={<MiscFeatures />} />
     {/* Test Routes */}
     <Route path="/misc/code-arena" element={<CodeArena />} />
     <Route path="/misc/flashcards" element={<FlashCards />} />
     {/*<Route path="/misc/flashcards/create" element={<FlashCardsCreate />} />
     <Route path="/misc/flashcards/view/:flashcardId" element={<FlashCardsView />} />*/}
     <Route path="/misc/communicate" element={<Communication />} />
     <Route path="/misc/dsa-solver" element={<DSASolver />} />
     <Route path="/misc/challenge-code" element={<ChallengeCode />} />

     {/* --- ADDED CATCH-ALL ROUTE --- */}
     <Route path="*" element={<NotFound />} />

    </Routes>
   </LayoutWrapper>
  </Router>
   )}
  </>
 );
};

export default App;
