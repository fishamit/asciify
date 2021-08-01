import React from 'react';

const Ascii = ({ ascii, zoom }) => {
  return (
    <div className="cont">
      <div
        className="asciiContainer"
        style={{
          fontSize: `${zoom}rem`,
          fontFamily: 'monospace',
          fontWeight: 'bolder',
          whiteSpace: 'pre',
        }}
      >
        {ascii}
      </div>
    </div>
  );
};

export default Ascii;
