import React, { useEffect } from 'react';
import Axios from "axios";
export default function Svalidation() {
    const [userList, setUserList] = React.useState([]); 
    async function generate() {
        try {
          
          let response = await Axios.get(
            `http://localhost:4000/api/excels/filter`
          );
          let userData=response.data.data
          userData=userData.filter(item =>!item.readyForValidation).map((item)=>{//filter condition =>item.readyForValidation, & no need of map
            let skillsDone=0
            item?.skills?.forEach((skill)=>{
                if(skill.level=="2.Trained and can work under observation")
                skillsDone=skillsDone+1
            })
            return {...item,readyForValidationTemp:!!item.skills?.length && item.skills?.length==skillsDone}
          })
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
            let response=await Axios.put(`http://localhost:4000/api/excels/updateUser/${user._id}`,{readyForValidation:e.target.checked})// for supervisor send approved: boolean
   
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
                    <td>{obj.readyForValidationTemp?<input onChange={(e)=>{handleApproval(e,obj)}} className='' type='checkbox'/>:null}</td>
                    {/* no need of conditional renderring */}
                </tr>)
            }
        </table>
    </div>
  )
  
}