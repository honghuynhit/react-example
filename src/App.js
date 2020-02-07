import React, { Component } from 'react'
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText  } from 'reactstrap'

import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import Header from './Components/Header/Header'
import ExportExcel from './Components/Export/ExportExcel'
import { CSVLink } from "react-csv"
import axios from 'axios';


class App extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('http://127.0.0.1:8081/api/posts/')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let file = document.getElementById('exampleFile');
    if(file){
      fileList = file.files[0];
    } 
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      alert('chỉ chấp nhận file excel!')
      return false;
    }
    var formData = new FormData();
    formData.append("fileList", fileList);
    axios.post('http://127.0.0.1:8081/api/upload_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(res=>{
      console.log(res)
      alert('ok')
    })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Header></Header>
        <Row>
          <Col>
            <h1 className="text-center pt-3">DATA TABLE</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
        
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          multiple={false}
          />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        </Row>
        <Row>
            <Button className="btn btn-secondary mr-2 square" onClick={this.fileHandler}>START IMPORT</Button>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary square"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ExportExcel csvData={this.state.items} fileName='test'></ExportExcel>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
        </Row>
      </Container>
    )
  }
}

export default App