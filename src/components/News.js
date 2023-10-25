import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // articles = [
  //   {
  //     source: { id: "news-com-au", name: "News.com.au" },
  //     author: null,
  //     title: "Aussie nightmare goes from bad to worse",
  //     description:
  //       "Welcome to news.com.au’s live coverage of Australia’s cricket World Cup contest against Sri Lanka from Lucknow, India.",
  //     url: "https://www.news.com.au/sport/cricket/australia-vs-sri-lanka-live-updates-pat-cummins-rumour-officially-put-to-bed/news-story/eac103eedb42c7319de540dc6adaa654",
  //     urlToImage:
  //       "https://content.api.news/v3/images/bin/2f3a4db99eefacc03c73215c1cfd831d",
  //     publishedAt: "2023-10-16T09:49:00Z",
  //     content:
  //       "Welcome to news.com.au’s live coverage of Australia’s cricket World Cup contest against Sri Lanka from Lucknow, India.\r\nThe Aussies enter the match having lost both opening matches, going down by six… [+5588 chars]",
  //   },
  //   {
  //     source: { id: "bbc-sport", name: "BBC Sport" },
  //     author: null,
  //     title: "Cricket accepted for 2028 Olympics in Los Angeles",
  //     description:
  //       "Cricket will be part of the 2028 Olympics after International Olympic Committee members vote to include the sport for the Los Angeles Games.",
  //     url: "http://www.bbc.co.uk/sport/olympics/67120460",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/12CE/production/_131441840_eng2.jpg",
  //     publishedAt: "2023-10-16T08:37:23.3318238Z",
  //     content:
  //       "Australia beat South Africa to lift the Women's T20 World Cup in Cape Town eight months ago\r\nCricket will be part of the Olympic programme for the first time since 1900 after International Olympic Co… [+1240 chars]",
  //   },
  //   {
  //     source: { id: "bbc-sport", name: "BBC Sport" },
  //     author: null,
  //     title:
  //       "World Cup: Sri Lanka bat v Australia with both sides seeking first win",
  //     description:
  //       "Follow live text, in-play video clips and radio commentary as Australia play Sri Lanka in the Men's Cricket World Cup 2023.",
  //     url: "http://www.bbc.co.uk/sport/live/cricket/66858169",
  //     urlToImage:
  //       "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
  //     publishedAt: "2023-10-16T08:37:22.4726625Z",
  //     content:
  //       "Australia: David Warner, Mitchell Marsh, Steven Smith, Marnus Labuschagne Josh Inglis (wk), Glenn Maxwell, Marcus Stoinis, Pat Cummins (c), Mitchell Starc, Adam Zampa, Josh Hazlewood. \r\nSri Lanka: Pa… [+205 chars]",
  //   },
  //   {
  //     source: { id: "bbc-sport", name: "BBC Sport" },
  //     author: null,
  //     title: "England suffer shock defeat by Afghanistan",
  //     description:
  //       "Watch highlights as England suffer a shock 69-run defeat to Afghanistan in Delhi at the Cricket World Cup.",
  //     url: "http://www.bbc.co.uk/sport/av/cricket/67118205",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/cpsprodpb/15D8B/production/_131438498_p0glnzpw.jpg",
  //     publishedAt: "2023-10-15T17:22:24.332501Z",
  //     content:
  //       "Watch highlights as England suffer a shock 69-run defeat to Afghanistan in Delhi at the Cricket World Cup. \r\nREPORT:England stunned by Afghanistan in damaging defeat\r\nAvailable to UK users only.",
  //   },
  //   {
  //     source: { id: "talksport", name: "TalkSport" },
  //     author: "Callum Vurley",
  //     title:
  //       "England beaten by Afganistan for first time ever as Cricket World Cup hopes in tatters...",
  //     description:
  //       "England’s Cricket World Cup hopes are in tatters as they suffered a humiliating first ever ODI defeat to Afghanistan. Afghanistan triumphed over England by 69 runs in Delhi on Sunday and also…",
  //     url: "https://talksport.com/sport/cricket/1602655/england-cricket-afghanistan-defeat-world-cup/",
  //     urlToImage:
  //       "https://talksport.com/wp-content/uploads/sites/5/2023/10/SD-TALKSPORT-ENGLAND-AFGHANISTAN.jpg?strip=all&quality=100&w=1500&h=1000&crop=1",
  //     publishedAt: "2023-10-15T16:03:45Z",
  //     content:
  //       "England's Cricket World Cup hopes are in tatters as they suffered a humiliating first ever ODI defeat to Afghanistan.\r\nAfghanistan triumphed over England by 69 runs in Delhi on Sunday and also claime… [+3360 chars]",
  //   },
  //   {
  //     source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //     author: null,
  //     title:
  //       "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     description:
  //       "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     publishedAt: "2020-04-27T11:41:47Z",
  //     content:
  //       "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //   },
  //   {
  //     source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //     author: null,
  //     title:
  //       "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     description:
  //       "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     publishedAt: "2020-03-30T15:26:05Z",
  //     content:
  //       "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //   },
  // ];

  const updateNews = async () => {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d99c0d7e12524d13be4c84c98c585aae&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    props.setProgress(30);

    let data = await fetch(url);
    props.setProgress(70);

    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${this.capitalizeFirstLetter(props.category)}-NewsMonkey`;

    updateNews();
    // eslint-disable-next-line
  }, []);

  // const  componentDidMount=async()=> {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=262af850b1764eb88dbfd9cb0112da73&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // this.setState({
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   //   loading: false,
  //   // });
  //   this.updateNews();
  // }

  // const handlePrevClick = async () => {

  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {

  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    // this.updateNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=d99c0d7e12524d13be4c84c98c585aae&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    setLoading(true);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);

    // this.setState({
    //   articles: this.state.articles.concat(parseData.articles),
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-3">
        NewsMonkey-Top {capitalizeFirstLetter(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader=<Spinner />
      >
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4" key={article.url}>
              <NewsItem
                title={article.title ? article.title.slice(0, 45) : ""}
                description={
                  article.description
                    ? article.description.substring(0, 100)
                    : ""
                }
                imgUrl={
                  article.urlToImage ||
                  "https://www.hindustantimes.com/ht-img/img/2023/10/16/1600x900/TOPSHOT-ISRAEL-PALESTINIAN-CONFLICT-GAZA-4_1697442400099_1697442438764.jpg"
                }
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
                source={article.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
    //Previous and next button

    // <div className="container d-flex justify-content-between mt-2">
    //   <button
    //     disabled={this.state.page <= 1}
    //     className="btn btn-dark"
    //     onClick={this.handlePrevClick}
    //   >
    //     <i class="fa-solid fa-left-long"></i> Previous
    //   </button>

    //   <button
    //     disabled={
    //       this.state.page + 1 >
    //       Math.ceil(this.state.totalResults / props.pageSize)
    //     }
    //     className="btn btn-dark"
    //     onClick={this.handleNextClick}
    //   >
    //     Next <i className="fa-solid fa-right-long"></i>
    //   </button>
    // </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
export default News;

// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 6,
//     category: "general",
//   };
//   static propTypes = {
//     country: PropTypes.string.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     category: PropTypes.string.isRequired,
//   };
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   // articles = [
//   //   {
//   //     source: { id: "news-com-au", name: "News.com.au" },
//   //     author: null,
//   //     title: "Aussie nightmare goes from bad to worse",
//   //     description:
//   //       "Welcome to news.com.au’s live coverage of Australia’s cricket World Cup contest against Sri Lanka from Lucknow, India.",
//   //     url: "https://www.news.com.au/sport/cricket/australia-vs-sri-lanka-live-updates-pat-cummins-rumour-officially-put-to-bed/news-story/eac103eedb42c7319de540dc6adaa654",
//   //     urlToImage:
//   //       "https://content.api.news/v3/images/bin/2f3a4db99eefacc03c73215c1cfd831d",
//   //     publishedAt: "2023-10-16T09:49:00Z",
//   //     content:
//   //       "Welcome to news.com.au’s live coverage of Australia’s cricket World Cup contest against Sri Lanka from Lucknow, India.\r\nThe Aussies enter the match having lost both opening matches, going down by six… [+5588 chars]",
//   //   },
//   //   {
//   //     source: { id: "bbc-sport", name: "BBC Sport" },
//   //     author: null,
//   //     title: "Cricket accepted for 2028 Olympics in Los Angeles",
//   //     description:
//   //       "Cricket will be part of the 2028 Olympics after International Olympic Committee members vote to include the sport for the Los Angeles Games.",
//   //     url: "http://www.bbc.co.uk/sport/olympics/67120460",
//   //     urlToImage:
//   //       "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/12CE/production/_131441840_eng2.jpg",
//   //     publishedAt: "2023-10-16T08:37:23.3318238Z",
//   //     content:
//   //       "Australia beat South Africa to lift the Women's T20 World Cup in Cape Town eight months ago\r\nCricket will be part of the Olympic programme for the first time since 1900 after International Olympic Co… [+1240 chars]",
//   //   },
//   //   {
//   //     source: { id: "bbc-sport", name: "BBC Sport" },
//   //     author: null,
//   //     title:
//   //       "World Cup: Sri Lanka bat v Australia with both sides seeking first win",
//   //     description:
//   //       "Follow live text, in-play video clips and radio commentary as Australia play Sri Lanka in the Men's Cricket World Cup 2023.",
//   //     url: "http://www.bbc.co.uk/sport/live/cricket/66858169",
//   //     urlToImage:
//   //       "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
//   //     publishedAt: "2023-10-16T08:37:22.4726625Z",
//   //     content:
//   //       "Australia: David Warner, Mitchell Marsh, Steven Smith, Marnus Labuschagne Josh Inglis (wk), Glenn Maxwell, Marcus Stoinis, Pat Cummins (c), Mitchell Starc, Adam Zampa, Josh Hazlewood. \r\nSri Lanka: Pa… [+205 chars]",
//   //   },
//   //   {
//   //     source: { id: "bbc-sport", name: "BBC Sport" },
//   //     author: null,
//   //     title: "England suffer shock defeat by Afghanistan",
//   //     description:
//   //       "Watch highlights as England suffer a shock 69-run defeat to Afghanistan in Delhi at the Cricket World Cup.",
//   //     url: "http://www.bbc.co.uk/sport/av/cricket/67118205",
//   //     urlToImage:
//   //       "https://ichef.bbci.co.uk/news/1024/cpsprodpb/15D8B/production/_131438498_p0glnzpw.jpg",
//   //     publishedAt: "2023-10-15T17:22:24.332501Z",
//   //     content:
//   //       "Watch highlights as England suffer a shock 69-run defeat to Afghanistan in Delhi at the Cricket World Cup. \r\nREPORT:England stunned by Afghanistan in damaging defeat\r\nAvailable to UK users only.",
//   //   },
//   //   {
//   //     source: { id: "talksport", name: "TalkSport" },
//   //     author: "Callum Vurley",
//   //     title:
//   //       "England beaten by Afganistan for first time ever as Cricket World Cup hopes in tatters...",
//   //     description:
//   //       "England’s Cricket World Cup hopes are in tatters as they suffered a humiliating first ever ODI defeat to Afghanistan. Afghanistan triumphed over England by 69 runs in Delhi on Sunday and also…",
//   //     url: "https://talksport.com/sport/cricket/1602655/england-cricket-afghanistan-defeat-world-cup/",
//   //     urlToImage:
//   //       "https://talksport.com/wp-content/uploads/sites/5/2023/10/SD-TALKSPORT-ENGLAND-AFGHANISTAN.jpg?strip=all&quality=100&w=1500&h=1000&crop=1",
//   //     publishedAt: "2023-10-15T16:03:45Z",
//   //     content:
//   //       "England's Cricket World Cup hopes are in tatters as they suffered a humiliating first ever ODI defeat to Afghanistan.\r\nAfghanistan triumphed over England by 69 runs in Delhi on Sunday and also claime… [+3360 chars]",
//   //   },
//   //   {
//   //     source: { id: "espn-cric-info", name: "ESPN Cric Info" },
//   //     author: null,
//   //     title:
//   //       "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//   //     description:
//   //       "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//   //     url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//   //     urlToImage:
//   //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//   //     publishedAt: "2020-04-27T11:41:47Z",
//   //     content:
//   //       "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
//   //   },
//   //   {
//   //     source: { id: "espn-cric-info", name: "ESPN Cric Info" },
//   //     author: null,
//   //     title:
//   //       "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//   //     description:
//   //       "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//   //     url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//   //     urlToImage:
//   //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//   //     publishedAt: "2020-03-30T15:26:05Z",
//   //     content:
//   //       "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
//   //   },
//   // ];
//   constructor(props) {
//     super(props);
//     this.state = {
//       // articles: this.articles,
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0,
//     };
//     document.title = `${this.capitalizeFirstLetter(
//       props.category
//     )}-NewsMonkey`;
//   }
//   updateNews = async () => {
//     props.setProgress(10);
//     console.log(props.category);
//     console.log(props.apiKey);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d99c0d7e12524d13be4c84c98c585aae&page=${this.state.page}&pageSize=${props.pageSize}`;

//     this.setState({ loading: true });
//     props.setProgress(30);

//     let data = await fetch(url);
//     props.setProgress(70);

//     let parseData = await data.json();
//     this.setState({
//       articles: parseData.articles,
//       totalResults: parseData.totalResults,
//       loading: false,
//     });
//     props.setProgress(100);
//   };
//   async componentDidMount() {
//     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=262af850b1764eb88dbfd9cb0112da73&page=1&pageSize=${props.pageSize}`;
//     // this.setState({ loading: true });
//     // let data = await fetch(url);
//     // let parseData = await data.json();
//     // this.setState({
//     //   articles: parseData.articles,
//     //   totalResults: parseData.totalResults,
//     //   loading: false,
//     // });
//     this.updateNews();
//   }
//   handlePrevClick = async () => {
//     // let url = `https://newsapi.org/v2/top-headlines?country=${
//     //   props.country
//     // }&category=${
//     //   props.category
//     // }&apiKey=262af850b1764eb88dbfd9cb0112da73&page=${
//     //   this.state.page - 1
//     // }&pageSize=${props.pageSize}`;
//     // this.setState({ loading: true });

//     // let data = await fetch(url);
//     // let parseData = await data.json();

//     // this.setState({
//     //   articles: parseData.articles,

//     //   page: this.state.page - 1,
//     //   loading: false,
//     // });

//     this.setState({
//       page: this.state.page - 1,
//     });
//     this.updateNews();
//   };

//   handleNextClick = async () => {
//     // if (
//     //   !(
//     //     this.state.page + 1 >
//     //     Math.ceil(this.state.totalResults / props.pageSize)
//     //   )
//     // ) {
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${
//     //     props.country
//     //   }&category=${
//     //     props.category
//     //   }&apiKey=262af850b1764eb88dbfd9cb0112da73&page=${
//     //     this.state.page + 1
//     //   }&pageSize=${props.pageSize}`;
//     //   this.setState({ loading: true });

//     //   let data = await fetch(url);
//     //   let parseData = await data.json();

//     //   this.setState({
//     //     articles: parseData.articles,
//     //     page: this.state.page + 1,
//     //     loading: false,
//     //   });
//     // }

//     this.setState({
//       page: this.state.page + 1,
//     });
//     this.updateNews();
//   };

//   fetchMoreData = async () => {
//     this.setState({ page: this.state.page + 1 });
//     // this.updateNews();
//     const url = `https://newsapi.org/v2/top-headlines?country=${
//       props.country
//     }&category=${
//       props.category
//     }&apiKey=d99c0d7e12524d13be4c84c98c585aae&page=${
//       this.state.page + 1
//     }&pageSize=${props.pageSize}`;
//     // this.setState({ loading: true });
//     let data = await fetch(url);
//     let parseData = await data.json();
//     this.setState({
//       articles: this.state.articles.concat(parseData.articles),
//       totalResults: parseData.totalResults,
//       loading: false,
//     });
//   };

//   render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center mb-3">
//           NewsMonkey-Top {this.capitalizeFirstLetter(props.category)}{" "}
//           headlines
//         </h1>
//         {this.state.loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader=<Spinner />
//         >
//           <div className="row">
//             {this.state.articles.map((article) => (
//               <div className="col-md-4" key={article.url}>
//                 <NewsItem
//                   title={article.title ? article.title.slice(0, 45) : ""}
//                   description={
//                     article.description
//                       ? article.description.substring(0, 100)
//                       : ""
//                   }
//                   imgUrl={
//                     article.urlToImage ||
//                     "https://www.hindustantimes.com/ht-img/img/2023/10/16/1600x900/TOPSHOT-ISRAEL-PALESTINIAN-CONFLICT-GAZA-4_1697442400099_1697442438764.jpg"
//                   }
//                   newsUrl={article.url}
//                   author={article.author}
//                   date={article.publishedAt}
//                   source={article.source.name}
//                 />
//               </div>
//             ))}
//           </div>
//         </InfiniteScroll>
//       </div>
//       //Previous and next button

//       // <div className="container d-flex justify-content-between mt-2">
//       //   <button
//       //     disabled={this.state.page <= 1}
//       //     className="btn btn-dark"
//       //     onClick={this.handlePrevClick}
//       //   >
//       //     <i class="fa-solid fa-left-long"></i> Previous
//       //   </button>

//       //   <button
//       //     disabled={
//       //       this.state.page + 1 >
//       //       Math.ceil(this.state.totalResults / props.pageSize)
//       //     }
//       //     className="btn btn-dark"
//       //     onClick={this.handleNextClick}
//       //   >
//       //     Next <i className="fa-solid fa-right-long"></i>
//       //   </button>
//       // </div>
//     );
//   }
// }

// export default News;
