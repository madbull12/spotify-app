import React, { useState,useCallback,useRef } from 'react'

const useHover = () => {
    const [isHovering, setIsHovering] = useState(false);
  
    const handleMouseOver = useCallback(() => setIsHovering(true), []);
    const handleMouseOut = useCallback(() => setIsHovering(false), []);
  
    const nodeRef = useRef<HTMLDivElement | null | undefined>(null);
  
    const callbackRef = useCallback(
      (node:HTMLDivElement) => {
        if (nodeRef.current) {
          nodeRef.current.removeEventListener('mouseover', handleMouseOver);
          nodeRef.current.removeEventListener('mouseout', handleMouseOut);
        }
  
        nodeRef.current = node;
  
        if (nodeRef.current) {
          nodeRef.current.addEventListener('mouseover', handleMouseOver);
          nodeRef.current.addEventListener('mouseout', handleMouseOut);
        }
      },
      [handleMouseOver, handleMouseOut]
    );
  
    return [callbackRef, isHovering];
  };

  export default useHover;