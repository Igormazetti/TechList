import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  // Os states são elementos que serão alterados na tela
  // Os estates são imutáveis, por isso utiliza-se o setState ao invés
  // dos comandos normais do JavaScript
  state = {
    newTech: "",
    techs: [],
  };

  // Métodos do ciclo de vida de um componente
  componentDidMount() {
    // Executado assim que o componente aparece em tela
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Executado sempre que houver alterações nas props ou estado
    // this.props, this.state
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  componentWillUnmount() {
    // Executado quando o componente deixa de existir
  }

  handleInputChange = (e) => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: "",
    });
  };

  handleDelete = (tech) => {
    // Utilizar o método filter para remover um estado
    this.setState({
      techs: this.state.techs.filter((t) => t !== tech),
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map((tech) => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
