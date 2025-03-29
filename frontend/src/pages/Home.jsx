import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng hook useNavigate để chuyển hướng

const Home = () => {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Học React', description: 'Học các khái niệm cơ bản trong React', time: '10:00 AM' },
        { id: 2, title: 'Đi chợ', description: 'Mua thực phẩm cho bữa tối', time: '02:00 PM' },
        { id: 3, title: 'Làm bài tập', description: 'Làm bài tập toán học', time: '04:00 PM' }
    ]);
    
    const navigate = useNavigate(); // Hook để chuyển hướng
    
    // Hàm đăng xuất
    const handleLogout = () => {
        // Xóa token hoặc bất kỳ thông tin người dùng nào trong localStorage hoặc sessionStorage
        localStorage.removeItem('token'); // Giả sử bạn lưu token trong localStorage
        navigate('/login'); // Chuyển hướng về trang đăng nhập
    };

    const handleView = (id) => {
        const todo = todos.find(todo => todo.id === id);
        alert(`Title: ${todo.title}\nDescription: ${todo.description}\nTime: ${todo.time}`);
    };

    const handleUpdate = (id) => {
        const updatedTitle = prompt('Cập nhật tiêu đề:', '');
        const updatedDescription = prompt('Cập nhật mô tả:', '');
        const updatedTime = prompt('Cập nhật thời gian:', '');

        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, title: updatedTitle, description: updatedDescription, time: updatedTime } : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const containerStyle = {
        padding: '20px',
        background: 'linear-gradient(135deg, #ffb6c1, #f0f8ff)',
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: '0',
    };

    const itemStyle = {
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const buttonStyle = {
        padding: '8px 12px',
        fontSize: '14px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px',
    };

    const viewButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#3498db',
        color: 'white',
    };

    const updateButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f39c12',
        color: 'white',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#e74c3c',
        color: 'white',
    };

    const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#2ecc71', // Màu xanh lá
        color: 'white',
        marginTop: '20px',
        width: '100%',
        fontSize: '16px',
        padding: '12px 0',
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Danh Sách Công Việc</h2>
            <ul style={listStyle}>
                {todos.map(todo => (
                    <li key={todo.id} style={itemStyle}>
                        <div>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <p>{todo.time}</p>
                        </div>
                        <div>
                            <button style={viewButtonStyle} onClick={() => handleView(todo.id)}>Xem</button>
                            <button style={updateButtonStyle} onClick={() => handleUpdate(todo.id)}>Cập Nhật</button>
                            <button style={deleteButtonStyle} onClick={() => handleDelete(todo.id)}>Xoá</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button style={logoutButtonStyle} onClick={handleLogout}>Đăng Xuất</button>
        </div>
    );
};

export default Home;
