import Icon from "../Icon/Icon";
import './card.css';



function Card({ iconName }){
    return(
  <div className="card">
   
    <Icon name = {iconName} />

  </div>
    )
}

export default Card;