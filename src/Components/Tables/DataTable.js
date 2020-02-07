import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import axios from 'axios';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      let form_data = new FormData();
      form_data.append('id', id);
      form_data.append('delete_flag', true);
      let url = 'http://localhost:8081/api/posts/';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(res => {
        if(res.status === 200)
          this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map((item, idx) => {
      return (
        <tr key={item.id}>
          <th scope="row">{idx}</th>
          <th>{item.id}</th>
          <td>{item.title}</td>
          <td>{item.content}</td>
          <td>{item.image}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" className="square" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable