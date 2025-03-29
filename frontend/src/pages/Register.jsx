import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/register', values)
            if(response.status === 201){
                navigate('/login')
            }
        }catch(err){
            console.log(err.message);
        }
    }

    //CSS
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const cardStyle = {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px 30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '300px',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '12px',
    };

    const buttonStyle = {
        width: '100%',
        backgroundColor: '#1D4ED8',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#000000', // Normal link color
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
    };
    


    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Enter Username" style={inputStyle} name='username' onChange={handleChanges}/>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" style={inputStyle} name='email' onChange={handleChanges} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" style={inputStyle} name='password' onChange={handleChanges}/>
                    </div>

                    <button style={buttonStyle}>Submit</button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span>Already have an account?</span>
                    <Link to='/login' style={linkStyle}>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
