import React from 'react'

function Loding({visible}) {
    if (!visible) return null
  return (
    <div className={`w-screen h-screen fixed justify-center items-center flex top-0 left-0 z-50 bg-gradient-to-br from-gray-900 via-slate-900 text-amber-300 to-gray-800 `}>
<div className="loader">

</div> 
</div>
  )
}

export default Loding