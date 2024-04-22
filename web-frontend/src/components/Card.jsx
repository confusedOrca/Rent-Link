/*
  Generic card box to contain contents
  > have shadows
  > 32px padding
  > fairly rounded edges
  > properties can be modified using classNames
*/
import { twMerge } from "tailwind-merge";

const Card = (props) => {
  return (
    <div className={twMerge("shadow-lg p-8 rounded-lg " + props.className)}>{props.children}</div>
  );
};

export default Card;
