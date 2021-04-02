import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Axios from 'axios';
// import Editagent from './EditAgent'
const columns = [

  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'agentCallDispositionStatus', headerName: 'agentCallDispositionStatus', width: 130 },
  { field: 'agentCallType', headerName: 'agentCallType', width: 200 },
  {
    field: 'agentCallUniqueId',
    headerName: 'agentCallUniqueId',
    width: 200,
  },
  {
    field: 'agentCallEvent',
    headerName: 'agentCallEvent',
    width: 160,

  },
  {
    field: 'agentID',
    headerName: 'agentID',
    width: 160,

  },
  {
    field: 'breakStatus',
    headerName: 'breakStatus',
    width: 160,

  },
  {
    field: 'agenttype',
    headerName: 'agenttype',
    width: 160,

  },
];



export default function DataGridDemo() {
  const [agents, setAgents] = useState([]);
  const [editform, setEditform] = useState(false);
  const [editData, setEditData] = useState([]);

  function TableData() {
    const url = 'https://localhost:42004/crm/currentstatuses'

    Axios.get(url)
      .then(function (response) {
        console.log("table", response.data.items);
        //   const filteredData=response.data.items
        //  filteredData = ALFDATA.filter(data => data.= startDate.toISOString().substring(0, 10) )
        setAgents(response.data.items)

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
        id: calls._id
      }))} columns={columns} pageSize={5}
        onSelectionChange={(newSelection) => {


          const url = 'http://106.51.86.75:4000/admin/agent/getAgent'


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

    </div>
  );
}