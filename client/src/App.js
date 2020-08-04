import React, {Component} from 'react';

class App extends Component {

  state = {
    result: ''
  }

  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then((data) => {
        this.setState({result: data})
        console.log(result)
      })
      .catch(console.log)
  }

  render() {
    return (
    <div>
      <h1>Message from the front end: "hello World"</h1>
      <h2>Message from backend: {this.state.result}</h2>
    </div>
    );
  }
}

export default App;
