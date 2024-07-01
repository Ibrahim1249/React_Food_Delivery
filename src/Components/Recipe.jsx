

import React from 'react'

function Recipe({data}) {
  return (
   <>
     <div className="container">
          <h3><span>Title :</span>{data.title}</h3>
          <p><span>ingredients :</span> {data.ingredients}</p>
          <p><span>instructions :</span>{data.instructions}</p>
     </div>
   </>
  )
}

export default Recipe