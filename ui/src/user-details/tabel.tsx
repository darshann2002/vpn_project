import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Segmented, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EmailModel, ProcessEnum, updateRequest } from '@vpn-project/shared-models';
import { VpnIdReq } from 'libs/shared-models/src/lib/dto/employee.dto';

const { Search } = Input;
// import {VpnService} from 'libs/shared-services/src'

const VpnGrid: React.FC = () => {
  const service = new VpnService();
  const [value, setValue] = useState<string | number>('Requests');
  const [vpnData, setVpnData] = useState<any[]>([]);
  const [tabName, setTabName] = useState<string>('OPEN');
  const [selectedTabKey, setSelectedTabKey] = useState('1');
  const [activeKey, setActiveKey] = useState('OPEN');
  const [selectedData, setSelectedData] = useState<any>({});
  const [statusData, setStatusData] = useState('');
  const [countData, setCountData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [buttonStatus, setButtonStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getVpnAllData(tabName);
    getCount();
    fetchCurrentStatus();
  }, []);

  useEffect(() => {
    setActiveKey(tabName);
  }, [tabName]);

  useEffect(() => {
    handleSearch(searchText);
  }, [vpnData, searchText]);

  const tabsOnchange = (value: any) => {
    setSelectedTabKey(value);
    setTabName(value);
    getVpnAllData(value);
  };

  const getVpnAllData = (value: any) => {
    const req = new updateRequest(undefined, value);
    service.getVpnAllData(req).then((res) => {
      if (res.status) {
        setVpnData(res.data);
        message.success(res.internalMessage, 2);
        const statusData = res.data.reduce((acc, item) => {
          acc[item.employeeId] = item.accessStatus === 'APPROVE';
          return acc;
        }, {});
        setButtonStatus(statusData);
      } else {
        setVpnData([]);
        message.error(res.internalMessage, 2);
      }
    });
  };

  const getCount = () => {
    service.statusCount().then((res) => {
      if (res.status) {
        setCountData(res.data);
      }
    });
  };

  const fetchCurrentStatus = async () => {
    try {
      const res = await service.getCurrentStatus();
      const statusData = res.data.reduce((acc, employee) => {
        acc[employee.employeeId] = employee.accessStatus === 'ACCESS GIVEN';
        return acc;
      }, {});
      setButtonStatus(statusData);
    } catch (error) {
      console.error('Error fetching status:', error);
     // message.error('Failed to fetch status');
    }
  };

  const handleStatusButtonClick = async (employeeId: string) => {
    const newStatus = buttonStatus[employeeId] ? 'IN PROGRESS' : 'ACCESS GIVEN';
    const req: VpnIdReq = { id: parseInt(employeeId, 10), status: newStatus };  
    try {
      const res = await service.updateStatus3(req);
      if (res.status) {
        message.success('Status updated successfully');
        setButtonStatus((prevStatus) => ({
          ...prevStatus,
          [employeeId]: !prevStatus[employeeId],
        }));
        setVpnData((prevData) =>
          prevData.map((item) =>
            item.employeeId === employeeId ? { ...item, accessStatus: newStatus } : item
          )
        );
      } else {
        message.error('Failed to update status');
      }
    } catch (error) {
      message.error('An error occurred while updating the status');
      console.error('Error updating status:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = vpnData.filter((item: any) =>
      item.employeeId.toLowerCase().includes(text.toLowerCase()) ||
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.department.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const navigate = useNavigate();

  const columns: any = [
    {
      title: 'S.No',
      render: (val, record, index) => index + 1,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email Id',
      dataIndex: 'emailId',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Reporting Head Email ID',
      dataIndex: 'reportingHead',
    },
    {
      title: 'Status',
      render: (text, record) => (
        <Button
          type={buttonStatus[record.employeeId] ? 'default' : 'primary'}
          onClick={() => handleStatusButtonClick(record.employeeId)}
        >
          {buttonStatus[record.employeeId] ? 'COMPLETED' : 'IN PROGRESS'}
        </Button>
      ),
    },
  ];

  const tabData = [
    {
      key: ProcessEnum.OPEN,
      label: 'OPEN',
      color: '#4C4CFF',
      countKey: 'openCount',
    },
    {
      key: ProcessEnum.APPROVE,
      label: 'Approved',
      color: '#4CA64C',
      countKey: 'approvedCount',
      excludeColumns: ['action'],
    },
    {
      key: ProcessEnum.REJECT,
      label: 'Rejected',
      color: '#FF4C4C',
      countKey: 'rejectedCount',
      excludeColumns: ['action'],
    },
  ];

  return (
    <>
      <Card
        title="Employee Grid View"
        headStyle={{ color: 'white', backgroundColor: 'black' }}
        extra={
          <Button type="primary" onClick={() => navigate('/user-form')}>
            Create
          </Button>
        }
        bodyStyle={{ padding: '80px' }}
        className="fixed-card-content"
      >
        <Search
          placeholder="Search by Employee ID, Name, or Department"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Segmented
          size="large"
          block
          onChange={tabsOnchange}
          style={{ marginBottom: 16 }}
          value={activeKey}
          options={tabData.map((tab) => ({
            label: (
              <span style={{ color: tab.color }}>
                {tab.label}: {countData[0]?.[tab.countKey]}
              </span>
            ),
            value: tab.key,
          }))}
        />
        <div className="table-container">
          <Table
            columns={columns.filter((column) => !(activeKey !== ProcessEnum.APPROVE && column.title === 'Status'))}
            pagination={{
              pageSize: 10,
              responsive: true,
            }}
            dataSource={searchText ? filteredData : vpnData}
            scroll={{ x: 'max-content' }}
            size="small"
            rowKey={(record) => record.employeeId}
          />
        </div>
      </Card>
    </>
  );
};

export default VpnGrid;
