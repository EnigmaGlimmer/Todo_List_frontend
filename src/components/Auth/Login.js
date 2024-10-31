import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const {login} = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:5000/api/users/login', {userName, password});
            login(data.user, data.token);
            navigate('/todos');
        } catch (error) {
            console.log('Login Failed', error);
        }
    }

    return (
        <Container>
            <form onSubmit={handleLogin}>
                <TextField label = "Username" fullWidth value = {userName} onChange={(e) => setUserName(e.target.value)}/>
                <TextField label = "Password" type="password" fullWidth value = {password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </Container>
    );
}

export default Login;