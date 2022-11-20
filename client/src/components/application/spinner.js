import React from 'react'

export default function Spinner(props) {
  console.log("Spinner");
    return (
        <div className="flex-row">
            <h2>{props.text}</h2>
        </div>
    );
  }