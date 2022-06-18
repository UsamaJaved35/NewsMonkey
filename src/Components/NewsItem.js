import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,urlToImage,url,author,date,source}=this.props;
    return (
      <div>
        <div className='my-3'>
        <div className="card">
        <span className="badge rounded-pill text-bg-danger
        position-absolute top-1 translate middle" style={{display:'flex',
          justifyContent:'end',right: 0}}>{source}</span>
  <img src={!urlToImage?"https://cdn.cnn.com/cnnnext/dam/assets/220611125538-dom-phillips-and-bruno-pereira-split-super-tease.jpg":urlToImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-danger'>By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small> </p>
    <a href={url} className="btn btn-dark" target="_blank" rel="noopener noreferrer" >Read More</a>
  </div>
</div>
</div>
      </div>
    )
  }
}

export default NewsItem