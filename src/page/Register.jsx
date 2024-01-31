import "../css/Register.css";
import {
  Button,Checkbox,DatePicker,Form,Input,Select,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
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

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const navigate = useNavigate();
  return (
    <>
      <>
        <h3 style={{ textAlign: "center", maxWidth: 600 }}>Register</h3>
      </>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ textAlign: "center", maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item name="firstName" label="First Name">
          <Input className="input" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input className="input" />
        </Form.Item>
        <Form.Item name="dob" label="date of birth">
          <DatePicker />
        </Form.Item>
        <Form.Item name={"cccd"} label="cccd">
          <Input type="number" className="input" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input className="input" />
        </Form.Item>
        <Form.Item name={"phonenumber"} label="Phone Number">
          <Input type="number" className="input" />
        </Form.Item>
        <Form.Item name={"bankingnumber"} label="Banking of number">
          <Input type="number" className="input" />
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
          <Input className="input" />
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
          <Input.Password className="input" />
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
            I have read the <a href="">agreement</a>
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
            Or register now!
          </label>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
