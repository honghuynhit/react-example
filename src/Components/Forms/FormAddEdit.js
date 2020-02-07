import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    title: '',
    content: '',
    image: null
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  submitFormAdd = e => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://localhost:8081/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      this.props.addItemToState(res.data)
      this.props.toggle()
    })
    .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('id', this.state.id);
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://localhost:8081/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      this.props.updateState(res.data)
      this.props.toggle()
    })
    .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, title, content, image } = this.props.item
      this.setState({ id, title, content, image })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" onChange={this.onChange} value={this.state.title === null ? '' : this.state.title} />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input type="text" name="content" id="content" onChange={this.onChange} value={this.state.content === null ? '' : this.state.content}  />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={this.handleImageChange} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm