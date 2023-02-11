import React from 'react'

const Stories = ({title, url, toggle, selcted, i}) => {
  return (
    <div className='storries'>
    <div className='heading' onClick={()=>toggle(i)}>{title} <span>{selcted === i ? "-" : "+"}</span></div>
    <div className={selcted === i ? 'content show':'content'}>{url}</div>
  </div>
  )
}



export default Stories