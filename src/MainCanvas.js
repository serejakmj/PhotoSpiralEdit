import React, { useEffect, useRef } from 'react';
import print from './Generator';

let dots = []

const MainCanvas = ({width, height}) => {
    const canvasRef = useRef(null)
    const inputRef = useRef(null)

    const toGrayScale = (r,g,b) => 0.21 * r + 0.72 * g + 0.07 * b;

    const convertToGrayScales = (ctx, width, height) => {
        const imageData = ctx.getImageData(0,0,width,height)

        const grayScales = []

        for (let i = 0; i < imageData.data.length; i+=4){
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            const grayScale = toGrayScale(r, g, b);
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

            grayScales.push(grayScale);
        }

        ctx.putImageData(imageData, 0, 0);

        return grayScales
    }


    const changeFn = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = (event) => {
            const image = new Image()
            const ctx = canvasRef.current.getContext('2d')
            image.onload = () => {
                ctx.drawImage(image, 0, 0)
                dots = convertToGrayScales(ctx, 500, 500)
            }
            image.src = event.target.result
        }
        reader.readAsDataURL(file)
    }
    useEffect(() => {
      //print(canvasRef, dots)
    });
    return(
    <>
      <canvas ref={canvasRef} id="main" width={width} height={height}>x</canvas>
      <p>
        <input ref={inputRef} type="file" name="picture" onChange={changeFn}/>
        <input type="button" value="спираль" onClick={()=>{console.log(canvasRef)
            print(canvasRef, dots)}}/>
      </p>
    </>
    )
  }

  export default MainCanvas