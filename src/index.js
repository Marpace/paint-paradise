import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";


import App from './components/App';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Services from "./components/services/Services";
import PrivateParties from './components/services/private-parties/privateParties';
import CMS from './components/cms/CMS';
import ServicesIndex from './components/services/ServicesIndex';
import PaintKits from './components/services/paint-kits/PaintKits';
import Home from './components/home/Home';
import ProtectedRoutes from './components/cms/ProtectedRoutes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      {/* routes for the actual web page */}
      <Route path="/" element={<App />}> 
        <Route index element={<Home />}/>
        <Route path="About" element={<About/>} />
        <Route path="Services" element={<Services />}>
          <Route index element={<ServicesIndex />} />
          <Route path="private-paint-parties" element={<PrivateParties/>}/>
          <Route path="paint-kits" element={<PaintKits/>}/>
        </Route>
        <Route path="Gallery" element={<Gallery />} />
      </Route>

      {/* routes for the CMS interface */}
      <Route path="admin" element={<CMS />} >
        {/* <Route path="login" element={<CMSLogin />}/> */}
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />}/>
          <Route path="About" element={<About/>} />
          <Route path="Services" element={<Services />}>
            <Route index element={<ServicesIndex />} />
            <Route path="private-paint-parties" element={<PrivateParties/>}/>
            <Route path="paint-kits" element={<PaintKits/>}/>
          </Route>
          <Route path="Gallery" element={<Gallery />} />
        </Route>
      </Route>
      <Route
      path="*"
      element={
        <main>
          <p>There's nothing here!</p>
        </main>
      }
      />
    </Routes>
  </HashRouter>
);
