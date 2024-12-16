import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './App.css'

const Register = () => {
  const [name, addname] = useState("");
  const [email, addemail] = useState("");
  const [phone, addphone] = useState("");
  const [age, addage] = useState("");
  const [stuclass, addstuclass] = useState("");
  const [address, addaddress] = useState("");
  const [students, setStudents] = useState([]);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        const maxId = data.length > 0 ? Math.max(...data.map(stu => stu.id)) : 0;
        setNextId(maxId + 1);
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        alert('An error occurred while fetching students data.');
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const stuData = { id: String(nextId), name, email, phone, age, stuclass, address };
    setStudents([...students, stuData]);

    fetch('http://localhost:3001/students', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(stuData),
    }).then((res) => {
      if (res.ok) {
        alert('Student Registration Successful!');
        navigate('/');
      } else {
        throw new Error('Failed to save student data');
      }
    }).catch((err) => {
      console.log(err.message);
      alert('An error occurred while registering the student.');
    });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-title">
                <h2 style={{ color: 'black', textAlign: 'center' }}>Register Student</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={nextId} disabled className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" value={name} onChange={e => addname(e.target.value)} className="form-control" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={email} onChange={e => addemail(e.target.value)} className="form-control" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" value={phone} onChange={e => addphone(e.target.value)} className="form-control" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Age</label>
                      <input type="number" value={age} onChange={e => addage(e.target.value)} className="form-control" min="1" required />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Class</label>
                      <select className="form-control" value={stuclass} onChange={e => addstuclass(e.target.value)} required>
                        <option value="">Select Class</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Address</label>
                      <textarea className="form-control" value={address} onChange={e => addaddress(e.target.value)} rows="3" required></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-2">
                    <button className="btn btn-success" type='submit'>Submit</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
