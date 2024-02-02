import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, Row, Col } from 'antd';
import authService from "../services/authService";

const SignUp: FC<{}> = (): JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const onFinish = (values: any) => {
    // Assuming the authService.register method is adapted to handle the submission
    authService.register(values)
      .then(response => {
        setAlertMsg("Registration successful!");
        setAlertType("success");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch(error => {
        setAlertMsg(error.response?.data?.error || "An error occurred during registration.");
        setAlertType("error");
      });
  };

  return (
    <>
      <div className="container mt-5">
        {alertMsg && alertType && (
          <Alert message={alertMsg} type={alertType} showIcon closable />
        )}
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={8} xl={6}>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              layout="vertical"
            >
                
              <Form.Item
                name="name"
                label = "Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
                  >
                  <Input />
              </Form.Item>
              

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long"
                },
                {
                  pattern: new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"),
                  message: "Password must contain at least 1 letter, 1 number and 1 special character"
                }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords that you entered do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>

              <Form.Item>
                Already have an account? <Link to={"/login"}>Log In</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignUp;
