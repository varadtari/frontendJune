// import React, { useState, useEffect } from 'react';
// import MaterialTable from 'material-table';

// function Skillwise() {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);

//   useEffect(() => {
//     fetchColumnsFromApi(); // Fetch columns from API when the component mounts
//     fetchData(); // Fetch initial data when the component mounts
//   }, []);

//   const fetchColumnsFromApi = () => {
//     // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch columns from the API
//     fetch("http://localhost:4000/api/excels/columns")
//       .then(response => response.json())
//       .then(columnsFromApi => {
//         setColumns(columnsFromApi); // Update the 'columns' state with the API response
//       })
//       .catch(error => {
//         console.error("Error fetching columns:", error);
//         setColumns([]); // Set empty columns in case of an error
//       });
//   };

//   const fetchData = (query = {}) => {
//     // Construct the API endpoint URL with query parameters
//     let url = 'http://localhost:4000/api/excels';
  
//     if (query.search) {
//       url += `?q=${query.search}`;
//     }
//     if (query.orderBy) {
//       url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
//     }
//     if (query.filters && query.filters.length) {
//       const filter = query.filters.map(filter => {
//         return `&${filter.column.field}${filter.operator}${filter.value}`;
//       });
//       url += filter.join('');
//     }
//     url += `&_page=${query.page + 1}`;
//     url += `&_limit=${query.pageSize}`;
  
//     return fetch(url)
//       .then(resp => resp.json())
//       .then(responseData => {
//         if (Array.isArray(responseData)) {
//           // Assuming the response data is an array of objects
//           setData(responseData);
//           setTotalRows(499); // Assuming you know the total number of rows from the API response
//           return { data: responseData, page: query.page, totalCount: 499 };
//         } else {
//           // If the API response is not as expected (e.g., not an array)
//           console.error("Invalid API response:", responseData);
//           setData([]); // Set empty data in case of an error
//           setTotalRows(0);
//           return { data: [], page: query.page, totalCount: 0 };
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         setData([]); // Set empty data in case of an error
//         setTotalRows(0);
//         return { data: [], page: query.page, totalCount: 0 };
//       });
//   };
  
//   return (
//     <div className="App">
//       <h1 align="center">React-App</h1>
//       <h4 align='center'>Implement Server-Side Pagination, Filter, Search, and Sorting in Material Table</h4>
//       {columns.length > 0 ? (
//         <MaterialTable
//           title="Olympic Data"
//           columns={columns.map(column => {
//             // Add a custom render function for specific headers
//             if (column.field === 'EMPLOYEE NAME' || column.field === 'FATHER NAME') {
//               return {
//                 ...column,
//                 render: rowData => <span>{rowData[column.field].toUpperCase()}</span>,
//               };
//             }
//             return column;
//           })}
//           options={{ debounceInterval: 700, padding: "dense", filtering: true }}
//           data={(query) =>
//             new Promise((resolve, reject) => {
//               fetchData(query).then(resolve);
//             })
//           }
//           totalCount={totalRows}
//         />
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// }

// export default Skillwise;
