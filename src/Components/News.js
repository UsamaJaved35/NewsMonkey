import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: 'general'

    }
    // static propTypes={
    //     country:PropTypes.string,
    //     pageSize:PropTypes.number,
    //     category:PropTypes.string
    // }
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`;
    }
    async updateNews() {
        try {
            this.props.setProgress(10)
            this.setState({
                loading: true
            })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.props.setProgress(20)
            let data = await fetch(url);
            this.props.setProgress(50)
            let parsedData = await data.json();
            this.props.setProgress(70)
            this.setState({
                articles: parsedData.articles,
                loading: false,
                totalResults:parsedData.totalResults
            });
            this.props.setProgress(100)
        }
        catch (e) {
            console.log("something is not working");
        }
    }
     fetchMoreData= async()=>
    {
            // this.setState.page+=1;
           // this.state.page +=this.state.page;
           if(!(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize))){
            this.setState({
                loading:true
            })
           console.log('ni aya'+this.state.page)
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({
                page: this.state.page + 1,
            });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                loading: false,
            });
        }
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrev = async () => {
        this.setState({
            page: this.state.page - 1,
        });
        this.updateNews();
    }
    handleNext = async () => {
        this.setState({
            page: this.state.page + 1,
        });
        this.updateNews();
    }
    render() {
        return (
            <div>
                    <h1 className='text-center'>News Monkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData()}
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        inverse={true} //
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner/>}
                        scrollableTarget="scrollableDiv"
                    > 
                         {this.state.loading&&<Spinner/>}
                        <div className='container my-4'>
                        <div className='row'>
                            { this.state.articles.map((element,index) => {
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
                    {/* {!(this.state.loading)&&
                    <div className='contanier d-flex justify-content-around'>
                        <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-dark"> &larr; Previous</button>
                        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                        } */}
                </div>
        )
    }
}
export default News