import Axios from 'axios';
import React, { useEffect } from 'react'

export default function Fvalidation() {
    const [userList, setUserList] = React.useState([]); 
    async function generate() {
        try {
          
          let response = await Axios.get(
            `http://localhost:4000/api/excels/filter`
          );
          let userData=response.data.data
          userData=userData.filter(item =>item.readyForValidation)
          
          console.log("userdata",userData)
          setUserList(userData)
        }
          
        catch(error){
console.error("error", error);
        }
        }
        useEffect(()=>{
            generate()
    
        },[])
        async function handleApproval(e,user){
            let response=await Axios.put(`http://localhost:4000/api/excels/updateUser/${user._id}`,{validated:e.target.checked})// for supervisor send approved: boolean
   
        }
  return (
    
    <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Approval</th>
            </tr>
            {
                userList.map((obj, count) =><tr>
                    <td>{count}</td>
                    <td>{obj["EMPLOYEE NAME"]}</td>
                    <td><input onChange={(e)=>{handleApproval(e,obj)}} className='' type='checkbox'/></td>
                    {/* no need of conditional renderring */}
                </tr>)
            }
        </table>
    </div>
  )
}
