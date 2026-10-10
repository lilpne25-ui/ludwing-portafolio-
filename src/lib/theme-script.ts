// Runs before paint so a saved light/dark choice never flashes the other theme.
export const themeScript = `try{var t=localStorage.getItem("lv-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
