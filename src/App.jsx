import { useState, useEffect } from "react";
import Values from "values.js";

import rgbToHex from "./utils";

function App() {
  const defaultColor = "#ffa500";
  const defaultValues = new Values(defaultColor).all(10);

  const [color, setColor] = useState(defaultColor);
  const [amount, setAmount] = useState(10);
  const [list, setList] = useState(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();

    try {
      let newList = new Values(color).all(parseInt(amount));
      setList(newList);
      console.log(amount);
      console.log(newList);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>Tints and Shades</h1>
      <Form
        color={color}
        setColor={setColor}
        amount={amount}
        setAmount={setAmount}
        handleSubmit={handleSubmit}
      />
      <ColorList list={list} />
    </div>
  );
}

function Form({ color, setColor, amount, setAmount, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="color">Pick a color:</label>
          <input type="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input type="text" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input
            type="range"
            name="amount"
            min={1}
            max={50}
            // step={5}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="amount">{amount}% variation</label>
        </div>
        <button type="submit">Generate</button>
      </form>
    </>
  );
}

function ColorList({ list }) {
  return (
    <>
      <ul className="color-list">
        {list.map((color, i) => (
          <Color key={i} color={color} />
        ))}
      </ul>
    </>
  );
}

function Color({ color }) {
  const { rgb, type, weight } = color;

  let rgbColor = rgb.toString();
  let hexColor = rgbToHex(...rgb);

  let boxStyles = { backgroundColor: `rgb(${rgbColor})` };

  return (
    <>
      <li>
        <div className="box" style={boxStyles}>
          <span>{weight}%</span>
        </div>
        <div className="info">
          <p>rgb({rgbColor})</p>
          <p>{hexColor} </p>
        </div>
      </li>
    </>
  );
}

export default App;
