import React from 'react'
import './App.css';

import 'gridstack/dist/gridstack.css'

// uncomment this and comment out gridstack-v5 import to test different versions
import { GridStack } from "gridstack";

// v5
// import { GridStack } from "gridstack-v5";
// import 'gridstack-v5/dist/h5/gridstack-dd-native'

import {useEffect, useRef} from "react";

const GridStackItem = React.forwardRef(({children}, ref) => {
  return (
    <div className="grid-stack-item" ref={ref}>
      <div className="grid-stack-item-content">
        {children}
      </div>
    </div>
  )
})

function App() {
  const gridStackRef = useRef()
  const itemRef = useRef()
  const hoverRef = useRef()
  useEffect(() => {
    // If you register the mouse event this awy it works, but generally this is
    // not as convenient in react, especially when you're wrapping elements and using
    // React.cloneElement. I'm not sure if there would be an ez solution to this,
    // though. So prob will have to register the old fashioned way.
    hoverRef.current.addEventListener('mouseenter', () => {
      // this is being called twice, though
      console.log('mouseenter - addEventListener. this is called twice, though')
    })
    gridStackRef.current = gridStackRef.current?.el
      ? gridStackRef.current
      : // the app-dashboard class has also been added to this to ensure that if
        // gridstack is used in multiple places across the app at the same time
        // that they will not conflict (e.g., some modal over the dashboard)
      GridStack.init()
    const grid = gridStackRef.current
    grid.batchUpdate()
    grid.removeAll()
    grid.addWidget(itemRef.current)
    grid.commit()
  }, [])
  return (
    <div className="App">
      <div className="grid-stack">
        <GridStackItem ref={itemRef}>
          <div ref={hoverRef} style={{height: 100, width: 100, background: "greenyellow"}} onMouseEnter={() => {
            console.log("mouseenter - react")
          }}>Hover me. In v5 console prints HEYYY. In v6 nothing.</div>
        </GridStackItem>
      </div>
    </div>
  );
}

export default App;
