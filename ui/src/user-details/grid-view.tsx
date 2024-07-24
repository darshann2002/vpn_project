// import { Card, Table } from 'antd';
// import React from 'react'

// const columns = [
//     { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId' },
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Phone Number', dataIndex: 'mobile', key: 'mobile' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Department', dataIndex: 'department', key: 'department' },
//     { title: 'Designation', dataIndex: 'designation', key: 'designation' },
//     { title: 'Reporting Head Email', dataIndex: 'reportingHeadEmail', key: 'reportingHeadEmail' }
//   ];
// function Gridview() {
//   return (
//     <div>
//       <>
//       <Card title="Employee Grid View" headStyle={{ color: 'white', backgroundColor: 'black' }} style={{ marginTop: 20 }}>
//         <Table columns={columns} dataSource={employeeList} rowKey="employeeId" />
//       </Card></>
//     </div>
//   )
// }

// export default Gridview
// import React, { useState } from 'react';
// import { Card, Table, Form, Button,Segmented, Divider} from 'antd';
// import './Gridview.css'; // Ensure this CSS file exists and is imported

// // Define the employee data type
// interface Employee {
//   name: string;
//   email: string;
//   mobile: string;

//   designation: string;
//   department: string;
//   reportingHeadEmail: string;
//   unit: string;
//   laptopType: string;
//   assetCode: string;
//   os: string;
//   antivirus: string;
//   internet: string;
// }

// // Define the type for employee data object
// type EmployeeData = {
//   [key: number]: Employee;
// };

// // Dummy data for employees
// const employeeData: EmployeeData = {
//   50010955: {
//     name: 'Kalyanakumar',
//     email: 'kalyanakumar.govindasamy@shahi.co.in',
//     mobile: '8220488392',
//     designation: 'Asst Manager',
//     department: 'Marketing',
//     reportingHeadEmail: 'ram.kumar@shahi.co.in',
//     unit: '7',
//     laptopType: 'Company - (Owner of Shahi, AHP, GBL,)',
//     assetCode: 'BCO0020392',
//     os: 'Windows 10',
//     antivirus: 'Crowdstrike',
//     internet: 'WiFi'
//   },
//   2: {
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     mobile: '0987654321',
//     designation: 'Project Manager',
//     department: 'Management',
//     reportingHeadEmail: 'head@example.com',
//     unit: 'Unit 2',
//     laptopType: 'Personal',
//     assetCode: 'XYZ456',
//     os: 'Windows 10',
//     antivirus: 'Crowdstrike',
//     internet: 'WiFi'
//   },
//   3: {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     mobile: '0123456789',
//     designation: 'Software Engineer',
//     department: 'Engineering',
//     reportingHeadEmail: 'head@example.com',
//     unit: 'Unit 1',
//     laptopType: 'Company',
//     assetCode: 'ABC123',
//     os: 'MacOS',
//     antivirus: 'McAfee',
//     internet: 'Ethernet'
//   },
//   4: {
//     name: 'Alice Johnson',
//     email: 'alice.johnson@example.com',
//     mobile: '9876543210',
//     designation: 'HR Manager',
//     department: 'Human Resources',
//     reportingHeadEmail: 'hr_head@example.com',
//     unit: 'Unit 3',
//     laptopType: 'Company',
//     assetCode: 'DEF789',
//     os: 'Ubuntu',
//     antivirus: 'Norton',
//     internet: 'Ethernet'
//   },
//   5: {
//     name: 'Bob Brown',
//     email: 'bob.brown@example.com',
//     mobile: '1234567890',
//     designation: 'Marketing Specialist',
//     department: 'Marketing',
//     reportingHeadEmail: 'marketing_head@example.com',
//     unit: 'Unit 4',
//     laptopType: 'Personal',
//     assetCode: 'GHI234',
//     os: 'Windows 11',
//     antivirus: 'Avast',
//     internet: 'WiFi'
//   },
//   6: {
//     name: 'Emily Davis',
//     email: 'emily.davis@example.com',
//     mobile: '2345678901',
//     designation: 'Financial Analyst',
//     department: 'Finance',
//     reportingHeadEmail: 'finance_head@example.com',
//     unit: 'Unit 5',
//     laptopType: 'Personal',
//     assetCode: 'JKL567',
//     os: 'Windows 10',
//     antivirus: 'Bitdefender',
//     internet: 'WiFi'
//   },
//   7: {
//     name: 'Michael Wilson',
//     email: 'michael.wilson@example.com',
//     mobile: '3456789012',
//     designation: 'Operations Manager',
//     department: 'Operations',
//     reportingHeadEmail: 'operations_head@example.com',
//     unit: 'Unit 6',
//     laptopType: 'Company',
//     assetCode: 'MNO890',
//     os: 'Windows 10',
//     antivirus: 'Kaspersky',
//     internet: 'Ethernet'
//   },
//   8: {
//     name: 'Michael Wilson',
//     email: 'michael.wilson@example.com',
//     mobile: '3456789012',
//     designation: 'Operations Manager',
//     department: 'Operations',
//     reportingHeadEmail: 'operations_head@example.com',
//     unit: 'Unit 6',
//     laptopType: 'Company',
//     assetCode: 'MNO890',
//     os: 'Windows 10',
//     antivirus: 'Kaspersky',
//     internet: 'Ethernet'
//   },
//   9: {
//     name: 'Michael Wilson',
//     email: 'michael.wilson@example.com',
//     mobile: '3456789012',
//     designation: 'Operations Manager',
//     department: 'Operations',
//     reportingHeadEmail: 'operations_head@example.com',
//     unit: 'Unit 6',
//     laptopType: 'Company',
//     assetCode: 'MNO890',
//     os: 'Windows 10',
//     antivirus: 'Kaspersky',
//     internet: 'Ethernet'
//   },
//   10: {
//     name: 'Michael Wilson',
//     email: 'michael.wilson@example.com',
//     mobile: '3456789012',
//     designation: 'Operations Manager',
//     department: 'Operations',
//     reportingHeadEmail: 'operations_head@example.com',
//     unit: 'Unit 6',
//     laptopType: 'Company',
//     assetCode: 'MNO890',
//     os: 'Windows 10',
//     antivirus: 'Kaspersky',
//     internet: 'Ethernet'
//   },
//   // Add more dummy data as needed
// };

// // Convert employeeData to an array
// const employeeList = Object.keys(employeeData).map(key => ({
//   employeeId: key,
//   ...employeeData[Number(key)]
// }));

// const Gridtable: React.FC = () => {
//   const [form] = Form.useForm();
//   const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

//   const handleEmployeeChange = (value: number) => {
//     setSelectedEmployee(value);
//     form.setFieldsValue(employeeData[value]);
//   };
//   const [value, setValue] = useState<string | number>('Map');
//   const [users , setUsers] = useState([])



//   // Define columns for the Table component
//   const columns = [
//     { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId' },
//     { title: 'Name', dataIndex: 'name', key: 'name' },
//     { title: 'Phone Number', dataIndex: 'mobile', key: 'mobile' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Department', dataIndex: 'department', key: 'department' },
//     { title: 'Designation', dataIndex: 'designation', key: 'designation' },
//     { title: 'Reporting Head Email', dataIndex: 'reportingHeadEmail', key: 'reportingHeadEmail' },
//     { title: 'Company Laptop Asset Code (Barcode)', dataIndex: 'assetCode', key: 'assetCode' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: () => (
//         <>
//         <Button style={{backgroundColor : "darkgreen"}}  >
//           Approve
//         </Button>
//         <Divider type='vertical'/>
//         <Button danger >
//           Reject
//         </Button>
//         </>
//       ),
//     },
//   ];

 
  
//   // const handleAction = (record: any) => {
//   //   // Do something with the selected record
//   //   console.log('Action clicked for:', record);
//   // };
//   return (
//     <>
//       <Card title="Employee Grid View" headStyle={{color : 'white' ,backgroundColor: 'black' }} 
//         extra={<Button type="primary">Create</Button>}>
//         <Segmented options={['Users', 'Approved', 'Completed']} value={value} onChange={setValue} />
//         <Table
//           pagination={{
//             pageSize: 10,
//             responsive : true
//           }}
//           scroll={{ x: 'max-content' }}
//           columns={columns}
//           dataSource={employeeList}
//           size="small"
   
//               />
//       </Card>
//     </>
//   );
// };

// export default Gridtable;


import React, { useState } from 'react';
import { Card, Table, Button, Segmented } from 'antd';
import './Gridview.css'; // Ensure this CSS file exists and is imported
import { useNavigate } from 'react-router-dom';

// Define the employee data type
interface Employee {
  employeeId: number;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  reportingHeadEmail: string;
  unit: string;
  laptopType: string;
  assetCode: string;
  os: string;
  antivirus: string;
  internet: string;
}

// Dummy data for employees


const Gridtable: React.FC = () => {
  const [value, setValue] = useState<string | number>('Requests');
  const [users, setUsers] = useState<Employee[]>();
  const [approved, setApproved] = useState<Employee[]>([]);
  const [completed, setCompleted] = useState<Employee[]>([]);

  const navigate = useNavigate()

  const handleApprove = (employee: Employee) => {
    setUsers(users.filter((user) => user.employeeId !== employee.employeeId));
    setApproved([...approved, employee]);
  };

  const handleReject = (employee: Employee) => {
    setUsers(users.filter((user) => user.employeeId !== employee.employeeId));
    // Optionally handle the rejected state if needed
  };

  const handleComplete = (employee: Employee) => {
    setApproved(approved.filter((approvedEmployee) => approvedEmployee.employeeId !== employee.employeeId));
    setCompleted([...completed, employee]);
  };

  // Define base columns for the Table component
  const baseColumns = [
    { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone Number', dataIndex: 'mobile', key: 'mobile' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Reporting Head Email', dataIndex: 'reportingHeadEmail', key: 'reportingHeadEmail' },
    { title: 'Company Laptop Asset Code (Barcode)', dataIndex: 'assetCode', key: 'assetCode' }
  ];

  // Define action column separately
  const actionColumn = {
    title: 'Action',
    key: 'action',
    render: (text: string, record: Employee) => (
      <>
        <Button type="primary" style={{ marginRight: 8 }} onClick={() => handleApprove(record)}>
          Approve
        </Button>
        <Button type="dashed" danger onClick={() => handleReject(record)}>
          Reject
        </Button>
      </>
    )
  };

  // Define complete column separately
  const completeColumn = {
    title: 'Complete',
    key: 'complete',
    render: (text: string, record: Employee) => (
      <>
        <Button type="primary" style={{ backgroundColor: 'blue', borderColor: 'blue' }} onClick={() => handleComplete(record)}>
          Complete
        </Button>
      </>
    )
  };

  // Conditionally add the action column if the current segment is "Requests"
  const columns = value === 'Requests' ? [...baseColumns, actionColumn] : value === 'Approved' ? [...baseColumns, completeColumn] : baseColumns;

  let dataSource;
  if (value === 'Requests') {
    dataSource = users;
  } else if (value === 'Approved') {
    dataSource = approved;
  } else {
    dataSource = completed;
  }

  return (
    <>
      <Card
        title="Employee Grid View"
        headStyle={{ color: 'white', backgroundColor: 'black' }}
        extra={<Button type="primary" onClick={()=>navigate('/user-form')}>Create</Button>}
        bodyStyle={{ padding: '20px' }}
      >
        <Segmented
          options={['Requests', 'Approved', 'Completed']}
          value={value}
          onChange={setValue}
          style={{ marginBottom: 16 }}
        />
        <Table
          pagination={{
            pageSize: 10,
            responsive: true,
          }}
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey="employeeId"
        />
      </Card>
    </>
  );
};

export default Gridtable;

