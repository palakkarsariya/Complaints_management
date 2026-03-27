import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import MapDashboard from "./Pages/Map/MapDashboard";
import Nav from "./Pages/Nav/Nav";
import { Route, Routes, useLocation } from "react-router-dom";
import UsersPage from "./Pages/Users/UsersPage";
import AdminIssues from "./Pages/Report/AdminIssues";
import EditUser from "./Pages/Edit/EditUser.js";
import DepartmentUsers from "./Pages/department/DepartmentUsers.js";
import Messages from "./Pages/message/Message.js";
import Reviews from "./Pages/Review/Reviews.js";

function App() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/";
  return (
    <div>
    {!hideNavFooter && <Nav />}
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/users" element={<UsersPage/>} />
        <Route path="/depuser" element={<DepartmentUsers/>} />
        <Route path="/report" element={<AdminIssues/>} />
        <Route path="/reviews" element={<Reviews/>}/>
        <Route path="/messages" element={<Messages/>}/>
         <Route path="/edit-user/:id" element={<EditUser/>} />
      </Routes>
    </div>
  );
}

export default App;
