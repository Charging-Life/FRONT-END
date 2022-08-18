import { useState, useEffect, useRef } from 'react';

// 인자 : callback함수, 반복 주기
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback; 
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(); 
    }
    if (delay !== null) { 
      let id = setInterval(tick, delay);
      return () => clearInterval(id); 
    }
  }, [delay]);
}

export default useInterval;