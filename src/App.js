import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // * INTERSECTION OBSERVER

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  });
  const [containerRef2, isVisible2] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  });  const [containerRef3, isVisible3] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  });

  return (
    <div className="app">
      <div className="isVisible">
        {isVisible ? "IN VIEWPORT" : "   NOT IN VIEWPORT"}
        {isVisible2 ? "IN VIEWPORT2" : "   NOT IN VIEWPORT2"}
        {isVisible3 ? "IN VIEWPORT3" : "   NOT IN VIEWPORT3"}
      </div>
      <div className="section"></div>
      <div className="box" ref={containerRef}>
        Observe me and see what happens
      </div>
      <div className="box2 box" ref={containerRef2}>
        Observe me and see what happens2
      </div>      <div className="box3 box" ref={containerRef3}>
        Observe me and see what happens3
      </div>
    </div>
  );
}

export default App;

// * INTERSECTION OBSERVER
const useElementOnScreen = options => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = entries => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);
  return [containerRef, isVisible];
};
