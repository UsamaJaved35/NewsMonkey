import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
function News(props){
   const capitalizeFirstLetter=(str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0) 
     document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;
   const updateNews = async()=> {
        try {
            props.setProgress(10)
            setloading(true);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${ page}&pageSize=${props.pageSize}`;
            props.setProgress(20)
            let data = await fetch(url);
            props.setProgress(50)
            let parsedData = await data.json();
            props.setProgress(70)
            setarticles(parsedData.articles);
            console.log('1',articles)
            setloading(false);
            settotalResults(parsedData.totalResults);
            props.setProgress(100)
        }
        catch (e) {
            console.log("something is not working");
        }
    }
    const fetchMoreData= async()=>
    {
           if(!( page > Math.ceil( totalResults/props.pageSize))){
            setloading(true)
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log('1',parsedData.articles)
            setpage(page+1)
            setarticles(articles.concat(parsedData.articles))
            setloading(false)
        }
    }
    useEffect(() => {   
      updateNews()
    }, [])
   const handlePrev = async () => {
        setpage(page-1);
        updateNews();
    }
    const handleNext = async () => {
        setpage(page+1);
        updateNews();
    }
        return (
            <div>
                    <h1 className='text-center' style={{margin: '70px 0 0'}}
                     >News Monkey-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                    <InfiniteScroll
                        dataLength={ articles.length}
                        next={fetchMoreData()}
                        inverse={true} //
                        hasMore={articles.length!== totalResults.length}
                        loader={<Spinner/>}
                        scrollableTarget="scrollableDiv"
                    > 
                         { loading&&<Spinner/>}
                        <div className='container my-4'>
                        <div className='row'>
                            {  articles.map((element,index) => {
                                return <div className='col-md-4 my-4' key={index}>
                                    <NewsItem title={element.title}
                                        description={element.description}
                                        urlToImage={element.urlToImage} author={element.author} date={element.publishedAt}
                                        url={element.url} source={element.source.name} />
                                </div>
                            })}
                        </div>
                        </div>
                     </InfiniteScroll> 
                    {/* {!( loading)&&
                    <div className='contanier d-flex justify-content-around'>
                        <button type="button" disabled={ page <= 1} onClick={this.handlePrev} className="btn btn-dark"> &larr; Previous</button>
                        <button type="button" disabled={ page+1 > Math.ceil( totalResults/props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                        } */}
                </div>
        )
}
News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: 'general'

}
// News.propTypes={
//     country:PropTypes.string,
//     pageSize:PropTypes.number,
//     category:PropTypes.string
// }
export default News