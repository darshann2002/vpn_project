import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal, notification } from 'antd';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { VpnService } from '@vpn-project/shared-services';


const ADMIN_CREDENTIALS = {
  cardNumber: 'admin',
  password: 'admin123'
};

const USER_CREDENTIALS = {
  cardNumber: 'user',
  password: 'user123'
};

export default function Login() {
  const navigate = useNavigate();
  const service = new VpnService();
  const [FpVisible, setFpVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [modalform] = Form.useForm();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.cardNumber === ADMIN_CREDENTIALS.cardNumber && values.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('auth', JSON.stringify({ role: 'admin' }));
      notification.success({
        message: 'Admin logged in successfully',
        placement: 'top',
        duration: 1,
      });
      navigate('/user-grid', { replace: true });
      window.location.reload();
    } else if (values.cardNumber === USER_CREDENTIALS.cardNumber && values.password === USER_CREDENTIALS.password) {
      localStorage.setItem('auth', JSON.stringify({ role: 'user' }));
      notification.success({
        message: 'User logged in successfully',
        placement: 'top',
        duration: 1,
      });
      navigate('/user-form', { replace: true });
      window.location.reload();
    } else {
      service.login(values).then((res) => {
        if (res.status) {
          localStorage.setItem('auth', JSON.stringify(res.data));
          notification.success({
            message: res.internalMessage,
            placement: 'top',
            duration: 1,
          });
          navigate('/user-grid', { replace: true });
          window.location.reload();
        } else {
          notification.error({
            message: res.internalMessage,
            placement: 'top',
            duration: 1,
          });
        }
      });
    }
  };

  function updatePasswd(values) {
    service.updatePassword(values).then((res) => {
      if (res.status) {
        notification.success({
          message: res.internalMessage,
          placement: 'top',
          duration: 1,
        });
        setFpVisible(false);
      } else {
        notification.error({
          message: res.internalMessage,
          placement: 'top',
          duration: 1,
        });
        modalform.resetFields();
      }
    });
  }

  const showModal = () => {
    modalform.setFieldsValue({
      cardNumber: form.getFieldValue('cardNumber'),
    });
    setFpVisible(true);
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <h1>Login</h1>
      </div>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item
          name="cardNumber"
          rules={[{ required: true, message: 'Please enter your Card Number' }]}
        >
          <Input placeholder="Card Number" className="input-box box1" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            placeholder="Password"
            className="input-box"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button className="remember-forgot" type="link" onClick={showModal}>
            Forgot Password?
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Forgot Password"
        visible={FpVisible}
        footer={null}
        onCancel={() => setFpVisible(false)}
        style={{ borderRadius: '10px', textAlign: 'center' }}
      >
        <Card
          style={{
            backgroundColor: '#f0f2f5',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s ease-in-out',
            transform: `scale(${scale})`,
            color: '#fff',
          }}
          onMouseEnter={() => setScale(1.05)}
          onMouseLeave={() => setScale(1)}
        >
          <Form onFinish={updatePasswd} layout="vertical" form={modalform}>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[{ required: true, message: 'Please enter your card number' }]}
            >
              <Input placeholder="Card Number" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                className="btn"
                type="primary"
                htmlType="submit"
                style={{ borderRadius: '5px' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}
