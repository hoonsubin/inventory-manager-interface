import {
    IonItem,
    IonLabel,
    IonNote
    } from '@ionic/react';
  import { Message } from '../data/products';
  import './ProductListItem.css';
  
  interface ProductListItemProps {
    message: Message;
  }
  
  const ProductListItem: React.FC<ProductListItemProps> = ({ message }) => {
    return (
      <IonItem routerLink={`/product/${message.id}`} detail={false}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            {message.fromName}
            <span className="date">
              <IonNote>{message.date}</IonNote>
            </span>
          </h2>
          <h3>{message.subject}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </IonLabel>
      </IonItem>
    );
  };
  
  export default ProductListItem;
  