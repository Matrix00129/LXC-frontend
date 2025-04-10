import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignUp from "src/pages/SignUp";
import SignUpIndividual from "src/pages/SignUpIndividual";
import SignUpCompany from "src/pages/SignUpCompany";
import SignIn from "src/pages/signin";
import ForgotPassword from "src/pages/ForgotPassword";
import NotFound from "src/pages/NotFound";
import LandingPage from "src/pages/LandingPage";
import AboutUs from "src/pages/AboutUs";
import ContactUs from "src/pages/ContactUs";
import ContactUsTwo from "./pages/ContactUsTwo";
import Faq from "src/pages/Faq";
import UserDashboard from "src/pages/UserDashboard";
import SuperAdminLayout from "src/components/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "src/pages/SuperAdminDashboard";
import UserLayout from "src/components/user/UserLayout";
import UserSettings from "src/components/user/settings/UserSettings";
import Users from "src/components/super-admin/users/Users";
import ActivitiesLogs from "src/components/super-admin/activities-logs/ActivitiesLogs";
import FlaggedCasesHome from "./components/super-admin/flagged-cases/FlaggedCasesHome";
import DataReports from "src/components/super-admin/data-reports/DataReports";
import AdminSettings from "src/components/super-admin/settings/AdminSettings";
import ManageCases from "src/components/super-admin/manage-cases/ManageCases";
import RegistrarManageCases from "src/components/court-registrar/manage-cases/ManageCases";
import RegistrarFlaggedCasesHome from "./components/court-registrar/flagged-cases/FlaggedCasesHome";
import RegistrarActivitiesLogs from "./components/court-registrar/activities-logs/ActivitiesLogs";
import RegistrarSettings from "src/components/court-registrar/settings/RegistrarSettings";
import SearchPage from "src/pages/SearchPage";
import BlurredSearch from "src/pages/BlurredSearch";
import CourtRegistrarLayout from "src/components/court-registrar/CourtRegistrarLayout";
import CourtRegistrarDashboard from "src/pages/CourtRegistrarDashboard";
import PrivateRoutes from "./components/requireAuth/PrivateRoutes";
import MoreCases from "./components/court-registrar/dashboard/MoreCases";
import MoreRecent from "./components/super-admin/dashboard/MoreRecent";
import MoreActivityLogs from "./components/super-admin/activities-logs/MoreActivityLogs";
import UserSearchHistory from "src/components/user/search-history/UserSearchHistory";

function App() {
  const location = useLocation();
  return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-individual" element={<SignUpIndividual />} />
          <Route path="/signup-company" element={<SignUpCompany />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact-uss" element={<ContactUs />} />
          <Route path="/contact-us" element={<ContactUsTwo />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/blurred-search" element={<BlurredSearch />} />

          {/* ========= User Route ======= */}
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<UserLayout />}>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path="search-history" element={<UserSearchHistory />} />
            </Route>
          </Route>

          {/* ==========Super Admin Route ======= */}
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<SuperAdminLayout />}>
              <Route path="/admin" element={<SuperAdminDashboard />} />
              <Route path="more-recent" element={<MoreRecent />} />
              <Route path="manage-cases" element={<ManageCases />} />
              <Route path="users" element={<Users />} />
              <Route path="activities-logs" element={<ActivitiesLogs />} />
              <Route
                path="activities-logs/more-log"
                element={<MoreActivityLogs />}
              />
              <Route path="flagged-cases" element={<FlaggedCasesHome />} />
              <Route path="data-reports" element={<DataReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* ========== Court Registrar Route ======= */}
          <Route element={<PrivateRoutes />}>
            <Route path="/court-registrar" element={<CourtRegistrarLayout />}>
              <Route
                path="/court-registrar"
                element={<CourtRegistrarDashboard />}
              />
              <Route path="more-cases" element={<MoreCases />} />
              <Route
                path="activity-logs"
                element={<RegistrarActivitiesLogs />}
              />
              <Route path="manage-cases" element={<RegistrarManageCases />} />
              <Route
                path="flagged-cases"
                element={<RegistrarFlaggedCasesHome />}
              />
              <Route path="settings" element={<RegistrarSettings />} />
            </Route>
          </Route>

          {/* =========== NotFound Route (Catch all) ========== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
  );
}

export default App;
