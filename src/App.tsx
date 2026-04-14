import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/layout/BottomNav";
import TopNav from "@/components/layout/TopNav";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OnboardingLevel from "./pages/OnboardingLevel";
import OnboardingTry from "./pages/OnboardingTry";
import OnboardingGoal from "./pages/OnboardingGoal";
import Dashboard from "./pages/Dashboard";
import StudyLevels from "./pages/StudyLevels";
import FlashcardStudy from "./pages/FlashcardStudy";
import StudyComplete from "./pages/StudyComplete";
import { QuizSetup, QuizPlay, QuizResults } from "./pages/Quiz";
import Vocabulary from "./pages/Vocabulary";
import VocabularyDetail from "./pages/VocabularyDetail";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import WritingPractice from "./pages/WritingPractice";
import LevelComplete from "./pages/LevelComplete";
import StreakMilestone from "./pages/StreakMilestone";
import LearnHub from "./pages/LearnHub";
import PinyinLearn from "./pages/PinyinLearn";
import RadicalsLearn from "./pages/RadicalsLearn";
import GrammarLearn from "./pages/GrammarLearn";
import ScenarioLearn from "./pages/ScenarioLearn";
import HskExam from "./pages/HskExam";
import ListeningPractice from "./pages/ListeningPractice";
import GamesHub from "./pages/GamesHub";
import MemoryGame from "./pages/MemoryGame";
import SpeedQuiz from "./pages/SpeedQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/onboarding/level" element={<OnboardingLevel />} />
          <Route path="/onboarding/try" element={<OnboardingTry />} />
          <Route path="/onboarding/goal" element={<OnboardingGoal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<StudyLevels />} />
          <Route path="/study/flashcard" element={<FlashcardStudy />} />
          <Route path="/study/complete" element={<StudyComplete />} />
          <Route path="/practice/quiz/setup" element={<QuizSetup />} />
          <Route path="/practice/quiz/:id" element={<QuizPlay />} />
          <Route path="/practice/quiz/:id/results" element={<QuizResults />} />
          <Route path="/practice/writing" element={<WritingPractice />} />
          <Route path="/practice/listening" element={<ListeningPractice />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/vocabulary/:id" element={<VocabularyDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/milestone/level-complete" element={<LevelComplete />} />
          <Route path="/milestone/streak" element={<StreakMilestone />} />
          {/* New learning paths */}
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/learn/pinyin" element={<PinyinLearn />} />
          <Route path="/learn/radicals" element={<RadicalsLearn />} />
          <Route path="/learn/grammar" element={<GrammarLearn />} />
          <Route path="/learn/scenarios" element={<ScenarioLearn />} />
          <Route path="/exam/hsk" element={<HskExam />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/speed" element={<SpeedQuiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
