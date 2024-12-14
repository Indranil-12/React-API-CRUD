import axios from "axios";
import { useEffect, useState } from "react";

const DisplayItem = () => {
  const [apidata, setApidata] = useState<any[]>([]);
  const [track, setTrack] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [updatedData, setUpdatedData] = useState({ fname: "", lname: "", username: "" });

  useEffect(() => {
    axios.get(`https://www.melivecode.com/api/users`).then((val) => setApidata(val.data));
  }, [track]);

  const DeleteData = (getid: number) => {
    axios
      .delete("https://www.melivecode.com/api/users/delete", { data: { id: getid } })
      .then(() => {
        alert("Deleted Successfully......");
        setTrack(track + 1);
      })
      .catch(() => {
        alert("404: Not Found");
      });
  };

  const ShowData = (getid: any) => {
    alert(`
      id: ${getid}
      Name: ${apidata[getid - 1].fname} ${apidata[getid - 1].lname}
      User Name: ${apidata[getid - 1].username}
    `);
  };

  const openUpdateModal = (user: any) => {
    setSelectedUser(user);
    setUpdatedData({ fname: user.fname, lname: user.lname, username: user.username });
  };

  const updateData = () => {
    if (selectedUser) {
      axios
        .put("https://www.melivecode.com/api/users/update", {
          id: selectedUser.id,
          fname: updatedData.fname,
          lname: updatedData.lname,
          username: updatedData.username,
        })
        .then(() => {
          alert("Updated Successfully......");
          setTrack(track + 1);
          setSelectedUser(null);
        })
        .catch(() => {
          alert("Error while updating user data");
        });
    }
  };

  return (
    <>
      <div className="container">
        <center>
          <h1>Records</h1>
        </center>
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>fName</th>
              <th>lName</th>
              <th>userName</th>
              <th>Show</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {apidata.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.avatar} style={{ height: "50px", width: "50px" }} alt="" />
                  </td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.username}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => ShowData(item.id)}>
                      Show
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openUpdateModal(item)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => DeleteData(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      {selectedUser && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedData.fname}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, fname: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedData.lname}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, lname: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedData.username}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, username: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={updateData}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayItem;