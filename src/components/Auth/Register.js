import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/uers/register', {userName, password});
            alert('Registeration successful! Please Login');
        } catch (error) {
            console.log('Registeration failed', error);
        }
    }

    return (
        <Container>
            <form onSubmit={handleRegister}>
                <TextField label = "Username" fullWidth value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <TextField label = "Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;