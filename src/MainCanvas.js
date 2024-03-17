import React, { useEffect, useRef } from 'react';
import {print, printSin} from './Generator';
import 'react-image-crop/dist/ReactCrop.css'

let dots = []

const MainCanvas = ({image, crop, width, height}) => {
    const canvasRef = useRef(null)

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

    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d')
      const cropX = crop.x
      const cropY = crop.y
      const centerX = image.naturalWidth / 2
      const centerY = image.naturalHeight / 2
      ctx.save()
      ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
  // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    )
    ctx.restore()
    dots = convertToGrayScales(ctx, 500, 500)
    }, [crop]);

    return(
    <>
      <canvas ref={canvasRef} id="main" width={width} height={height}>x</canvas>
      <p>
        <input type="button" value="спираль" onClick={()=>{console.log(canvasRef)
            print(canvasRef, dots)}}/>
        <input type="button" value="Sin" onClick={()=>{console.log(canvasRef)
            printSin(canvasRef)}}/>
      </p>
    </>
    )
  }

  export default MainCanvas