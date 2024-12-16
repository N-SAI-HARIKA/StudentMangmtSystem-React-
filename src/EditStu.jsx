import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './EditStu.css'; 

const EditStu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/students")
            .then((response) => response.json())
            .then((data) => {
                const selectedStudent = data.find((item) => item.id === String(id));
                if (selectedStudent) {
                    setStudent(selectedStudent);
                } else {
                    setStudent(null);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        })
            .then((response) => {
                if (response.ok) {
                    navigate(-1);
                } else {
                    console.error("Failed to update student");
                }
            })
            .catch((error) => console.error("Error updating student:", error));
    };

    if (student === null) {
        return <div>Student not found or loading...</div>;
    }

    return (
        <div className="edit-student">
            <h3>Edit Student</h3>
            <form onSubmit={handleSave} className="form-container">
                <div className="form-group">
                    <label>ID:</label>
                    <input type="text" value={student.id} readOnly className="input-field" />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={student.name}
                        onChange={(e) =>
                            setStudent({ ...student, name: e.target.value })
                        }
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={student.email}
                        onChange={(e) =>
                            setStudent({ ...student, email: e.target.value })
                        }
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={student.phone}
                        onChange={(e) =>
                            setStudent({ ...student, phone: e.target.value })
                        }
                        className="input-field"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-save">Save</button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStu;
