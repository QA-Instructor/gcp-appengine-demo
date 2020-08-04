import React, {Component} from 'react';

class App extends Component {

  state = {
    result: []
  }

  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then((data) => {
        this.setState({result: data})
      })
      .catch(console.log)
  }

  render() {
    return (
    <h2>{this.state.result}</h2>
    );
  }
}

export default App;
