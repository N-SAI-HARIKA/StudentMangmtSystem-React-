import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteStu.css'; 

const DeleteStu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/students/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch student details: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setStudent(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(`Error fetching student details: ${err.message}`);
            });
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;

        setLoading(true);
        fetch(`http://localhost:3001/students/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    navigate("/students"); 
                } else if (response.status === 404) {
                    setError("Student not found.");
                } else {
                    setError("Failed to delete student. Please try again.");
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(`Error deleting student: ${error.message}`);
            });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!student) {
        return <div className="not-found">Student not found.</div>;
    }

    return (
        <div className="delete-student">
            <h3 className="header">Delete Student</h3>
            <div className="student-details">
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
            </div>
            <div className="actions">
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteStu;
