const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("light")) {
    html.classList.remove("light");
    return "dark";
  } else {
    html.classList.add("light");
    return "light";
  }
};

export default toggleTheme;
