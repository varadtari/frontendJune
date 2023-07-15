import React from "react";


function ElementMaker(props) {
  const { showInputEle, value, handleChange, handleDoubleClick, handleBlur } =
    props;
   

  


  return (
    <span>
      {showInputEle ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          style={{
            display: "inline-block",
            height: "25px",
            minWidth: "300px",
          }}
        >
          {value}
        </span>
      )}
    </span>
  );
}


export default ElementMaker;
