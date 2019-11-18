import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { tsPropertySignature } from "@babel/types";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, update }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const colorToUpdateID = colorToEdit.id;
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToUpdateID}`, colorToEdit)
      .then(() => {
        update();
        setEditing(false);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(() => {
        update();
      });
  };

  const addNewColor = () => {
    setAdding(true);
  };

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorToAdd)
      .then(update())
      .catch(err => console.log(err));
    setColorToAdd(initialColor);
    setAdding(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="colors-wrap">
      <p onClick={logout} className="logout">
        Log out
      </p>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <button onClick={() => addNewColor()}>Add New Color</button>

      {/* stretch - build another form here to add a color */}

      {adding && (
        <form onSubmit={saveAdd}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
