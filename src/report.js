import React from 'react';
/*import ReactDOM from 'react-dom';*/

class ContentFeed extends React.Component {
    constructor(){
        super();

        this.state={
            'items': []
        }
    }
    componentDidMount(){
        this.getItems();
    }
    getItems(){
        fetch('http://localhost:4000/purchases')
        .then(results => results.json())
        .then(results => this.setState({'items': results}));
    }
    /*
    render(){
        return {
           
                {this.state.items.map(function(item, index) {
                    return {
                        <div key=
                    }
                }
                   
              
            
        }
    }
    */
}

/*ReactDOM.render(
    <ContentFeed />
    document.getElementById('root')
);*/