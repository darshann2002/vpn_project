import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { VpnService } from '@vpn-project/shared-services';
import { EmailModel, IdRequest } from '@vpn-project/shared-models'

const UserForm = () => {
  const [form] = Form.useForm();
  const [selectedEmployee, setSelectedEmployee] = useState<any>({});
  const navigate = useNavigate();
  const service = new VpnService();
  const [ mainData, setMainData ] = useState<any[]>([])
  const {Option} = Select
  
  

  useEffect(()=>{
    getData()
  },[])

  const onFinish = (value)=>{
    const req = new IdRequest(value.employeeId)
    // const req = new EmployeeDto(selectedEmployee.employeeId,selectedEmployee.name,selectedEmployee.emailId,selectedEmployee.designation,selectedEmployee.department,selectedEmployee.mobNo,selectedEmployee.unitName,selectedEmployee.laptop,selectedEmployee.os,selectedEmployee.antiVirus,selectedEmployee.connecionType,null,null,selectedEmployee.reportingHead)
     console.log(req,"FRD jjjjj")
    service.createVpn(req).then((res)=>{
      if(res.status){
        message.success(res.internalMessage,2)
        sendMailForApprovalUser()
        sendMailToUser()
        navigate('/user-grid', value)
      }else{
        message.error(res.internalMessage,2)
      }
    })
  }

  const getData = ()=>{
    service.getEmployeeData().then((res)=>{
      if(res.status){
        setMainData(res.data)
      }else{
        setMainData([])
      }
    })
  }

  const onReset = () => {
    form.resetFields();
  };

  const onEmployee = (value) => {
    const employeeData = mainData.find((item) => item.employeeId === value);
    if (employeeData) {
    setSelectedEmployee(employeeData);
    form.setFieldsValue({
      name: employeeData.name,
      email: employeeData.emailId,
      mobile: employeeData.mobNo,
      designation: employeeData.designation,
      department: employeeData.department,
      reportingHeadEmail: employeeData.reportingHead,
      unit: employeeData.unitName,
      // laptopType: employeeData.laptop,
      assetCode: employeeData.barcode,
      // os: employeeData.os,
      // antivirus: employeeData.antiVirus,
      // internet: employeeData.connectionType
    });
  } else {
    setSelectedEmployee({});
    form.resetFields(); // Reset form fields if employee is not found
  }
};

 // let mailerSent = false;
  async function sendMailForApprovalUser() {
    const employeeDetails = new EmailModel();
    employeeDetails.from = '"VPN" <no-reply@shahi.co.in>'
    employeeDetails.employeeId = selectedEmployee.employeeId;
    employeeDetails.to = selectedEmployee.reportingHead;
    employeeDetails.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
        table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
                    #acceptDcLink {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #28a745;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 10px;
                        transition: background-color 0.3s ease, color 0.3s ease;
                        cursor: pointer;
                    }

                    #acceptDcLink.accepted {
                        background-color: #6c757d;
                        cursor: not-allowed;
                    }

                    #acceptDcLink:hover {
                        background-color: #218838;
                        color: #fff;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                        cursor: pointer;
                    }
                    .accept {
                        background-color: #108f1a;
                        color: #fff;
                    }
                    .reject {
                        background-color: #ff001e;
                        color: #fff;
                    }
                    /* Define styles for button hover state */
                    .button:hover {
                        opacity: 0.8;
                    }
                </style>
      </head>
      <body>
        <p>Dear team,</p>
        <p>User with the following details has been requesting for VPN access:</p>
        <table>
          <tr>
            <th>Employee ID</th>
            <td>${selectedEmployee.employeeId}</td>
          </tr>
          <tr>
            <th>Employee Name</th>
            <td>${selectedEmployee.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${selectedEmployee.emailId}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>${selectedEmployee.department}</td>
          </tr>
           <tr>
            <th>Barcode</th>
            <td>${selectedEmployee.barcode}</td>
          </tr>
        </table>
      <br/>
             <form action="http://172.20.50.169:9001/api/vpn/updateStatus/${selectedEmployee.employeeId}" method="post">
             <button class="button accept">APPROVE</button>
          </form>
          <br />
          
          <form action="http://172.20.50.169:9001/api/vpn/updateStatus2/${selectedEmployee.employeeId}" method="post">
             <button class="button reject">REJECT</button>
          </form>
      </body>
      </html>`
    ;
    employeeDetails.subject = "Request for VPN access";

    const reportingHeadMailRes = await service.sendVPNMail(employeeDetails);
    if (reportingHeadMailRes.status === 201) {
      if (reportingHeadMailRes.data.status) {
        message.success(`Alert Mail Sent to ${selectedEmployee.reportingHead}`);
        await sendMailToUser();
      } else {
        message.error("Mail not sent to reporting head");
      }
    } else {
      message.success(`Alert Mail Sent to ${selectedEmployee.reportingHead}`);
    }
  }

  async function sendMailToUser() {
    const userMailDetails = new EmailModel();
    userMailDetails.from = '"VPN" <no-reply@shahi.co.in>';
    userMailDetails.to = selectedEmployee.emailId;
    userMailDetails.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <p>Dear ${selectedEmployee.name},</p>
        <p>Your request for VPN access has been successfully submitted. You will be notified once it is approved or rejected.</p>
      </body>
      </html>
    `;
    userMailDetails.subject = "VPN Access Request Submitted";

    const userMailRes = await service.sendVPNMail(userMailDetails);
    if (userMailRes.status === 201) {
      if (userMailRes.data.status) {
        message.success(`Alert Mail Sent to ${selectedEmployee.name}`);
      } else {
        message.error("Mail not sent to user");
      }
    } else {
      message.success(`Alert Mail Sent to ${selectedEmployee.name}`);
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onEmployee(value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault(); // Preventing from form submission
    const value = (e.target as HTMLInputElement).value;
    onEmployee(value);
  };

  const authData = JSON.parse(localStorage.getItem('auth') || '{}');
  const role = authData.role;

  return (
    <Card
      title="Details"
      headStyle={{ color: 'white', backgroundColor: 'black' }}
      style={{ backgroundColor: 'grey', border: '1px solid black' }}
      extra={role !== 'user' && <Button onClick={() => navigate('/user-grid')}>View</Button>}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24} align="middle">
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          > 
                     <Form.Item label="Employee Id" name="employeeId">
              <Input
                onBlur={handleBlur} 
                onPressEnter={handlePressEnter} 
                placeholder="Enter Employee ID"
              />
            </Form.Item>

          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Email Id " name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              label="Mobile No"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: 'Please enter your mobile number!',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter only numbers!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Designation" name="designation">
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Department" name="department">
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              label="Reporting Head Email ID"
              name="reportingHeadEmail"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Unit name/No" name="unit">
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Company or Personal Laptop" name="laptopType">
              <Select style={{ fontWeight: 'bolder' }}   defaultValue ={' Company - (Owner of Shahi, AHP, GBL,)'}>
                <Option value="company">Company - (Owner of Shahi, AHP, GBL,)</Option>
                <Option value="personal">Personal</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              label="Company Laptop Asset Code(Barcode)"
              name="assetCode"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Operating System and version" name="os">
            <Select style={{ fontWeight: 'bolder' }} defaultValue={'Windows'} >
    <Option value="windows">Windows</Option>
    <Option value="mac">Mac</Option>
    <Option value="linux">Linux</Option>
  </Select>
              
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Antivirus Name Installed" name="antivirus" >
            <Select style={{ fontWeight: 'bolder' }} defaultValue={'Crowdstrike'} >
            <Option value="crowdstrike">Crowdstrike</Option>
            </Select>
            </Form.Item>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 5 }}
          >
            <Form.Item label="Internet Connection Type" name="internet">
              <Input disabled style={{ fontWeight: 'bolder' }} defaultValue={'Wifi'} />
            </Form.Item>
          </Col>
          <Row gutter={24} justify="end">
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button
                htmlType="reset"
                onClick={onReset}
                style={{ marginLeft: 55 }}
              >
                Reset
              </Button>
            </Col>
            
          </Row>
        </Row>
      </Form>
    </Card>
  );
};

export default UserForm;

