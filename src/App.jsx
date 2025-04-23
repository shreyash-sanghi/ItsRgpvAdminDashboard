import React, { useEffect ,useState} from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Sidebar from "./containers/LeftsideBar"
// Import route config
import routes from './routes/index';
import Header from './containers/Header';

function App() {

  const location = useLocation();
const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
  
       <div className="flex h-screen overflow-hidden">

{/* Sidebar */}
<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

{/* Content area */}
<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

  {/*  Site header */}
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
    </>
  );
}

export default App;
