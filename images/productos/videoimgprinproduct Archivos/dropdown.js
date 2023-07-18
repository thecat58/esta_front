class Dropdown {
  constructor() {
    this.classTargetDropdown = "js-target-dropdown";
    this.btnsDropdown = document.querySelectorAll(".js-btn-dropdown");
    this.classActiveMenuDropdown = "is-dropdown-active";
    this.init();
  }

  init() {
    this.clickToOpenMenu();
    this.mouseOut();
  }

  clickToOpenMenu() {
    this.btnsDropdown.forEach((currentBtn) => {
      currentBtn.addEventListener("click", () => {
        const targetDropdown = currentBtn.closest(
          "." + this.classTargetDropdown
        );

        if (targetDropdown.classList.contains(this.classActiveMenuDropdown)) {
          targetDropdown.classList.remove(this.classActiveMenuDropdown);
        } else {
          this.btnsDropdown.forEach((siblingsBtnCurrent) => {
            const listDropdownParent = siblingsBtnCurrent.closest(
              "." + this.classTargetDropdown
            );

            if(!listDropdownParent.classList.contains("c-filter__list")) {

              if (listDropdownParent) {
                if (
                  listDropdownParent.classList.contains(
                    this.classActiveMenuDropdown
                  )
                ) {
                  listDropdownParent.classList.remove(
                    this.classActiveMenuDropdown
                  );
                }
              }

            }

          });

          targetDropdown.classList.add(this.classActiveMenuDropdown);
        }
      });
    });
  }

  mouseOut() {
    window.addEventListener("click", e => {
      if(!e.target.classList.contains("js-btn-dropdown")) {
        const htmlClassDropdowns =  document.querySelectorAll("." + this.classTargetDropdown);

        htmlClassDropdowns.forEach(dropdown => {
          if(!dropdown.classList.contains("c-filter__list")) {
            dropdown.classList.remove(this.classActiveMenuDropdown);
          }
        });
      }
    })
  }
}

new Dropdown();
