export interface IItemDataProps {
  checked: boolean;
  title: string;
  id: string;
}

interface IItemProps {
  data: IItemDataProps;
  handleCheckClick: (id: string) => void;
  handleRemove: (id: string) => void;
}

import checkedIcon from '../../assets/checked.svg';
import trash from '../../assets/trash.svg';
import uncheckedIcon from '../../assets/unchecked.svg';
import "./styles.css";

function Item(props: IItemProps):React.ReactElement {
  const {
   data: {
    checked,
    title,
    id
   },
    handleCheckClick,
    handleRemove,
  } = props;

  const iconCheck = checked 
    ? checkedIcon
    : uncheckedIcon;

  return (
    <div className="container">
      <img src={iconCheck} alt="Check mark" onClick={() => handleCheckClick(id)}/>
      <p style={checked ? { textDecorationLine: "line-through", color: "#808080" } : {}}>{title}</p>
      <img src={trash} alt="Trash bin" onClick={() => handleRemove(id)}/>
    </div>
  );
}

export default Item;