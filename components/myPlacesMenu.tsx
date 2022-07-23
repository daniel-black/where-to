import React from 'react'

type MyPlacesMenuProps = {
  handleClick: (showPopup: boolean) => void
};

const MyPlacesMenu = ({ handleClick }: MyPlacesMenuProps) => {
  return (
    <details>
      <summary>Places I want to be</summary>
      <p>This is where my places will be</p>
      <button
        onClick={() => handleClick(true)} 
        className='bg-slate-800 text-white p-1 rounded'
      >
        Add a new place
      </button>
    </details>
  )
}

export default MyPlacesMenu