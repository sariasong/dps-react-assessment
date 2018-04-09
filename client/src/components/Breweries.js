import React, {Component} from 'react';
import axios from 'axios';
import { setHeaders } from '../actions/headers';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import '../cards.css';
import { 
  Card, 
  Image,
} from 'semantic-ui-react';

class Breweries extends Component {
  state = { breweries: [] }

  componentDidMount() {
    const { dispatch } = this.props;
    axios.get('/api/all_breweries')
    .then( res => {
      dispatch(setHeaders(res.headers));
      console.log(res);
      this.setState({ breweries: res.data.entries }) 
    })
  }

  loadFunch() {
    const { dispatch } = this.props;
    axios.get(`api/all_breweries?page=20&per_page=10`)
  }

  render() {
    const { breweries } = this.state;
    return (
      <div>
          { this.state.breweries.map( brewery =>
           <InfiniteScroll
           pageStart={0}
           loadMore={loadFunc}
           hasMore={true || false}
           loader={<div className="loader" key={0}>Loading ...</div>}
           useWindow={false}
       >
         
            <Card 
              key={brewery.id}
            >  
                <h2>{brewery.name}</h2>
                {/* <Image src={brewery.images} /> */}
                <h3>{brewery.description}</h3>
                <h3>{brewery.website}</h3>
            </Card>
            </InfiniteScroll>
            )
          }
         
      </div>
    )
  }
}

export default connect()(Breweries);