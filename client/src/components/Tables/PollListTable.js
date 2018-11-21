import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import history from '../../history';
import {ToastContainer, ToastStore} from 'react-toasts';

class PollListTable extends Component {
  constructor(props){
      super(props);

  }

  onClickChartButton(cell, row, rowIndex){
        history.push(`/pollResult/${row.pollid}`);
        console.log('Chart Button '+ row);
    }
  
  onClickEditButton(cell,row, rowIndex){
    
    localStorage.setItem('pollid', row.pollid);
    history.push('/addQuestions')
  }

  onClickClosePollButton(cell, row, rowIndex){
    fetch(`http://localhost:3002/api/closePoll`, {
      method: 'POST',
      headers: new Headers({'Content-Type':'application/json'}),
      body: JSON.stringify({"pollid":row.pollid})
  }).then(res => res.json())
  .then(jsonData => {
      ToastStore.success("Poll Closed", 1500);
    //   row.closePollButton.disabled = true;
    //   row.editButton.disabled = true;
      
  })
      console.log('Close Poll Button : '+row.toString());
  }
 
  chartButton(cell, row, enumObject, rowIndex) {
        return (
            <Button 
            type="button"
            disabled={false} 
            onClick={() => 
            this.onClickChartButton(cell, row, rowIndex)}
            >
            View Results
            </Button>
        )
    }

    editButton(cell, row, enumObject, rowIndex) {
      return (
          <Button 
          type="button"
          disabled={false}
          onClick={() => 
          this.onClickEditButton(cell, row, rowIndex)}
          >
          Edit
          </Button>
      )
  }

 
 
   closePollButton(cell, row, enumObject, rowIndex) {
        return (
            <Button 
            type="button"
            disabled={false} 
            onClick={() => 
            this.onClickClosePollButton(cell, row, rowIndex)}
            >
            Close Poll
            </Button>
        )
    }

  render() {
    return (
      <div>
        <BootstrapTable  data={this.props.data} tableStyle={{marginBottom:'50px'}}  containerStyle={{width:'80%'}} striped={true} multiColumnSearch={true} search={true}   hover>
          <TableHeaderColumn isKey dataField='pollid' dataSort={true}>
            Poll ID
          </TableHeaderColumn>
          <TableHeaderColumn  dataField='name' dataSort={true}>
            Poll Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='editButton' dataFormat={this.editButton.bind(this)} dataAlign="center" tdStyle={{whiteSpace: 'normal'}} >Edit</TableHeaderColumn>
          <TableHeaderColumn dataField='chartButton' dataFormat={this.chartButton.bind(this)} dataAlign="center" tdStyle={{whiteSpace: 'normal'}} >Chart</TableHeaderColumn>
          <TableHeaderColumn dataField='closePollButton' dataFormat={this.closePollButton.bind(this)} dataAlign="center" tdStyle={{whiteSpace: 'normal'}}>Close</TableHeaderColumn>
        </BootstrapTable>

        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore}/>
      </div>
    );
  }
}

export default PollListTable;