import { useEffect, useState } from "react";

function SitePath() {
  
  const location = window.location.href
  const path = location.substring(location.indexOf("Services")).replaceAll("/", " > ").replaceAll("-", " ")

  if(path) {
    return (
      <div className="site-path">
        <p className="site-path__text">{path}</p>
      </div>
    )
  }
}

export default SitePath;