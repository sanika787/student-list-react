import { useEffect, useState } from "react";

function Studentlist(props) {
  let [students, setStudents] = useState([]);
  let[txtId,setId]=useState();
  let[txtName,setName]=useState();
  let[txtEmail,setEmail]=useState();
  


  async function getStudents() {
    // Fixed API endpoint
    var response = await fetch("https://jsonplaceholder.typicode.com/users");
    var result = await response.json();

    // Set the students state with the fetched data
    setStudents(result);
  }

  function funRowClick(x) {
    console.log(x);
  }


  // Run getStudents once when the component mounts
  useEffect(() => {
    console.log("useEffect");
    getStudents();
  }, []);

  function funAdd(){
    let obj={id:txtId,
        name:txtName,
        email:txtEmail
       
    } 
    console.log(obj);
    props.addObj(obj);
  }

  async function addstud(obj) {
    var response=await fetch('https://jsonplaceholder.typicode.com/users/add',{
        method:"post",
        //headers:{'Content-type': 'application/json'},
       // body:JSON.stringify(obj)
    })
    var result=await response.json();
    console.log("insert!!",result);


    
}

  function idadd(event){
    setId(event.currentTarget.value);

  }

  function nameadd(event){
    setName(event.currentTarget.value);

  }

  function emailadd(event){
    setEmail(event.currentTarget.value);
 
  }


  function funDelete(){

  }
  async function funDelete() {
    
    var response=await fetch('https://jsonplaceholder.typicode.com/users/'+txtId,{
        method:"DELETE"
    });
    var result=await response.json();
    console.log("record deleted with id="+result.id);
    
     
}


  return (
    <>
      <h3>Studentlist</h3>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            
          </tr>
        </thead>
        <tbody>
          {students.map((x) => {
            return (
              <tr key={x.id} onClick={(event) => { event.stopPropagation(); funRowClick(x); }}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      <input type="button" value="Add" onClick={funAdd}></input>
      <input type="button" value="Delete" onClick={funDelete}></input>
      </div>

      
    <div>
        Id:<input type="text" onChange={idadd}/>
    </div>

    <div>
        Name:<input type="text" onChange={nameadd}/>
    </div>

    <div>
        Email:<input type="text" onChange={emailadd}/>
    </div>





      
    </>
  );
}

export default Studentlist;



 
  