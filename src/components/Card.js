function Card({ card, onCardClick }) {
    function handleClick() {
      onCardClick(card)
    }
  
    return (
      <li className="elements__card">
      <img src={card.link} class="elements__image" alt={card.name} onClick={handleClick} />
      <button className="elements__trash" type="button" aria-label="Удалить"></button>
      <div className="elements__title-wrapper">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-wrapper">
          <button
            type="button"
            className="elements__like-button"
            aria-label="Нравится"
          ></button>
          <p className="elements__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
    )
  }
  
  export default Card;