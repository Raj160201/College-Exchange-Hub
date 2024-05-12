import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./assets/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavMenu from "./components/NavMenu";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/RegLogin/Register";
import Login from "./components/RegLogin/Login";
import ScrollTop from "./components/ScrollTop";
import FooterComp from "./components/Footer/FooterComp";
import FaqBuyer from "./components/FAQ/FaqBuyer";
import FaqSeller from "./components/FAQ/FaqSeller";
import ContactUs from "./components/Contact/ContactUs";
import Account from "./components/Users/Account";
import Error from "./components/Error";
import { AuthContext } from "./components/Context/AuthContext";
import OrderHistory from "./components/Order/OrderHistory";
import PasswordReset from "./components/RegLogin/PasswordReset";
import PrivacyPolicy from "./components/PolicyPages/PrivacyPolicy";
import TermsConditions from "./components/PolicyPages/TermsConditions";
import CancellationRefund from "./components/PolicyPages/CancellationRefund";
import DeliveryPolicy from "./components/PolicyPages/DeliveryPolicy";
import DeleteAccount from "./components/DeleteAccount";
import SellProduct from "./components/Order/SellProduct";
import RequestRent from "./components/Order/RequestRent";
import RentHistory from "./components/Order/RentHistory";
import RentProducts from "./components/Products/RentProducts";
import BuyProducts from "./components/Products/BuyProducts";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Router>
        <ScrollTop />
        <NavMenu />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/passwordReset" element={<PasswordReset />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/myads" element={<OrderHistory />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/faqBuyer" element={<FaqBuyer />} />
          <Route exact path="/faqSeller" element={<FaqSeller />} />
          <Route exact path="/deleteAccount" element={<DeleteAccount />} />
          <Route exact path="/cancellation&Refund" element={<CancellationRefund />} />
          <Route exact path="/deliveryPolicy" element={<DeliveryPolicy />} />
          <Route exact path="/terms&Conditions" element={<TermsConditions />} />
          <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/sell" element={<SellProduct />} />
          <Route exact path="/rentHistory" element={<RentHistory />} />
          <Route exact path="/rentProducts" element={<RentProducts />} />
          <Route exact path="/buyProducts" element={<BuyProducts />} />
          <Route exact path="/requestForRent" element={<RequestRent />} />
          <Route exact path="/error" element={<Error />} />
        </Routes>
        <FooterComp />
      </Router>
    </>
  );
}

export default App;
