import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import './App.css';

const StuDetails = () => {
    const { id } = useParams();  
    const [student, setStudent] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`http://localhost:3001/students/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setStudent(data); 
            })
            .catch((err) => {
                console.error("Error fetching student details:", err.message);
            });
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Student Details</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <tbody style={{ fontSize: "16px", textAlign: "center" }}>
                            <tr>
                                <td><strong>ID</strong></td>
                                <td>{student.id}</td>
                            </tr>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{student.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{student.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone</strong></td>
                                <td>{student.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Age</strong></td>
                                <td>{student.age}</td>
                            </tr>
                            <tr>
                                <td><strong>Class</strong></td>
                                <td>{student.stuclass}</td>
                            </tr>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>{student.address}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-lg-12">
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button> {/* Use navigate(-1) to go back */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StuDetails;
