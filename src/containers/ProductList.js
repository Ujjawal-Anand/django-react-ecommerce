import React from 'react';
import axios from 'axios';
import { Message, Button, Loader, Segment, Container, Icon, Image, Item, Label } from 'semantic-ui-react'

import { productListURL, addToCartURL } from '../constants';
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";
import { connect } from 'react-redux';

class ProductList extends React.Component {

    state = {
        loading: false,
        error: null,
        data: []
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get(productListURL)
            .then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                })
                console.log(this.state.data)
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false
                })
            })
    }

    handleAddToCart = slug => {
      this.setState({ loading: true })
      authAxios.post(addToCartURL, { slug })
      .then(res => {
        this.props.refereshCart();
        this.setState({loading: false})
      })
      .catch(err => {
        this.setState({error: err, loading: false})
      });
    };


    render() {
const paragraph = <Image src='/images/wireframe/short-paragraph.png' />
const { loading, data, error } = this.state;
return (
    <Container 
    style={{ margin: "5em 0em 0em"}}>
        {loading && (
              <Segment>
              <Loader active />
          
              <Image src='/images/wireframe/short-paragraph.png' />
            </Segment>
          
        ) }

        { error && (
              <Message
              error
              header='There was some errors with your submission'
              content={JSON.stringify(error)}
            />
        )}
  <Item.Group divided>
    {data.map(item => {
        return (
            <Item key={item.id}>
      <Item.Image src={item.image} />

      <Item.Content>
        <Item.Header 
          as='a'
          onClick={() => this.props.history.push(`/products/${item.id}`)}
        >{item.title}</Item.Header>
        <Item.Meta>
        <span className='cinema'>{item.category}</span>
        </Item.Meta>
        <Item.Description>{item.description}</Item.Description>
        <Item.Extra>
          {/* <Button primary floated='right'>
            Add to cart 
            <Icon name='cart plus' />
        </Button> */}
        {item.discount_price && (
           <Label
              color={
              item.label === "primary"
               ? "blue"
               : item.label === "secondary"
               ? "green"
               : "olive"
              }
            >
              {item.label}
            </Label>
        )}
        <Label>Price: ${item.price}</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
        );
    })}
  </Item.Group>
  </Container>
)
    }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

export default connect(
  null,
  mapDispatchToProps
  )(ProductList);
