import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
    field: 'GroupName',
    headerName: 'Groups',
    width: 160,

  },
];



export default function DataGridDemo() {
  const [agents, setAgents] = useState([]);
  const [editform, setEditform] = useState(false);
  const [editData, setEditData] = useState([]);

  function TableData() {
    const url = 'http://192.168.3.17:4000/admin/agent/viewAgent'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        // console.log(JSON.stringify(response.data.data));
        setAgents(response.data.data)

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
      {agents.length > 0 ? <DataGrid rows={agents.map(calls => ({
        ...calls,
        id: calls.UserID
      }))} columns={columns} pageSize={5} checkboxSelection
        onSelectionChange={(newSelection) => {


          const url = 'http://192.168.3.17:4000/admin/agent/getAgent'


          Axios.post(url, newSelection)
            .then(function (response) {
              // console.log(JSON.stringify(response.data));
              if (response.data.status === 200) {
                setEditform(true)
                setEditData(response.data.data)
              }

            })
          // setSelection(newSelection.rowIds);
        }} /> : <></>}
      {editData.length > 0 ? <Editagent
        EditData={editData}
        TableData={TableData} /> : <></>}
    </div>
  );
}