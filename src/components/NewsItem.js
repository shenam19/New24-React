// import React, { Component } from "react";
import React from "react";

const NewsItem = ({
  title,
  description,
  imgUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
        }}
      >
        <span
          className=" badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: 10 }}
        >
          {source}
        </span>
      </div>
      <img src={imgUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}... </p>
        <p className="card-text">
          <small className="text-body-secondary">
            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          className="btn btn-sm btn-dark"
          rel="noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;

// Class based component
// export class NewsItem extends Component {
//   render() {
//     let { title, description, imgUrl, newsUrl, author, date, source } =
//       this.props;
//     return (
//       <div className="card">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             position: "absolute",
//             right: "0",
//           }}
//         >
//           <span
//             class=" badge rounded-pill bg-danger"
//             style={{ left: "90%", zIndex: 10 }}
//           >
//             {source}
//           </span>
//         </div>
//         <img src={imgUrl} className="card-img-top" alt="..." />
//         <div className="card-body">
//           <h5 className="card-title">{title}...</h5>
//           <p className="card-text">{description}... </p>
//           <p className="card-text">
//             <small className="text-body-secondary">
//               By {!author ? "Unknown" : author} on{" "}
//               {new Date(date).toGMTString()}
//             </small>
//           </p>
//           <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
//             Read More
//           </a>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItem;
