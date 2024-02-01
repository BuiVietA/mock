import "../css/Register.css";
import moment from 'moment';

import {
  Button,Checkbox,DatePicker,Form,Input
} from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../Services/interface/authentication";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [address, setAddress] = useState("")
  const [dob, setDob] = useState(null)
  const [cccd, setCccd] = useState("")
  const [phonenumber, setPhoneNumber] = useState("")
  const [bankingnumber, setBAnkingNumber] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  
  const navigate = useNavigate();
  const Signup = async () => {
    try {
      const item = { lastName, firstName, address, dob, cccd, phonenumber, bankingnumber, username, password };
      console.warn("loi cmnr",item);

      const result = await fetch(BASE_URL + "auth/register", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      });

      const resultData = await result.json();
      console.warn(resultData);

      localStorage.setItem("username", JSON.stringify(resultData));
      navigate('/login');
    } catch (error) {
      console.error('Lỗi trong quá trình đăng ký:', error);
      // Xử lý lỗi ở đây, hiển thị thông báo hoặc ghi log
    }
  };

  // const onFinish = async (values) => {
  //   try {
  //     await addUsers(values);
  //     console.log("Received values of form: ", values);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  //   console.log("Received values of form: ", values);
  // };
  
  
  return (
    <>
      <>
        <h3 style={{ textAlign: "center", maxWidth: 600 }}>Register</h3>
      </>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={Signup}
        style={{ textAlign: "center", maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item name="firstName" label="First Name">
          <Input className="input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input className="input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Item>
        <Form.Item name="dob" label="date of birth">
          <DatePicker  value={moment(dob)} onChange={(date, dateString) => setDob(dateString)}/>
        </Form.Item>
        <Form.Item name={"cccd"} label="cccd">
          <Input type="number" className="input" onChange={(e) => setCccd(e.target.value)} value={cccd}/>
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input className="input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item name={"phonenumber"} label="Phone Number">
          <Input type="number" className="input"  value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        </Form.Item>
        <Form.Item name={"bankingnumber"} label="Banking of number">
          <Input type="number" className="input" value={bankingnumber} onChange={(e) => setBAnkingNumber(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: "Please input your user name!",
              whitespace: true,
            },
          ]}
        >
          <Input className="input" type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className="input"  type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="input" />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the agreement
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <label
            style={{ marginLeft: 20, color: "blue" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Or Login now!
          </label>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;