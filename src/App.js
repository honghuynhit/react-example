import React, { Component } from 'react'


class App extends Component{

  state = {
    todos: []
  }
  // constructor(props){
  //   super(props);
  //   this.state = { list };
  // }
  async componentDidMount(){
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
      const todos = await res.json();
      console.log(todos)
      this.setState({
        todos
      })
    } catch (e) {
      console.log(e)
    }
  }


  render(){
    return(
      <div>
        {this.state.todos.map(item =>(
          <div key={item} id={item.id} className="test">
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default App;