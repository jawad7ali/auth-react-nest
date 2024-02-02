import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from 'antd';
import authService from '../services/authService';
import { SignInFormData } from "../utils/userTypes";

const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const onFinish = (values: SignInFormData) => {
    authService.login(values)
      .then((response: any) => {
        if (response.data.status === 400) {
          notification.error({
            message: 'Login Failed',
            description: response.data.message,
          });
        } else {
          notification.success({
            message: 'Login Successful',
            description: response.data.message,
          });
          localStorage.setItem("auth", response.data.token);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((error: any) => {
        notification.error({
          message: 'Login Error',
          description: error.response?.data?.error || 'An error occurred during login.',
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 col-lg-4">
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              Have an Account? <Link to={"/register"}>Sign Up</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
