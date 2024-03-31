import { useState } from "react";
export default function Player({ initialName, symbol,isActive ,onPlayerNameChange}) {
  const [isEditing, setIsEditing] = useState(false);
  let [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((isEditing)=>!isEditing);
  }
  function handleInputChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? 'active':null}>
      <span className="player">
        {isEditing ? (
          <input type="text" required value={playerName} onChange={handleInputChange}></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>

        {!isEditing ? (
          <button onClick={handleEditClick}>Edit</button>
        ) : (
          <button onClick={()=>{
            handleEditClick();
            onPlayerNameChange(symbol,playerName);}}>Save</button>
        )}
      </span>
    </li>
  );
}
