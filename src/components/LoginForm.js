import { useState }  from 'react';

const LoginForm = ({ title, onSubmit }) => {
    const [formValue, setFormValue] = useState({
        username: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValue).then(() => {
            setFormValue({
                username: '',
                password: ''
            });
        });
    }

    return(
    <form onSubmit={handleSubmit}>form</form>
    );
}

export default LoginForm;