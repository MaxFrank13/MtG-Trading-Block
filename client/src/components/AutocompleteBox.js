import React from "react";

export function AutocompleteBox({ cards, setSearchInput, setTriggerSubmit }) {

  const handleCardClick = (e) => {
    setSearchInput(e.target.textContent);
    setTriggerSubmit(true);
  }

  return (
    <div className="autocomplete-box">
      {cards?.map((card, idx) => (
        <p key={idx} onClick={handleCardClick}>{card}</p>
      ))}
    </div>
  )
}