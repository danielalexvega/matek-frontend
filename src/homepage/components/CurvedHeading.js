import React from "react";
import PropTypes from "prop-types";

const Heading = ({ text, arc, radius }) => {
  // const [increment, setIncrement] = useState(1);

  // useEffect(()=> {
  //   setTimeout(()=>{
  //     setIncrement(increment + 0.1);
  //     console.log(increment);
  //   }, 250);
  // }, [increment]);

  const characters = text.split("");
  const degree = arc / characters.length;

  return (
    <h1>
      {characters.map((char, i) => (
        <span
          key={`heading-span-${i}`}
          style={{
            height: `${radius}px`,
            transform: `rotate(${degree * (i + 0.1) - arc / 2}deg)`,
            transformOrigin: `0 ${radius}px 0`,
            width: "100px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

Heading.propTypes = {
    text: PropTypes.string.isRequired,
    arc: PropTypes.number, //how curved do you want the text
    radius: PropTypes.number, //how big do you want the curve
};

Heading.defaultProps = {
    arc: 120,
    radius: 400
}

export default Heading;
