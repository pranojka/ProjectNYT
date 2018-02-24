class App extends React.Component{

                constructor(props){
                    super(props);

                    this.state={'urls':[]};
                    this.onSuccess=this.onSuccess.bind(this);
                }
                onSuccess(responseData){


                 let urls=[]   
            for (var i=0; i<20; i++){
                const doc=responseData.response.docs[i];
                urls.push(doc.web_url);
                
                }
                this.setState({'urls': urls});
            }


    

            
        
         
         
                              componentDidMount(){
                                         $.ajax({
                url:"https://api.nytimes.com/svc/archive/v1/2016/1.json",
                method: "GET",
                data:{
                "api-key": "603fd44d05be4c86abc3b8531459b25d"},
                
                
                success: this.onSuccess
                
                             });
                     }

         render(){
          return (<div> <Urls urls={this.state.urls}/>
          <ArticalDetails/>
        </div> );
        }

      }


function ArticalDetails(props){
  
  return(

  <div>
    ...
  </div>
  );
}


function Results(props){
  
  return(

  <div>
    <ArticlePreview url={props.urls[0]}>

  </ArticlePreview>
</div>

    );
}

class ArticlePreview extends React.Component {

   componentDidMount(){  
    $.ajax({       url: "https://www.linkpreview.net/"  
         method: 'GET',     
           data : {  
          'key': " 5a9158a7b416741792dd7ae022541678a701bcd5efc59", 
          'q': 'https://www.google.com'       }, 
                success : function(result){ 
              console.log(result);
    render(){
        return (
            <div>  
                <img src={props.img}/>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        );
    }
}

      function Urls(props){
        return (
          <div> 
            {
              props.urls.map(
                (url, index) => <Url key={index} url={url}/>
              )
            }
          </div>
        );
      }

      function Url(props){
        return <p><a href={props.url} target="_blank">{props.url}</a></p>;
      }

      function find(){
        const root = document.getElementById('root');
        ReactDOM.render(<App />,  root);
      }