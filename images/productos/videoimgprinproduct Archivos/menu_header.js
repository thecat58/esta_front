class MenuHeader {
  constructor() {
    this.btnsMegaMenu = document.querySelectorAll(".js-btn-main-menu");
    this.targetThirdMenu = "js-target-third-menu";
    this.btnsThirdMenu = document.querySelectorAll(".js-btn-third-menu");
    this.btnsOpenOver = document.querySelector(".openOver");
    this.btnsReturnMegaMenu = document.querySelectorAll(".js-return-megamenu");
    this.btntoggleMegaMenuMobile = document.querySelector(".js-toggle-main-menu-mb");
    this.targetHeaderMenu = document.querySelector(".js-target-header");
    this.siblingBtnMainMenu = ".js-sibling-btn";
    this.bodyElement = document.querySelector("body");
    this.activeClassMainMenu = "is-open-main-menu";
    this.activeClassSecondMenu = "is-open-megamenu";
    this.activeClassThirdMenu = "is-open-submenu-third";
    this.clasStateThirdLevel = "is-third-level";
    this.activeClass = "is-active";
    this.openMenuClass = "is-open";
    this.init();
  }


  init() {
    this.clickToOpenMegaMenuMb();
    this.clicktoOpenMegaMenu();
    this.clickToOpenThirdMenu();
    this.clickToReturnMegaMenu();
    this.mouseOut();
    this.rollOver();
  /*   this.rollOut(); */
  }

  removeClassOfThirdMegaMenu() {
    const megaMenuThird = document.querySelectorAll("." + this.targetThirdMenu);
    megaMenuThird.forEach((element) => {
      if (element.classList.contains(this.activeClassThirdMenu)) {
        element.classList.remove(this.activeClassThirdMenu);
      }
    });
  }

  removeClassActiveOfButtons() {
    document.querySelectorAll(this.siblingBtnMainMenu).forEach((element) => {
      element.classList.remove(this.activeClass);
    });

    this.btnsThirdMenu.forEach((element) => {
      element.classList.remove(this.activeClass);
    });
  }

  removeClassOfBtns() {
    this.btnsMegaMenu.forEach((element) => {
      if (element.classList.contains(this.activeClassSecondMenu)) {
        element.classList.remove(this.activeClassSecondMenu);

        this.removeClassActiveOfButtons();
      }
    });

    this.removeClassOfThirdMegaMenu();
  }

  clickToOpenMegaMenuMb() {
    this.btntoggleMegaMenuMobile.addEventListener("click", () => {
      this.bodyElement.classList.toggle(this.activeClassMainMenu);
      this.targetHeaderMenu.classList.toggle(this.openMenuClass);

      this.removeClassOfBtns();

      if (this.bodyElement.classList.contains("is-open-menu-top")) {
        this.bodyElement.classList.remove("is-open-menu-top");
      }
    });
  }

  clicktoOpenMegaMenu() {
    this.btnsMegaMenu.forEach((currentBtn) => {
      const btnClick = currentBtn.querySelector(this.siblingBtnMainMenu);

      btnClick.addEventListener("click", () => {
        if (currentBtn.classList.contains(this.activeClassSecondMenu)) {
          currentBtn.classList.remove(this.activeClassSecondMenu);
          btnClick.classList.remove(this.activeClass);
          this.targetHeaderMenu.classList.remove(this.openMenuClass);
          this.removeClassOfThirdMegaMenu();
        } else {
          this.btnsMegaMenu.forEach((siblingsBtnCurrent) => {
            siblingsBtnCurrent
              .querySelector(this.siblingBtnMainMenu)
              .classList.remove(this.activeClass);

            if (
              siblingsBtnCurrent.classList.contains(this.activeClassSecondMenu)
            ) {
              siblingsBtnCurrent.classList.remove(this.activeClassSecondMenu);

              this.removeClassOfThirdMegaMenu();
            }
          });

          currentBtn.classList.add(this.activeClassSecondMenu);
          btnClick.classList.add(this.activeClass);
          this.targetHeaderMenu.classList.add(this.openMenuClass);
        }
      });
    });
  }

  clickToOpenThirdMenu() {
    this.btnsThirdMenu.forEach((currentBtn) => {
      currentBtn.addEventListener("click", () => {
        const parentBtn = currentBtn.closest("." + this.targetThirdMenu);

        if (parentBtn.classList.contains(this.activeClassThirdMenu)) {
          parentBtn.classList.remove(this.activeClassThirdMenu);
          currentBtn.classList.remove(this.activeClass);
        } else {
          this.btnsThirdMenu.forEach((siblingsBtnCurrent) => {
            const parentSibling = siblingsBtnCurrent.closest(
              "." + this.targetThirdMenu
            );

            siblingsBtnCurrent.classList.remove(this.activeClass);

            if (parentSibling.classList.contains(this.activeClassThirdMenu)) {
              parentSibling.classList.remove(this.activeClassThirdMenu);
            }
          });

          parentBtn.classList.add(this.activeClassThirdMenu);
          currentBtn.classList.add(this.activeClass);
        }
      });
    });
  }

  clickToReturnMegaMenu() {
    this.btnsReturnMegaMenu.forEach((btnCurrent) => {
      btnCurrent.addEventListener("click", () => {
        if (btnCurrent.closest("." + this.clasStateThirdLevel)) {
          const parentBtn = btnCurrent.closest("." + this.targetThirdMenu);
          if (parentBtn.classList.contains(this.activeClassThirdMenu)) {
            parentBtn.classList.remove(this.activeClassThirdMenu);
          }
        } else {
          this.btnsMegaMenu.forEach((btns) => {
            if (btns.classList.contains(this.activeClassSecondMenu)) {
              btns.classList.remove(this.activeClassSecondMenu);
            }
          });
        }

        this.removeClassActiveOfButtons();
      });
    });
  }

  rollOver() {
    if (this.btnsOpenOver != undefined && this.btnsOpenOver != null ) {
        this.btnsOpenOver.addEventListener("mouseover", () => {
          const parentBtn = this.btnsOpenOver.closest("." + this.targetThirdMenu);
  
          if (parentBtn.classList.contains(this.activeClassThirdMenu)) {
            parentBtn.classList.remove(this.activeClassThirdMenu);
            this.btnsOpenOver.classList.remove(this.activeClass);
          } else {
              const parentSibling = this.btnsOpenOver.closest(
                "." + this.targetThirdMenu
              );
              this.btnsOpenOver.classList.remove(this.activeClass);
  
              if (parentSibling.classList.contains(this.activeClassThirdMenu)) {
                parentSibling.classList.remove(this.activeClassThirdMenu);
              }
            parentBtn.classList.add(this.activeClassThirdMenu);
            this.btnsOpenOver.classList.add(this.activeClass);
          }
        });
      }
  }

  mouseOut() {
    window.addEventListener("click", e => {
      if (!e.target.closest(".c-main-menu__nav")) {
        if (window.innerWidth >= 1250) {
          this.removeClassActiveOfButtons();
          this.removeClassOfBtns();
          this.targetHeaderMenu.classList.remove(this.openMenuClass);
        }
      }
    })
  }
}

new MenuHeader();