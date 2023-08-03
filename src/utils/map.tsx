const hexToRgb = (hex: string | undefined) => {
  if (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r: number
    let g: number
    let b: number
    if(result) {
      r = parseInt(result[1], 16)
      g = parseInt(result[2], 16)
      b = parseInt(result[3], 16)
      return `${r},${g},${b}`;
    }
  }
};
export const resolveElementColor = (param: string, value: number) => {
  switch (param) {
    case "dewpoint":
    case "t2m":
      if (value < -30) return "#8a79f7";
      if (value >= -30 && value < -28) return "#8a79f7";
      if (value >= -28 && value < -26) return "#6e70e7";
      if (value >= -26 && value < -24) return "#5268d8";
      if (value >= -24 && value < -22) return "#3760c9";
      if (value >= -22 && value < -20) return "#1b58ba";
      if (value >= -20 && value < -18) return "#0050ab";
      if (value >= -18 && value < -16) return "#196bbe";
      if (value >= -16 && value < -14) return "#3286d1";
      if (value >= -14 && value < -12) return "#4ba1e4";
      if (value >= -12 && value < -10) return "#65dbf7";
      if (value >= -10 && value < -8) return "#77c8f8";
      if (value >= -8 && value < -6) return "#8ad3f9";
      if (value >= -6 && value < -4) return "#9cdefb";
      if (value >= -4 && value < -2) return "#afe9fc";
      if (value >= -2 && value < -1) return "#c1f4fd";
      if (value >= -1 && value < 0) return "#d4ffff";
      if (value >= 0 && value < 1) return "#05b38a";
      if (value >= 1 && value < 2) return "#02d495";
      if (value >= 2 && value < 4) return "#8aedbb";
      if (value >= 4 && value < 6) return "#ccffd0";
      if (value >= 6 && value < 8) return "#ebfccf";
      if (value >= 8 && value < 10) return "#ebff7a";
      if (value >= 10 && value < 12) return "#ffea80";
      if (value >= 12 && value < 14) return "#f7d423";
      if (value >= 14 && value < 16) return "#f5b400";
      if (value >= 16 && value < 18) return "#f29500";
      if (value >= 18 && value < 20) return "#f07400";
      if (value >= 20 && value < 22) return "#ff5324";
      if (value >= 22 && value < 24) return "#f71707";
      if (value >= 24 && value < 26) return "#db0a07";
      if (value >= 26 && value < 28) return "#bd0404";
      if (value >= 28 && value < 30) return "#9e0101";
      if (value >= 30) return "#eb0052";
      return "#8aedbb";

    case "rh":
      if (value >= 0 && value < 50) return "#f7fbff";
      if (value >= 50 && value < 60) return "#deebf7";
      if (value >= 60 && value < 65) return "#c6dbef";
      if (value >= 65 && value < 70) return "#9ecae1";
      if (value >= 70 && value < 75) return "#6baed6";
      if (value >= 75 && value < 80) return "#4292c6";
      if (value >= 80 && value < 85) return "#2171b5";
      if (value >= 85 && value < 90) return "#08519c";
      if (value >= 90) return "#08306b";
  }
};

export const resolveElement = (param: string, value: number) => {
  const styles = {
    element: {
      fontWeight: "bold",
      border: "1px solid black",
      color: "black",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontSize: "15px",
      position: "relative",
      left: "1px",
      width: "20px",
    },
  };
  const element: HTMLElement = document.createElement("span");
  element.innerText += typeof value === "string" ? value : value.toFixed(1);
  Object.assign(element.style, {
    ...styles.element,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    backgroundColor: `rgba(${hexToRgb(resolveElementColor(param, value))},0.7)`,
  });

  return element;
};
