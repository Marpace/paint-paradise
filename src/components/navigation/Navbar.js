import NavbarBrand from "./NavbarBrand";
import NavbarLink from "./NavbarLink"
import NavbarToggler from "./NavbarToggler";
import {UrlContext} from "../App";
import {useEffect, useState, useContext} from "react";
import {EditContext} from "../cms/CMS";

function Navbar() {

  
  const [menuShown, setMenuShown] = useState(false);
  const menuClass = menuShown ? "menu-shown" : "";
  const context = useContext(EditContext);
  const urlContext = useContext(UrlContext);
  const [links, setLinks] = useState([]);
  const [dropdownLinks, setDropdownLinks] = useState([]);

  useEffect(() => {
    getLinks();
  }, [])

  function getLinks() {
    fetch(`${urlContext.baseUrl}/get-global-text-content`)
    .then( res => res.json())
    .then(data => {
        const links = data.content.filter( item => {
          return item.type.name === "navlink"
        })
        const dropdownLinks = data.content.filter( item => {
          return item.type.name === "dropdown-link"
        })
        setLinks(links.sort((a, b) => a.order - b.order))
        setDropdownLinks(dropdownLinks.sort((a, b) => a.order - b.order))
    })
    .catch( err => {
      console.log(err)
    })
  }    


  function toggleMenu() {
      if(menuShown){
          setMenuShown(false)
      } else {
          setMenuShown(true)
      }
  }

  return (
    <div className="nav-wrap">
      <div className="navbar">
      <NavbarBrand 
      />
      <NavbarToggler 
        menuShown={menuShown}
        toggleMenu={toggleMenu}
      />
      </div>
      <div className={`nav-links-container ${menuClass}`}>
        {links.map(link => (
          <NavbarLink 
            key={link._id}
            contentId={link._id}
            linkName={link.content}
            dropdown={link.type.options}
            dropdownLinks={dropdownLinks}
            toggleMenu={toggleMenu}
          />
        ))}
      </div>
    </div>
  )
}

export default Navbar;