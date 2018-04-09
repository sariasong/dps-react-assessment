import React, {Component} from 'react';
import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { connect } from 'react-redux';
import '../cards.css';
import { 
  Card,  
} from 'semantic-ui-react';

class Beers extends Component {
  state = { beers: [] }

  componentDidMount() {
    const { dispatch } = this.props;
    axios.get('/api/all_beers')
    .then( res => {
      dispatch(setHeaders(res.headers));
      console.log(res);
      this.setState({ beers: res.data.entries }) 
    })
  }

  render() {
    const { beers } = this.state;
    return (
      <div>
          { this.state.beers.map( beer =>
            <Card 
              key={beer.id}
            >  
                <h2>{beer.name}</h2>
                <h3>{beer.description}</h3>
            </Card>
            )
          }
         
      </div>
    )
  }
}

export default connect()(Beers);