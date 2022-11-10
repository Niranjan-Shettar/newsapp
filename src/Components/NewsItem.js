import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let{title,description,imageurl,newsurl,author,date,source} = this.props
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageurl?"https:/images.hindustantimes.com/tech/img/2022/09/09/1600x900/22-03781_dart-didymos-image-for-press-release_2_v03_1662701808919_1662701843080_1662701843080.jpg":imageurl} class="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source} </span></h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date (date).toGMTString}</small></p>
                <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
