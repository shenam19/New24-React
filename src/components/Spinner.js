// import React, { Component } from "react";
import React from "react";
import spinner from "./Spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img src={spinner} alt="loading" />
    </div>
  );
};
export default Spinner;

// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className="text-center my-3">
//         <img src={spinner} alt="loading" />
//       </div>
//     );
//   }
// }
