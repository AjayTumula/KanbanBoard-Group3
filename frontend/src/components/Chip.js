import React, { useCallback } from "react";
import { X } from "react-feather";

export default function Chip(props) {
  const { label, removeLabel } = props;
  const getlabelStyles = useCallback(
    (label) => {
      if(label === 'High' || label === 'Critical Bug') {
        return 'red'
      } else if(label === 'Medium') {
        return 'orange'
      } else {
        return 'green'
      }
    },
    [],
  );
  const labelBackground = getlabelStyles(label);
  return (
    <label style={{ backgroundColor: labelBackground, color: "#fff" }}>
      {label}
      {removeLabel && <X onClick={() => removeLabel(label)} />}
    </label>
  );
}
