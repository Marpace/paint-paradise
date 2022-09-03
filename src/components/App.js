import Navbar from "./navigation/Navbar"
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import React from "react"


const baseUrl = {
  baseUrl: "http://localhost:8080"
}
export const UrlContext = React.createContext(baseUrl);

function App() {


  return (
    <UrlContext.Provider value={baseUrl}>
      <main className="app">
        <Navbar/>
        <Outlet />
        <Footer/>
      </main>
    </UrlContext.Provider>
  );
}

export default App;
