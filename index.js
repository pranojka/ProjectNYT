class Link extends React.Component {
  constructor(props) {
      super(props);
      this.setData=this.setData.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleMonthChange = this.handleMonthChange.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleArticleClick = this.handleArticleClick.bind(this);
      this.state = {
          allArticles: {},
          year: '1851',
          month: '1',
          pageSize: 20,
          selectedArticle: {}
      };
  }

  setData(data) {
      const links = data.response.docs;
      this.setState(() => ({ allArticles: links }));
  }
  
  handleMonthChange(e) {
      const month = e.target.value;
      console.log(month);
      this.setState(() => ({ month: month }));
  }
  
  handleYearChange(e) {
      const year = e.target.value;
      this.setState(() => ({ year: year }));
  }
  handleSubmit(e) {
      e.preventDefault();
      const year = this.state.year;
      const month = this.state.month;

      console.log(year, month);
      var url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
      url += '?' + $.param({
      'api-key': "b7c8b553a6284a30bbbbf898f3af2212"
      });

      $.ajax({
          url: url,
          method: 'GET',
          success: this.setData,
          error: this.setError
      });
  }

  handleArticleClick(selectedArticle) {
      this.setState(() => ({ selectedArticle: selectedArticle }));
  }

  render() {
    let selectedArticles;
    const currentYear = new Date().getFullYear();
    if( !!Object.keys(this.state.allArticles).length ) {
      selectedArticles = this.state.allArticles.slice(0, this.state.pageSize);
    }

    const jsx = (
      <div id="page">
        <header id="header">
          <h1>NYT Explorer</h1>
          <form onSubmit={this.handleSubmit}>
          <p>Chose the date: </p>
            <input
              id="month" 
              type="number" 
              min="1" 
              max="12" 
              placeholder="Month" 
              onChange={this.handleMonthChange} 
              value={this.state.month} 
            /> 
            <input 
              id="year" 
              type="number" 
              min="1851" 
              max={currentYear}  
              placeholder="Year" 
              onChange={this.handleYearChange} 
              value={this.state.year}
            />
            <input type="submit" value="Find" />
          </form>
        </header>
        <main id="main">
          {
            !!Object.keys(this.state.allArticles).length && 
            <div>
              <Preview
                selectedArticles={selectedArticles}
                handleArticleClick={this.handleArticleClick}
              />
              <ArticleDetails selectedArticle={this.state.selectedArticle}/> 
            </div>
          }
        </main>
        <footer id ="footer">
          <p>Data provided by NY Times API</p>
          <p>Links preview by Link Preview API</p>
          <p>&copy; Jovana Pranic 2018</p>
        </footer>
      </div>
    );
    
    return jsx;
  }
}

class Preview extends React.Component {
  render(){
    const links=this.props.selectedArticles;
    return (
      <div id="gallery">
          {
            links.map( (article) => {
                return <Article handleArticleClick={this.props.handleArticleClick} link={article} key={article._id} url={article.web_url} />;
            } )
          }
      </div>
    );
  }
}

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.state = {
        details: {}
    };
  }

  componentDidMount() {
    const key = '5a9158a7b416741792dd7ae022541678a701bcd5efc59';
   // const url = `https://api.linkpreview.net/?key=${key}&q=${this.props.url}`;
     const url = `http://api.linkpreview.net/?key=123456&q=https://www.google.com`
  
    $.ajax({
        url: url,
        method: 'GET',
        success: this.setData,
        error: this.setError
    });
  }

  handleArticleClick() {
    // console.log(this.props.link);
    const selectedArticle = this.props.link;
    this.props.handleArticleClick(selectedArticle);
  }

  setData(data) {
    const details = data;
    this.setState(() => ({ details: details }));
  }
  render(){
    const link = this.props.link;
    
    return(
        <div className="single-article" onClick={this.handleArticleClick}>
          <div>
            <img src={this.state.details.image} alt="PIP"/>
            <h4>{this.state.details.title}</h4>
            <p>{this.state.details.description}</p>
          </div>
        </div>
      
    );
  }
} 


class ArticleDetails extends React.Component {
  render() {
    const thisArticle = this.props.selectedArticle;
    console.log(thisArticle.headline);
    return (
        <div id="details" className="visible" >
            <h2> Artickle Details:</h2>
            {
              !!Object.keys(thisArticle).length &&
              <ul>
              <li>Headline: {thisArticle.headline.main}</li>
                <li>Snippet: {thisArticle.snippet}</li>
                
                <li>Word Count: {thisArticle.word_count}</li>
              </ul>
            }
        </div>
    );
  }
} 

ReactDOM.render(<Link />, document.getElementById('root'));