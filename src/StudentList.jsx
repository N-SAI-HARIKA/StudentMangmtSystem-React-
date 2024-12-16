import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css'; 

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // state for the search term

    useEffect(() => {
        fetch("/db.json/students")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setStudents(data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err.message);
            });
    }, []);

    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phone.includes(searchTerm)
        );
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Student List</h2>
                </div>
                <div className="card-body">
                    <div className="header-container">
                        <div className="addnewbtn">
                            <Link className="btn btn-success" to="/student/Register">Add New (+)</Link>
                        </div>
                        <div className="search-container">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name, Email, or Phone"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: "300px" }}
                            />
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#ff0059', color: 'white', padding: '10px', textAlign: 'center' }}>ID</th>
                                <th style={{ backgroundColor: '#ff0059', color: 'white', padding: '10px', textAlign: 'center' }}>Name</th>
                                <th style={{ backgroundColor: '#ff0059', color: 'white', padding: '10px', textAlign: 'center' }}>Email</th>
                                <th style={{ backgroundColor: '#ff0059', color: 'white', padding: '10px', textAlign: 'center' }}>Phone</th>
                                <th style={{ backgroundColor: '#ff0059', color: 'white', padding: '10px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: "16px", textAlign: "center" }}>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>
                                            <Link to={`/student/details/${student.id}`} className="btn btn-primary">View</Link>
                                            <Link to={`/student/edit/${student.id}`} className="btn btn-success">Edit</Link>
                                            <Link to={`/student/delete/${student.id}`} className="btn btn-danger">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
