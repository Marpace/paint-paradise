import { useEffect, useState, useRef } from "react"
import Image from "../Image"

function Grid(props) {

    // function handleClick(e){
    //   props.toggleModal(e.target.src.split("3000")[1])
    // }

    const [columnOneImages, setColumnOneImages] = useState([])
    const [columnTwoImages, setColumnTwoImages] = useState([])
    const [columnThreeImages, setColumnThreeImages] = useState([])
    const twoColumnWidth = window.screen.width <= 991 ? true : false;

    useEffect(()=> {
        setImageArrays();
    }, [props.images])

    function setImageArrays(){
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let size1 = 4;
        let size2 = 3;
        let size3 = 5;
        let index = 0

        if(twoColumnWidth) {
            props.images.forEach( image => {
                if(arr1.length < arr2.length) {
                    arr1.push({image: image, size: `size-${size1}`})
                    size1 === 5 ? size1 = 1 : size1++
                } else {
                    arr2.push({image: image, size: `size-${size2}`})
                    size2 === 5 ? size2 = 1 : size2++
                }
            })
        } else {
            props.images.forEach( image => {
                if(index === 0) {
                    arr1.push({image: image, size: `size-${size1}`})
                    size1 === 5 ? size1 = 1 : size1++;
                } else if(index === 1) {
                    arr2.push({image: image, size: `size-${size2}`})
                    size2 === 5 ? size2 = 1 : size2++;
                } else {
                    arr3.push({image: image, size: `size-${size3}`})
                    size3 === 5 ? size3 = 1 : size3++;
                }
                index === 2 ? index = 0 : index++
            })
        }
        setColumnOneImages(arr1)
        setColumnTwoImages(arr2)
        setColumnThreeImages(arr3)
    }

    if(twoColumnWidth) {
        return (
            <section className="grid">
                <div className="column">
                    {columnOneImages.map(item => (
                        <Image 
                            key={item.image._id}
                            image={item.image}
                            className={item.size + " gallery-image"}
                            toggleModal={props.toggleModal}
                        />
                    ))}
                </div>
                <div className="column">
                    {columnTwoImages.map(item => (
                        <Image 
                            key={item.image._id}
                            image={item.image}
                            className={item.size + " gallery-image"}
                            toggleModal={props.toggleModal}
                        />
                    ))}
                </div>
            </section>
        )
    } else {
        return (
            <section className="grid">
                <div className="column">
                    {columnOneImages.map(item => (
                        <Image 
                            key={item.image._id}
                            image={item.image}
                            className={item.size + " gallery-image"}
                            toggleModal={props.toggleModal}
                        />
                    ))}
                </div>
                <div className="column">
                {columnTwoImages.map(item => (
                        <Image 
                            key={item.image._id}
                            image={item.image}
                            className={item.size + " gallery-image"}
                            toggleModal={props.toggleModal}
                        />
                    ))}
                </div>
                <div className="column">
                {columnThreeImages.map(item => (
                        <Image 
                            key={item.image._id}
                            image={item.image}
                            className={item.size + " gallery-image"}
                            toggleModal={props.toggleModal}
                        />
                    ))}
                </div>
            </section>
          )
    }
}

export default Grid;
