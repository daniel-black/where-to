import React from 'react'

type MyPlacesMenuProps = {
  handleClick: (showPopup: boolean) => void
};

const MyPlacesMenu = ({ handleClick }: MyPlacesMenuProps) => {
  return (
    <details>
      <summary>My Places</summary>
      <p>This is where my places will be</p>
      {/* <button
        onClick={() => handleClick(true)} 
        className='bg-zinc-600 text-rose-100 p-1 rounded w-full'
      >
        Add a new place
      </button> */}
    </details>
  )
}

export default MyPlacesMenu