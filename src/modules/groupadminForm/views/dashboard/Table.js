import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Axios from 'axios';
import Editgroup from './Edit'
const columns = [
 
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Group_Admin_name', headerName: 'Group Admin name', width: 200 },
  { field: 'Group_Admin_ContactNumber', headerName: 'Contact Number', width: 200 },
  {
    field: 'Group_Admin_Email_id',
    headerName: 'Email',
    width: 200,
  },

  {
    field: 'Group_name',
    headerName: 'Groups',
    width: 160,

  },
  {
    field: 'Status',
    headerName: 'Status',
    width: 160,

  },
  
];



export default function DataGridDemo() {
  const path1 = "http://192.168.3.17"
  const [groups, setGroups] = useState([]);
  const [editform, setEditform] = useState(false);
  const [editData, setEditData] = useState([]);
  const groupFilterModel = {
    items: [{ columnField: '', operatorValue: '', value: '' }],
  };

  function TableData() {
    const url = path1+':4000/admin/group/viewGroup'

    Axios.post(url)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data));
        setGroups(response.data.data)

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
      {groups.length > 0 ? <DataGrid rows={groups.map(calls => ({
        ...calls,
        id: calls.G_ID
      }))} columns={columns} filterModel={groupFilterModel} components={{
        Toolbar: GridToolbar,
      }}
      pageSize={5} checkboxSelection
      onSelectionModelChange={(newSelection) => {


          const url = path1+':4000/admin/group/editGroup'


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
      {editData.length > 0 ? <Editgroup
        EditData={editData}
        TableData={TableData} /> : <></>}
    </div>
  );
}