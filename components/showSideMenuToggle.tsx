import { Dispatch, SetStateAction } from "react";

type ShowSideMenuToggleProps = {
  showToggle: boolean,
  showSideMenu: boolean,
  handleToggle: Dispatch<SetStateAction<boolean>>
}

const ShowSideMenuToggle = (props: ShowSideMenuToggleProps) => {
  const { showToggle, showSideMenu, handleToggle } = props;

  return (
    <button 
      className={`${showToggle ? 'z-10' : '-left-40 opacity-0'} show-side-menu-btn`}
      onClick={() => showSideMenu ? handleToggle(false) : handleToggle(true)}
    >
      <span className="text-4xl">{showSideMenu ? '⇚' : '⇛'}</span>
    </button>
  )
}

export default ShowSideMenuToggle;