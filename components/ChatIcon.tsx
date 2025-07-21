"use client"

import { useEffect } from "react";
const ChatIcon=()=>{
    useEffect(() => {
    const script1 = document.createElement('script')
    script1.src = 'https://cdn.botpress.cloud/webchat/v3.1/inject.js'
    script1.async = true
    document.body.appendChild(script1)

    const script2 = document.createElement('script')
    script2.src = 'https://files.bpcontent.cloud/2025/07/21/00/20250721001728-2FSZMDIQ.js'
    script2.async = true
    document.body.appendChild(script2)

    return () => {
      document.body.removeChild(script1)
      document.body.removeChild(script2)
    }
  }, [])

  return null // or return <d
}

export default ChatIcon;