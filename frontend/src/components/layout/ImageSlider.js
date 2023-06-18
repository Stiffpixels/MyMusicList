import {useState, useEffect, useRef, useCallback} from 'react'

const sliderStyles ={
  height:"100%",
  display:"flex",
}

const sliderOverflow = {
  position:'relative',
  overflow:'hidden',
  width:"100%",
}

const baseArrow = {
  position:"absolute",
  top:"0",
  left:"0",
  right:"0",
  bottom:"0",
  fontSize:"3rem",
  color:"rgba(255,255,255,1)",
  zIndex:"1",
}

const slideStyles = {
  height:"100%"
  
}

const rightArrow = {
  ...baseArrow,
  left:"87%"
}

const leftArrow = {
  ...baseArrow,
  right:"87%"
}

const slideDots ={
  position:"absolute",
  display:"flex",
  top:"83%",
  left:"45%",
  right:"0",
  bottom:"0",
  zIndex:"2",
  fontSize:"2rem",
  color:"white",
  gap:"8px",
  
}

const Slider = ({slides})=>{
  const ref = useRef(null)
  const timerRef = useRef(null)
  let parentWidth;
  
  const [ currentIndex, setIndex ]=useState(0)
  
  const getStylesForSlides = (slideIndex)=>({
  ...slideStyles,
  background: `url(${slides[slideIndex].url})`,
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
  backgroundSize:"cover"
  })
 
 const goNextSlide = useCallback(()=>{
   const isLastSlide = currentIndex === slides.length-1;
   isLastSlide? setIndex(0) : setIndex(currentIndex+1)
 }, [])
 
 const goPreviousSlide = ()=>{
   const isFirstSlide = currentIndex === 0;
   isFirstSlide? setIndex(slides.length-1) : setIndex(currentIndex-1)
 }
 
 const goToSlide= (slideIndex)=>{
   setIndex(slideIndex)
 }
 
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goNextSlide();
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [goNextSlide, goPreviousSlide, goToSlide]);
 
 useEffect(() => {
    const parentElem = document.querySelector('.sliderOverflow')
    parentWidth = parentElem.offsetWidth;
    
    ref.current.style.width = `${parentWidth*slides.length}px`
    ref.current.style.transform =`translateX(-${currentIndex*parentWidth}px)`
    
    const slideList = ref.current.children[0].childNodes
    slideList.forEach((slide)=>{
      slide.style.width = `${parentWidth}px`
    })
  },[ref.current, goNextSlide, goPreviousSlide]);

  return <>
  <div style={sliderOverflow} className="sliderOverflow">
   <div style={{height:"100%", transition: "transform ease-out 500ms"}} ref={ref}>
    <div style={sliderStyles}>
     {
       slides.map((_, slideIndex)=>(
       <div key={slideIndex} style={getStylesForSlides(slideIndex)}></div>
       ))
     }
    </div>
    </div>
    <div style={slideDots}>
   {slides.map((_, slideIndex)=>{
     return <button key={slideIndex} onClick={()=>goToSlide(slideIndex)}>•</button>
   })}
   
   </div>
   <button style={rightArrow} onClick={goNextSlide}>❱</button>
   <button style={leftArrow} onClick={goPreviousSlide}>❰</button>
   
   </div>
  </>
}

export default Slider;