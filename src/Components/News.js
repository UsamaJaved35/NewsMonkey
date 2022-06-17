import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps={
        country:"us",
        pageSize:8,
        category:'general'

    }
    // static propTypes={
    //     country:PropTypes.string,
    //     pageSize:PropTypes.number,
    //     category:PropTypes.string
    // }
    capitalizeFirstLetter(str)
    {
         return  str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - News Monkey`;
    }
    async updateNews()
    {
        try {
            this.setState({
                loading:true
            })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f59568bada2a4292acd6c7f2dd19ffb5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                loading: false,
               totalResults:parsedData.totalResults 
            });
        }
        catch (e) {
            console.log("something is not working");
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
                <div className='container my-4'>
                    <h1 className='text-center'>News Monkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                    {this.state.loading&&<Spinner/>}
                    <div className='row'>
                        {!(this.state.loading) && this.state.articles.map((element) => {
                            return <div className='col-md-4 my-4' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""}
                                    description={element.description ? element.description.slice(0, 40) : ""}
                                    urlToImage={element.urlToImage} author={element.author} date={element.publishedAt}
                                    url={element.url} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    {!(this.state.loading)&&
                    <div className='contanier d-flex justify-content-around'>
                        <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-dark"> &larr; Previous</button>
                        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                        }
                </div>
            </div>
        )
    }
}
export default News