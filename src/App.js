import React, { useRef, useState } from 'react';
import './App.css';
import MainCanvas from './MainCanvas';
import { ImageLoader } from './ImageLoader';

function App() {
  const [completedCrop, setCompletedCrop] = useState()
  const [completedCroping, setCompletedCroping] = useState(false) 
  const [imgRef, setImgRef] = useState({})

  return (
    <div className="App">
      {!completedCroping && <ImageLoader completedCrop={completedCrop} setCompletedCrop={setCompletedCrop} setCompletedCroping={setCompletedCroping} setImgRef={setImgRef}/>}
      {completedCroping && <MainCanvas image={imgRef} crop={completedCrop} width={'500px'} height={'500px'} />}
    </div>
  );
}

export default App;
