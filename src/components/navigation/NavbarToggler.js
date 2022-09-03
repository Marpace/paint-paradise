
function NavbarToggler(props) {

    const menuShown = props.menuShown ? "toggler-open" : ""


    return (
        <div onClick={props.toggleMenu} className="navbar-toggler">
              <div className={`toggler-div toggler-div-1 ${menuShown}-1`}></div>
              <div className={`toggler-div toggler-div-2 ${menuShown}`}></div>
              <div className={`toggler-div toggler-div-3 ${menuShown}-3`}></div>
          </div>
    )
}



export default NavbarToggler;