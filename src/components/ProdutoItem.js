import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export class ProdutoItem extends Component {
  state = {
    imgUrl: "",
    author: "",
    isLoaded: false,
  };

  static propTypes = {
    produto: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { featured_media, author } = this.props.produto;
    const getImageUrl = axios.get(`https://conteudodoc.azurewebsites.net/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = axios.get(`https://conteudodoc.azurewebsites.net/wp-json/wp/v2/users/${author}`);
    Promise.all([getImageUrl, getAuthor]).then((res) => {
        console.log('Resultado -->', res);
      this.setState({
        imgUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[0].data.name,
        isLoaded: true,
      });
    });
  }

  render() {
    const { title, acf, excerpt } = this.props.produto;
    const { author, imgUrl, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          <h1 style={{ marginBottom: "0" }}>{title.rendered}</h1>
          <img
            style={{ width: "20%" }}
            src={'https://conteudodoc.azurewebsites.net/' + imgUrl}
            alt={title.rendered}
          />
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
          <p>Princípio ativo: {acf.principio_ativo}</p>
          <p>Apresentação: {acf.apresentacao}</p>
          {/* <p >Informações: {acf.informacoes}</p> */}
          <div style={{ width: "80%", marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: acf.informacoes }}></div>
          <div style={{ width: "80%", marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: acf.apresentacoes }}></div>
          <a href="">Download Bula!!</a>
          {/* <small>Reviwed by <strong>{author}</strong></small> */}
        </div>
      );
    }

    return null;
  }
}

export default ProdutoItem;
