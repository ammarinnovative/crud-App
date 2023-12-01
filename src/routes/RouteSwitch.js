import React, { useEffect, useState } from "react"
import { Routes as Switch, useLocation } from "react-router-dom"
import TopBarProgress from "react-topbar-progress-indicator"

TopBarProgress.config({
  barColors: {
    0: "#2C7A7B",
    "1.0": "#2C7A7B",
  },
  shadowBlur: 15,
  barThickness: 4,
});

const RouteSwitch = ({ children }) => {
   // console.log("SWITCH");
   const [progress, setProgress] = useState(false)
   const [prevLoc, setPrevLoc] = useState("")
   const location = useLocation()

   useEffect(() => {
      setPrevLoc(location.pathname)
      setProgress(true)
      if(location.pathname===prevLoc){
          setPrevLoc('')
      }
   }, [location])

   useEffect(() => {
      setProgress(false)
   }, [prevLoc])

   return (
      <>
         {progress && <TopBarProgress />}
         <Switch>{children}</Switch>
      </>
   )
}

export default RouteSwitch