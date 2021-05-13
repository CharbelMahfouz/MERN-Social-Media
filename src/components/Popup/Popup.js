const Popup = (props) => {
  const { children, openPopup } = props;

  return openPopup ? children : "";
};

export default Popup;
