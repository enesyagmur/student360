const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    return "light";
  } else {
    html.classList.add("dark");
    return "dark";
  }
};

export default toggleTheme;
