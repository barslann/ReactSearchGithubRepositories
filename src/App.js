import React,{useState} from 'react';
import { useTable } from 'react-table'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  
  

  const fetchData = () =>{
    const url = `https://api.github.com/search/repositories?q=${keyword}`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.items)
      });
  }

  const handleChange = (e) =>{
    setKeyword(e.target.value);
  }

  // const tableRows = data.map((item,index) =>
  //   <tr key = {index}>
  //     <td>{item.full_name}</td>
  //     <td><a href={item.html_url}>{item.html_url}</a></td>
  //   </tr>
  // );

  const columns = React.useMemo(
    () =>[
    {
      Header: 'Name', //Header of the column
      accessor: 'full_name' //accessor is the "key" in the data
    },{
      Header:'URL',
      accessor:'html_url'
    },
    {
      Header:'owner',
      accessor:'owner.login'
    }
  ],[])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div className="App">
        <input type="text" onChange={handleChange}/>
        <button onClick= {fetchData} value={keyword}>fetch</button>
        {/* <table>
          <tbody>
            {tableRows}
          </tbody>
        </table> */}
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
    </div>
  );
}

export default App;
