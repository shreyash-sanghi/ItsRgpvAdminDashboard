import React, { useEffect, useState, createContext } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Sidebar from "./containers/LeftsideBar";
import routes from './routes/index';
import Header from './containers/Header';
const UserContext = createContext();

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sectionName, setSectionName] = useState(""); // 👈 section name state

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ sectionName, setSectionName }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Routes>
                {routes.map((info, index) => (
                  <Route
                    key={index}
                    path={info.path}
                    element={<info.component />}
                  />
                ))}
              </Routes>
            </div>
          </main>
        </div>
      </div>
      
      <ToastContainer />
    </UserContext.Provider>
    
  );
}
export {UserContext}
export default App;