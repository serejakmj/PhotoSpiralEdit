import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {

  const canvasRef = useRef(null)

  const sinX = (x) => Math.sin(x)
  const cosX = (x) => Math.cos(x)
  const dots = [3, 17, 33, 45, 58, 77, 95, 122, 300, 450]

  const print = () => {
    const ctx = canvasRef.current.getContext('2d')
    
    const a = 5
    const b = 3
    let prevX = 250
    let prevY = 250
    //const step = 30
    for(var t = 1; t<83; t=t+0.1){
      ctx.beginPath();
      ctx.moveTo(prevX,prevY)
      let x = 250+cosX(t)*(a+b*t)
      let y = 250+sinX(t)*(a+b*t)
      prevX = x
      prevY = y
      if (dots.includes(Math.trunc(x))){
        ctx.lineWidth = 5
        console.log(x)
      }
      else {ctx.lineWidth = 1}
      //console.log(t)
      if(y < ctx.canvas.height) {
        console.log(ctx.lineWidth)
        ctx.lineTo(x,y)
      }
      ctx.stroke()
    }
    
    
  } 

  const MainCanvas = ({width, height}) => {
    useEffect(() => {
      print()
    });

    return(
      <canvas ref={canvasRef} id="tutorial" width={width} height={height}>x</canvas>
    )
  }
  return (
    <div className="App">
      <MainCanvas width={'500px'} height={'500px'} />
    </div>
  );
}

export default App;
