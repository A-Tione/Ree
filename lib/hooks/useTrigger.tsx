import { useState } from "react"

const useTrigger = (initValue: boolean) => {
  const [expanded, setExpanded] = useState(initValue)

  const expand = () => {
    setExpanded(true)
  }
  const collapse = () => {
    setExpanded(false)
  }

  return {
    expanded,
    expand,
    collapse
  }
}

export default useTrigger