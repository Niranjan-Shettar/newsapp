import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static props = {
    country:'in',
    pageSize:8,
    category:'general',
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
  capitalizefirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0

    }
    document.title=`${this.capitalizefirstletter(this.props.category)} - NewsBox`;
  }
  async updateNews(PageNo){
    this.props.setProgress(30);
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd983378363149059c1099909620d352&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
    this.props.setProgress(100);
}

  async componentDidMount(){
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd983378363149059c1099909620d352&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, 
    //                 totalResults:parsedData.totalResults,
    //                 loading:false
                  
    //               })
    this.updateNews();

}
  handlePreviousClick= async ()=>{
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd983378363149059c1099909620d352&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({page:this.state.page - 1})
    this.updateNews();
    

  }

  handleNextClick= async ()=>{
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //   console.log("Next");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd983378363149059c1099909620d352&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
    
  //   let parsedData = await data.json()
    
  //   this.setState({
  //     page:this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   })
  // }
  this.setState({page:this.state.page + 1})
  this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd983378363149059c1099909620d352&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
    })

  }
  render() {
    return (
      <>
        <h1 style={{margin:'35px 0px',marginTop:'80px'}}className="text-center">NewsBox-Top {this.capitalizefirstletter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title ? element.title:""} description={element.description ? element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>

        })}
            
       
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-4">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}> &larr;Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} rel="noreferer"type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
        
      </>
    )
  }
}

export default News
