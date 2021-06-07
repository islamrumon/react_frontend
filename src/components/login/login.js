import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          msg: "",
          isLoading: false,
          redirect: false,
          errMsgEmail: "",
          errMsgPwd: "",
          errMsg: "",
        };
      }
      onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
      };
    
      onSignInHandler = () => {
        console.log('onSignInHandler');
        this.setState({ isLoading: true });
        axios
          .post("http://127.0.0.1:8000/api/login", {
            email: this.state.email,
            password: this.state.password,
          })
          .then((response) => {
            console.log(response);
            this.setState({ isLoading: false });
            if (response.data.result) {
                console.log(response.data);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data));
                
              this.setState({
                msg: 'Login success',
                redirect: true,
              });      
            }
            if (
              response.data.status === "failed" &&
              response.data.success === undefined
            ) {
              this.setState({
                errMsgEmail: response.data.validation_error.email,
                errMsgPwd: response.data.validation_error.password,
              });
              setTimeout(() => {
                this.setState({ errMsgEmail: "", errMsgPwd: "" });
              }, 2000);
            } else if (
              response.data.status === "failed" &&
              response.data.success === false
            ) {
              this.setState({
                errMsg: response.data.message,
              });
              setTimeout(() => {
                this.setState({ errMsg: "" });
              }, 2000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      render() {
          console.log('render ');
          console.log(this.state.redirect);
        if (this.state.redirect) {
          return <Redirect to="/" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        const userData = localStorage.getItem("userData");
        const data = JSON.parse(userData)
      console.log(login);
      console.log(userData);
        if (login) {
          return (
            <div>
             <p>You ar login <strong>{data.name}</strong></p>
             <p>There is your token {data.token}</p>
            </div>
          );
        }else{
          const isLoading = this.state.isLoading;
        return (
          <div>
              <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
        <Form className="containers">
              <FormGroup>
                <Label for="email">Email id</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.msg}</span>
                <span className="text-danger">{this.state.errMsgEmail}</span>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChangehandler}
                />
                <span className="text-danger">{this.state.errMsgPwd}</span>
              </FormGroup>
              <p className="text-danger">{this.state.errMsg}</p>
              <Button
                className="btn btn-primary text-center mb-4"
                color="success"
                onClick={this.onSignInHandler}>
                
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm ml-5"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </Form>
        </div>
        <div className='col-3'></div>
              </div>
            
          </div>
        );
        }
        
      }
}
