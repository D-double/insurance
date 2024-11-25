import React, { FC, useEffect, useRef } from "react";

interface ITransitionProps {
  showClass: string;
  hide: boolean;
  children: React.ReactNode
  onMouseDown?: ()=>void
}

function Transition<FC>({showClass, hide, children, onMouseDown}: ITransitionProps) {
  const elem = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if(elem.current && hide) {
      elem.current.style.display = 'none'
    } 
  }, []);
  
  useEffect(()=>{
    if(elem.current && hide) {
      elem.current.classList.add(`${showClass}_hide`)
      setTimeout(() => {
        if (elem.current){
          elem.current.style.display = 'none'
        }
      }, 500);
    } 
    else if(elem.current && !hide) {
      elem.current.removeAttribute('style')
      setTimeout(() => {
        if (elem.current){
          elem.current.classList.remove(`${showClass}_hide`)
        }
      }, 100);
    }
  })
  
  return ( 
    <div ref={elem} className={showClass} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}

export default Transition;