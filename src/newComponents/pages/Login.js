import React, { useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {useNavigate} from 'react-router-dom'
import {authenticate} from "../../data/awsAuth"
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"

export default function Login() {

    const dispatch = useDispatch()
    const state = useSelector((state) => {return {users: state.users, user: state.user, admin: state.admin}});
    const { userLogin, adminLogin } = bindActionCreators(allActions, dispatch)
    const { users, admin, user } = state
    const navigate = useNavigate()

    
    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userData = {
            Username  : formData.get('userName'),
            Password: formData.get('password')
        }

        authenticate(userData)
    }

    useEffect(() => {
        admin && navigate('/admin/allBooks')
    },[admin]) 
    
    useEffect(() => {
        user && navigate('/homepage', {state: { from : "login"} })
    },[user])

    return (
        <div id="login-container">
            <Label id="login-header">Login</Label>
            <Form onSubmit={handleSubmitLogin}>
                <FormGroup>
                    <Input
                        id="userName"
                        name="userName"
                        placeholder="User Name"
                        required
                    />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />
                </FormGroup>
                {' '}
                <Button outline color="secondary" className="buttons">
                    Submit
                </Button>
                </Form>
        </div>
    )
}