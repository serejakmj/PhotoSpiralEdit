import React, { useRef, useState } from "react"
import ReactCrop, {
  //centerCrop,
  //makeAspectCrop,
  //Crop,
  //PixelCrop,
  //convertToPixelCrop,
} from 'react-image-crop'

export const ImageLoader = ({setCompletedCrop, setImgRef, setCompletedCroping}) => {
  const [imageSrc, setImageSrc] = useState('')
  const [crop, setCrop] = useState()
  const [showOK, setShowOk] =useState(false)
  const imgRef = useRef()
  
    const changeFn = (e) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
          setImageSrc(event.target.result || '')
      }
      reader.readAsDataURL(file)
  }

  return(
    <div className="image-loader">
    <input type="file" name="picture" onChange={changeFn}/>
    {!!imageSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => {setCompletedCrop(c)
                      setShowOk(true)}}
          aspect={1}
          minWidth={500}
          maxWidth={500}
          maxHeight={500}
          minHeight={500}
          // circularCrop
        >
            <img
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
          />
        </ReactCrop>)}

        {showOK && <input type="button" value="OK" onClick={()=>{
          setImgRef(imgRef.current)
          setCompletedCroping(true)}}/>}
    </div>
  )
}