function Grid(props) {

function handleClick(e){
  props.toggleModal(e.target.src.split("3000")[1])

  console.log(e.target.src.split("3000")[1])
}

  return (
    <section className="gallery">
        <div className="gallery-grid">
            <div className="column">               
                <img onClick={handleClick} className="column-item gallery-xl" src="/images/gallery/gallery-img-portrait_(1).jpg" alt=""></img>                 
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(1).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-m" src="/images/gallery/gallery-img-m_(1).jpg" alt=""></img>                
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(2).jpg" alt=""></img>
            </div>
            <div className="column">              
                <img onClick={handleClick} className="column-item gallery-l" src="/images/gallery/gallery-img-portrait_(2).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-s" src="/images/gallery/gallery-img-s_(1).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-m" src="/images/gallery/gallery-img-m_(2).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-s" src="/images/gallery/gallery-img-s_(2).jpg" alt=""></img>
            </div>
            <div className="column">           
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(3).jpg" alt=""></img>           
                <img onClick={handleClick} className="column-item gallery-xl" src="/images/gallery/gallery-img-portrait_(3).jpg" alt=""></img>           
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(4).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-m" src="/images/gallery/gallery-img-m_(3).jpg" alt=""></img>
            </div>
            <div className="column">          
                <img onClick={handleClick} className="column-item gallery-l" src="/images/gallery/gallery-img-portrait_(4).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-s" src="/images/gallery/gallery-img-s_(3).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-m" src="/images/gallery/gallery-img-m_(4).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-s" src="/images/gallery/gallery-img-s_(4).jpg" alt=""></img>
            </div>
            <div className="column">          
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(5).jpg" alt=""></img>            
                <img onClick={handleClick} className="column-item gallery-l" src="/images/gallery/gallery-img-portrait_(5).jpg" alt=""></img>           
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(6).jpg" alt=""></img>          
                <img onClick={handleClick} className="column-item gallery-l" src="/images/gallery/gallery-img-portrait_(6).jpg" alt=""></img>
            </div>
            <div className="column">      
                <img onClick={handleClick} className="column-item gallery-xl" src="/images/gallery/gallery-img-portrait_(7).jpg" alt=""></img>      
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(7).jpg" alt=""></img>
                <img onClick={handleClick} className="column-item gallery-m" src="/images/gallery/gallery-img-m_(5).jpg" alt=""></img>    
                <img onClick={handleClick} className="column-item gallery-xs" src="/images/gallery/gallery-img-xs_(8).jpg" alt=""></img>
            </div>
        </div>
    </section>
  )
}

export default Grid;