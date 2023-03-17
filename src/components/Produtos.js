import React, { Component } from "react";
import ProdutoItem from "./ProdutoItem";
import axios from "axios";

export class Produtos extends Component {
  state = {
    produtos: [],
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get("https://conteudodoc.azurewebsites.net/wp-json/wp/v2/produtos")
      .then((res) =>
        this.setState({
          produtos: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { produtos, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          {produtos.map((produto) => (
            <ProdutoItem key={produto.id} produto={produto} />
          ))}
        </div>
      );
    }

    return <h3>Loading...</h3>;
  }
}

export default Produtos;
