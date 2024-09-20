import React, { useState } from 'react';
import './Shop.css';

const Shop = ({ player, setPlayer, onExitShop }) => {
  // Inicializa el estado de los artículos de la tienda
  const [shopItems, setShopItems] = useState([
    {
      name: 'ring',
      effect: 'attack',
      effectIcon: 'sword',
      value: 1,
      cost: 15
    },
    {
      name: 'axe',
      effect: 'attack',
      effectIcon: 'sword',
      value: 1,
      cost: 15
    },
    {
      name: 'helmet',
      effect: 'defense',
      effectIcon: 'shield-plus',
      value: 1,
      cost: 20
    }
  ]);

  // Función para comprar un objeto
  const handleBuyItem = (itemIndex) => {
    const item = shopItems[itemIndex];
    if (player.gold >= item.cost) {
      // Descontar el oro y agregar el objeto al inventario del jugador
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        gold: prevPlayer.gold - item.cost,
        inventory: [...prevPlayer.inventory, item],
      }));

      // Eliminar el objeto de la tienda
      setShopItems((prevItems) => prevItems.filter((_, index) => index !== itemIndex));
    }
  };

  return (
    <div className="shop-container">
      <h1><i className='icon-shop' aria-describedby="shop"></i></h1>
      <h2>
        <i className={`icon-${player.name}`}></i>Player <i className='icon-gold' aria-describedby="gold"></i>{player.gold}
      </h2>
      <div className="shop-items">
        {shopItems.map((item, index) => (
          <div key={index} className="shop-item">
            <p>
              <i className={`icon-${item.name}`}></i>=<i className={`icon-${item.effectIcon}`}></i>+{item.value}
              <span className='arrow'>➤</span>
              <button className='selectable buy-action' onClick={() => handleBuyItem(index)} disabled={player.gold < item.cost}>
                <i className='icon-gold' aria-describedby={`buy by ${item.cost}`}></i>{item.cost}
              </button>
            </p>
          </div>
        ))}
      </div>
      <button className="selectable" onClick={onExitShop}>➤➤</button>
    </div>
  );
};

export default Shop;
