export const Thumbnail = (props) => {
  const { mapName, changed, id, isSelected, label, value, image } = props;
  return (
    <div>
      <img src={image} height="100" width="100"></img>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{mapName}</label>
    </div>
  );
};

export default Thumbnail;
