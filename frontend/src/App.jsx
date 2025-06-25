import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./authContext";
import Header from "./components/Header";
function App() {

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <Header/>
     <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    <Toaster/>
  </>
  )
}

export default App;
