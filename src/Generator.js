const sinX = (x) => Math.sin(x)
const cosX = (x) => Math.cos(x)

// const checkDotInArray = (dots, dot) => {
//     let a = dots.filter(i=>JSON.stringify(i) === JSON.stringify(dot))
//     return false || a.length > 0
//   }

  const print = (canvasRef, imageData) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = "#ff0000"
    const createLine = (prevY, prevX, x, y, lineWidth) => {
      ctx.beginPath();
      ctx.moveTo(prevX,prevY)
      ctx.lineWidth = lineWidth
      ctx.lineTo(x,y)
      ctx.stroke()
      return [x, y]
    }    
    const a = 1
    const b = 1
    let prevX = 250
    let prevY = 250
    //const step = 30
    ctx.clearRect(0,0,500,500);
    for(var t = 1; t<250; t=t+0.01){
      let x = 250+cosX(t)*(a+b*t)
      let y = 250+sinX(t)*(a+b*t)
      let index = Math.trunc(y) * 500 + Math.trunc(x)
      //console.log(t)
      if(y < ctx.canvas.height) {
        const ass = Math.trunc(imageData[index])
        const width = 5.5 - ass/51;
        //console.log(`${width} --- ${ass}`)
        [prevX, prevY] = createLine(prevY, prevX, x, y, width)
      }
    }
  }

  export default print