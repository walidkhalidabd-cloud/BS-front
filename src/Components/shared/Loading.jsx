import React from 'react'

export default function Loading() {
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center text-warning position-absolute top-0 start-0  opacity-75 z-3' style={{
        fontSize: "100px",
     }}><i className='fa fa-spinner fa-spin' ></i></div>
  )
}
