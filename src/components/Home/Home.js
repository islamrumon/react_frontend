import React, { Component } from 'react'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        };
      }

    componentDidMount() {
        const apiUrl = 'http://127.0.0.1:8000/api/products';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.data
        });
      });
      }

    render() {
        const { items } = this.state;
        return (
            <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">price</th>
      <th scope="col">image</th>
    </tr>
  </thead>
  <tbody>
  {items.map(item => (
               <tr>
               <th scope="row">1</th>
               <td>{item.title}</td>
               <td>{item.description}</td>
               <td>{item.price}</td>
               <td><img src={item.image}  width="80" height="80"/></td>
             </tr>
              ))}
    
    
  </tbody>
</table>
          );
    }
}
