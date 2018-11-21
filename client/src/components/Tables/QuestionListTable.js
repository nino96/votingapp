import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import history from '../../history';


class QuestionListTable extends Component {
  constructor(props){
      super(props);

  }

indexN=(cell, row, enumObject, index)=> {
    return (<div>{index+1}</div>) 
}


  render() {
    return (
      <div>
        <BootstrapTable  data={this.props.data} tableStyle={{marginBottom:'50px'}}  containerStyle={{width:'80%'}} striped={true} multiColumnSearch={true} search={true}   hover>
          <TableHeaderColumn dataField="any" dataFormat={this.indexN}>#</TableHeaderColumn>
          <TableHeaderColumn  dataField='questionName' dataSort={true} isKey={true}>
            Question Name
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default QuestionListTable;