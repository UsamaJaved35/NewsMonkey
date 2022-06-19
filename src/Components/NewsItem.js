import React from 'react'
function NewsItem(props) {
    return (
      <div>
        <div className='my-3'>
        <div className="card">
        <span className="badge rounded-pill text-bg-danger
        position-absolute top-1 translate middle" style={{display:'flex',
          justifyContent:'end',right: 0}}>{props.source}</span>
  <img src={!props.urlToImage?"https://static.toiimg.com/photo/msid-86905941/86905941.jpg?pl=37494":props.urlToImage} className="card-img-top" alt="https://static.toiimg.com/photo/msid-86905941/86905941.jpg?pl=37494"/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <p className='card-text'><small className='text-danger'>By {!props.author?"Unknown":props.author} on {new Date(props.date).toGMTString()} </small> </p>
    <a href={props.url} className="btn btn-dark" target="_blank" rel="noopener noreferrer" >Read More</a>
  </div>
</div>
</div>
      </div>
    )
}

export default NewsItem