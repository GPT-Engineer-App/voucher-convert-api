import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import BankRepresentativePortal from "./pages/BankRepresentativePortal.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import VoucherConversion from "./pages/VoucherConversion.jsx";
import BankAPIIntegration from "./pages/BankAPIIntegration.jsx";
import Navbar from "./components/Navbar.jsx";
import AuditLogs from "./pages/AuditLogs.jsx";
import AutomaticUpdates from "./pages/AutomaticUpdates.jsx";
import BankPartnersManagement from "./pages/BankPartnersManagement.jsx";
import RealTimeConversionRates from "./pages/RealTimeConversionRates.jsx";
import CustomerSupport from "./pages/CustomerSupport.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/user-dashboard" element={<UserDashboard />} />
        <Route exact path="/bank-portal" element={<BankRepresentativePortal />} />
        <Route exact path="/transaction-history" element={<TransactionHistory />} />
        <Route exact path="/convert-voucher" element={<VoucherConversion />} />
        <Route exact path="/validate-voucher" element={<BankAPIIntegration />} />
        <Route exact path="/bank-partners-management" element={<BankPartnersManagement />} />
        <Route exact path="/real-time-conversion-rates" element={<RealTimeConversionRates />} />
        <Route exact path="/audit-logs" element={<AuditLogs />} />
        <Route exact path="/automatic-updates" element={<AutomaticUpdates />} />
        <Route exact path="/customer-support" element={<CustomerSupport />} />
      </Routes>
    </Router>
  );
}

export default App;