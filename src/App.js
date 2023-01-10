
import { useEffect, useState } from 'react';
import './App.css';
import SingtelTable from './components/singtel-table';



function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => { 
        const userResponse = json.users.filter((e, i) => i < 3);
        console.log(userResponse)
        setUsers(userResponse)
      })
  },[])

  const tableConfig = {
    selectionType: 'multi',
    isSelection: true,
    isSortable: true,
    headers: [
      { value: "First Name", key: 'firstName' },
      { value: "Last Name", key: 'lastName' },
      { value: "Gender", key: 'gender' },
      { value: "Domain", key: 'domain' },
      { value: "Phone", key: 'phone' },
      { value: "University", key: 'university' },
    ]
  }

  return (
    <div className="App">
      {!!users.length && <SingtelTable
        tableConfig={tableConfig}
        rowData={users}
        getSelectedRow={(data) => {console.log(data)}}
        title={"User Details"}
      />}
    </div>
  );
}

export default App;
