import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Axios from 'axios';
import Editagent from './EditAgent'
const columns = [

  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'EmployeeName', headerName: 'Agent name', width: 130 },
  { field: 'External_num', headerName: 'Contact Number', width: 200 },
  {
    field: 'EmailID',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'AgentType',
    headerName: 'Agent Type',
    width: 160,

  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 160,

  },
  {
    field: 'currentserver',
    headerName: 'Server',
    width: 160,

  },
  {
    field: 'agentCallDispositionStatus',
    headerName: 'agentCallDispositionStatus',
    width: 160,

  },
  {
    field: 'agentCallStatus',
    headerName: 'agentCallStatus',
    width: 160,

  },

];



export default function DataGridDemo() {
  const path3 = "http://192.168.3.17"
  const [agents, setAgents] = useState([]);
  const [editform, setEditform] = useState(false);
  const [data, setData] = useState(false);
  const [editData, setEditData] = useState([]);
  const [newSelection, setSelection] = useState();

  const riceFilterModel = {
    items: [{ columnField: '', operatorValue: '', value: '' }],
  };
  function TableData() {
    const url = path3+':4000/admin/agent/viewAgent1'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log("agent", response);
        setAgents(response.data.data)
        setData(true);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    TableData()


  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {data === true ? <DataGrid rows={agents.map(calls => ({
        ...calls,
        id: calls.UserID
      }))} columns={columns} filterModel={riceFilterModel} components={{
        Toolbar: GridToolbar,
      }} pageSize={5} checkboxSelection


        onSelectionModelChange={(newSelection) => {
          // alert("onclick")
          console.log("click", newSelection);

          setSelection(newSelection.selectionModel);

          const url = path3+':4000/admin/agent/getAgent'


          Axios.post(url, newSelection)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              if (response.data.status === 200) {
                setEditform(true)
                setEditData(response.data.data)
              }

            })

          // newSelection={newSelection}
        }} /> : <></>}
      {editData.length > 0 ? <Editagent
        EditData={editData}
        TableData={TableData} /> : <></>}
    </div>
  );
}