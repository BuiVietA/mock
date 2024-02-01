

import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAcessToken } from '../utils/helper';
import authService from '../Services/authService';
  
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const accessToken = getAcessToken();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("")

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await authService.login(values);

      if (response?.data?.userInfo) {
        localStorage.setItem('username', JSON.stringify(response.data.userInfo));
      }

      if (response?.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }

      toast.success('Login successful');
      return <Navigate to="/" replace />;
    } catch (error) {
      console.error("loi r fix lai di",error.message);
      const errorMessage = error?.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
 

  const handleLogin = () => {
    
    navigate('/home')
    
  };

  return (
    <div className="container-login">
      <Card title="LOGIN" bordered={false} className="card-login">
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)} value={username}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} value={password}

            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>


          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
              onClick={handleLogin}
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;