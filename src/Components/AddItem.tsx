import { useState } from "react";
import axios from "axios";
const AddItem = () => {

    const [fname, setFname] = useState<string>();
    const [lname, setLname] = useState<string>();
    const [uname, setUname] = useState<string>();
    const [pas, setPas] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [avt] = useState<string>("https://www.melivecode.com/users/cat.png");

    const setFName = (e: any) => {
        setFname(e.target.value);
    }
    const setLName = (e: any) => {
        setLname(e.target.value);
    }
    const setUName = (e: any) => {
        setUname(e.target.value);
    }
    const setPass = (e: any) => {
        setPas(e.target.value);
    }
    const setEId = (e: any) => {
        setEmail(e.target.value);
    }

    const formSubmit = (e:any) => {
        e.preventDefault();
        let obj = {
            fname: fname,
            lname: lname,
            username: uname,
            password: pas,
            email: email,
            avatar: avt
        }
        axios.post("https://www.melivecode.com/api/users/create",obj).then(
            ()=>{
                alert("Inserted Successfully");
            }
        )
        .catch(()=>{alert("Error")});
        ClearButton();
    }

    const ClearButton = () => {
        setFname('');
        setLname('');
        setUname('');
        setPas('');
        setEmail('');

    }
    return (
        <div className="container">
            <center><h1>Insert Records</h1></center>
            <form onSubmit={formSubmit}>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="fName">First Name</label>
                        <input type="text" className="form-control" required value={fname} onChange={(e) => { setFName(e) }} />
                    </div>
                    <div className="col">
                        <label htmlFor="fName">Last Name</label>
                        <input type="text" className="form-control" required value={lname} onChange={(e) => { setLName(e) }} />
                    </div>
                    <div className="col">
                        <label htmlFor="fName">UserName</label>
                        <input type="text" className="form-control" required value={uname} onChange={(e) => { setUName(e) }} />
                    </div>
                    <div className="col">
                        <label htmlFor="fName">Email ID</label>
                        <input type="email" className="form-control" required value={email} onChange={(e) => { setEId(e) }} />
                    </div>
                    <div className="col">
                        <label htmlFor="fName">Password</label>
                        <input type="password" className="form-control" required value={pas} onChange={(e) => { setPass(e) }} />
                    </div>
                    
                </div><br />
                <div className="row">
                    <center>
                        <label htmlFor="fName">Avatar</label>
                        <input type="file" className="form-control" name="" id="" style={{width:"250px"}}/>
                    </center>
                </div><br />
                <div className="row">
                    <center>
                        <button type="submit" className="btn btn-success">Insert</button>
                        <span> | </span>
                        <button className="btn btn-warning" onClick={ClearButton}>Clear</button>
                    </center>
                </div>
                <hr />
            </div>
            </form>

        </div>
    )
}
export default AddItem;