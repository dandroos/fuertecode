import React from "react"
import { motion } from "framer-motion"

function Animator({ children, initial, animate, delay, duration }) {
    let delay = delay || 
  return (
    <motion.div transition={{delay: delay, duration: duration}} initial={initial} animate={animate}>
      {children}
    </motion.div>
  )
}

export default Animator
