import React from 'react';
import axios from 'axios';
import { Message, Button, Loader, Segment, Container, Icon, Image, Item, Label } from 'semantic-ui-react'

import { productListURL } from '../constants'
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
    {data.map(product => {
        return (
            <Item key={product.id}>
      <Item.Image src={product.image} />

      <Item.Content>
        <Item.Header as='a'>{product.title}</Item.Header>
        <Item.Meta>
        <span className='cinema'>{product.category}</span>
        </Item.Meta>
        <Item.Description>{product.description}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Add to cart 
            <Icon name='cart plus' />
          </Button>
        <Label>Price: ${product.price}</Label>
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

export default ProductList
