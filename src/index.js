import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import App from './components/App';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Services from "./components/services/Services";
import PrivateParties from './components/services/private-parties/privateParties';
import PaintNight from './components/services/paint-night/PaintNight';
import CMS from './components/cms/CMS';
import ServicesIndex from './components/services/ServicesIndex';
import PaintKits from './components/services/paint-kits/PaintKits';
import Home from './components/home/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
  
      <Route path="/" element={<App editingModeOn={false} />}> 
        <Route index element={<Home />}/>
        <Route path="About" element={<About/>} />
        <Route path="Services" element={<Services />}>
          <Route index element={<ServicesIndex />} />
          <Route path="private-paint-parties" element={<PrivateParties/>}/>
          <Route path="paint-night" element={<PaintNight/>}/>
          <Route path="paint-kits" element={<PaintKits/>}/>
        </Route>
        <Route path="Gallery" element={<Gallery />} />
      </Route>

      <Route path="admin" element={<CMS />} >
        <Route index element={<Home />}/>
        <Route path="About" element={<About/>} />
        <Route path="Services" element={<Services />}>
          <Route index element={<ServicesIndex />} />
          <Route path="private-paint-parties" element={<PrivateParties/>}/>
          <Route path="paint-night" element={<PaintNight/>}/>
          <Route path="paint-kits" element={<PaintKits/>}/>
        </Route>
        <Route path="Gallery" element={<Gallery />} />
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
