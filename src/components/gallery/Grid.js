import { useEffect, useState, useRef } from "react"
import Image from "../Image"

function Grid(props) {

// function handleClick(e){
//   props.toggleModal(e.target.src.split("3000")[1])
// }

const [columnOneImages, setColumnOneImages] = useState([])
const [columnTwoImages, setColumnTwoImages] = useState([])
const column1 = useRef(null)

useEffect(()=> {
    console.log(props.images)
    setImageArrays();
}, [])

function setImageArrays(){
    let arr1 = []
    let arr2 = []
    props.images.forEach( image => {
        if(arr1.length < arr2.length) {
            arr1.push(image)
        } else {
            arr2.push(image)
        }
        console.log(getComputedStyle(column1.current).height)
    })
    setColumnOneImages(arr1)
    setColumnTwoImages(arr2)
}


  return (
    <section className="grid">
        <div ref={column1} className="column">
            {columnOneImages.map(image => (
                <Image 
                    key={image._id}
                    image={image}
                    className=""
                />
            ))}
        </div>
        <div className="column">
        {columnTwoImages.map(image => (
                <Image 
                    key={image._id}
                    image={image}
                    className=""
                />
            ))}
        </div>
    </section>
  )
}

export default Grid;