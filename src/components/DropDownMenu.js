// svg's
import { ReactComponent as TermsIcon } from "../assets/landmark-solid.svg";
import { ReactComponent as ArrowIcon } from "../assets/chevron.svg";
import { ReactComponent as ArrowIconTwo } from "../assets/arrow.svg";

// hooks
import React, { useState, useEffect, useRef } from "react";

// packages
import { CSSTransition } from "react-transition-group";

//styles
import '../styles/dropdown.css'

const DropDownMenu = () => {
  //estado que permite navegar en el dropdown menu (en caso de que hayan mas items ademas de "class terms")
  const [activeMenu, setActiveMenu] = useState("main"); // class terms, item 2, item 3, ..., item x

  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);


  // define al tamano del componente segun su caracteristica (CSSTransition functionality)
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropDownItem = (props) => {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.leftIcon && (
          <span className="icon-button">{props.leftIcon}</span>
        )}
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"} // condicion para renderizar los "children" dentro de este componente
        unmountOnExit // para que si la condicion no cumple, no se renderice nada
        timeout={500} // duracion de la animacion del renderizado
        classNames="menu-primary" //el mismo menu se asigna a una clase, para que react sepa diferenciar su transicion.
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem
            leftIcon={<TermsIcon />}
            rightIcon={<ArrowIcon />}
            goToMenu="terms"
          >
            Class Terms
          </DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "terms"} // condicion para renderizar los "children" dentro de este componente
        unmountOnExit // para que si la condicion no cumple, no se renderice nada
        timeout={500} // duracion de la animacion del renderizado
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem goToMenu="main" leftIcon={<ArrowIconTwo />}>
            <h3>Class Terms</h3>
          </DropDownItem>

          <DropDownItem>Spring 2024</DropDownItem>
          <DropDownItem>Fall 2024</DropDownItem>
          <DropDownItem>Winter 2024</DropDownItem>

        </div>
      </CSSTransition>

    </div>
  );
};

export default DropDownMenu;
