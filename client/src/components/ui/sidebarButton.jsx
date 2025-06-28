const SidebarButton = ({ title, Icon, isActive, visible }) => {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer  transition-all duration-200 hover:scale-[1.02] hover:bg-color-accent-light hover:text-white ${
        isActive
          ? "scale-[1.02] bg-color-accent-light text-white"
          : "text-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span
        className={`font-medium text-sm ${
          visible === true ? "hidden" : "hidden lg:flex"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default SidebarButton;
