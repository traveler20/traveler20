const checkToggle=document.getElementById("js_mode_toggle"),rotateIcon=document.getElementById("js_rotate"),classLight="is_light",isLight=window.matchMedia("(prefers-color-scheme: light)").matches,keyLocalStorage="whike-theme-mode",localTheme=localStorage.getItem(keyLocalStorage);let nowRotate=0;function changeMode(e){"light"===e?(document.body.classList.add(classLight),checkToggle.checked=!0):"dark"===e&&(document.body.classList.remove(classLight),checkToggle.checked=!1)}function rotateInfinite(){nowRotate+=180,rotateIcon.style.transform="rotate("+nowRotate+"deg)"}"light"===localTheme?(rotateInfinite(),changeMode("light")):"dark"===localTheme?changeMode("dark"):isLight&&(rotateInfinite(),changeMode("light")),checkToggle.addEventListener("change",function(e){rotateInfinite(),e.target.checked?(changeMode("light"),localStorage.setItem(keyLocalStorage,"light")):(changeMode("dark"),localStorage.setItem(keyLocalStorage,"dark"))});