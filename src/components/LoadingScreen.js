function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__icon">
        <img className="palette-icon" src="./images/loading_palette.png"></img>
        <div className="paint-circle"></div>
        <div className="paint-circle"></div>
        <div className="paint-circle"></div>
        <div className="paint-circle"></div>
      </div>
    </div>
  )
}


export default LoadingScreen;