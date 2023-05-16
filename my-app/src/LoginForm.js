import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function LoginForm(){
    const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
    const formSubmit=(userEmail,userPassword)=>{
        
        fetch("http://localhost:8000/adduser", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
				{
					email: userEmail,
                    password: userPassword
				}
			)
        })
        
    }
return(

<div>
<Form>
            <Form.Group>
                <Form.Label>Email address</Form.Label><Form.Control
                onChange={(e) =>{setEmail(e.target.value)}}
                type="email" 
                placeholder="Enter email" />
            </Form.Group>
                

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  onChange={(e) =>{setPassword(e.target.value)}}
                   
                type="password" placeholder="Password" />
            </Form.Group>
            <Button
            variant="primary" type="submit" onClick={()=>formSubmit(email,password)}>
                Submit
            </Button>
		</Form>
</div>
)

}

export default LoginForm;