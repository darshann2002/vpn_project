// import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
// import {
//   Input,
//   Button,
//   Table,
//   Card,
//   Alert,
//   Tabs,
//   Segmented,
//   message,
//   Form,
//   Col,
//   Row,
//   DatePicker,
//   Select,
// } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';
// import moment from 'moment';
// import { FilterReq, ProcessStatusEnum } from 'shared-models';
// import TabPane from 'antd/es/tabs/TabPane';
// import { CreateFileUploadService } from 'shared-services';

// const UniqloView = () => {
//   const [form] = Form.useForm();
//   const [page, setPage] = React.useState(1);
//   const [pageSize, setPageSize] = useState<number>(1);
//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef(null);
//   const [mainData, setMainData] = useState<any[]>([]);
//   const [tabName, setTabName] = useState<string>('OPEN');
//   const [selectedTabKey, setSelectedTabKey] = useState('1');
//   const [activeKey, setActiveKey] = useState('OPEN');
//   const fileService = new CreateFileUploadService();
//   const [countData, setCountData] = useState<any[]>([]);
//   const { RangePicker } = DatePicker;
//   const { Option } = Select;
//   const [ invoiceData, setInvoiceData ] = useState<any[]>([])
//   const [ ciData, setCiData ] = useState<any[]>([])
//   const [ poData, setPOData ] = useState<any[]>([])

//   useEffect(() => {
//     setActiveKey(tabName);
//   }, [tabName]);

//   useEffect(() => {
//     getCount();
//     getData(tabName);
//     getInvoiceNo()
//     getCiNo()
//     getPONo()
//   }, []);

//   const getData = (value: any) => {
//     const req = new FilterReq(undefined, undefined, undefined, value);
//     if (form.getFieldValue('fromDate') !== undefined) {
//       req.fromDate = form.getFieldValue('fromDate')[0].format('YYYY-MM-DD');
//     }
//     if (form.getFieldValue('fromDate') !== undefined) {
//       req.toDate = form.getFieldValue('fromDate')[1].format('YYYY-MM-DD');
//     }
//     if (form.getFieldValue('ciNumber') !== undefined) {
//       req.ciNumber = form.getFieldValue('ciNumber');
//     }
//     if (form.getFieldValue('poNumber') !== undefined) {
//       req.poNumber = form.getFieldValue('poNumber');
//     }
//     if (form.getFieldValue('invoiceNo') !== undefined) {
//       req.invoiceNo = form.getFieldValue('invoiceNo');
//     }
//     fileService.getUniqloData(req).then((res) => {
//       if (res.status) {
//         setMainData(res.data);
//         message.success(res.internalMessage, 2);
//       } else {
//         setMainData([]);
//         message.error(res.internalMessage, 2);
//       }
//     });
//   };

//   const getCount = () => {
//     fileService.statusCount().then((res) => {
//       if (res.status) {
//         setCountData(res.data);
//       }
//     });
//   };

//   const getInvoiceNo = () => {
//     fileService.getInvoiceNo().then((res) => {
//       if (res.status) {
//         setInvoiceData(res.data);
//       }
//     });
//   };

//   const getCiNo = () => {
//     fileService.getCiNo().then((res) => {
//       if (res.status) {
//         setCiData(res.data);
//       }
//     });
//   };

//   const getPONo = () => {
//     fileService.getPONo().then((res) => {
//       if (res.status) {
//         setPOData(res.data);
//       }
//     });
//   };

//   const tabsOnchange = (value: any) => {
//     setSelectedTabKey(value);
//     setTabName(value);
//     getData(value);
//     setPage(1);
//   };

//   const tabData = [
//     {
//       key: ProcessStatusEnum.OPEN,
//       label: 'Open',
//       color: '#4C4CFF',
//       countKey: 'openCount',
//       excludeColumns: ['reason','quantity','value'],
//     },
//     {
//       key: ProcessStatusEnum.INPROGRESS,
//       label: 'InProgress',
//       color: '#FFB732',
//       countKey: 'inProgressCount',
//     },
//     {
//       key: ProcessStatusEnum.FAILED,
//       label: 'Failed',
//       color: '#FF4C4C',
//       countKey: 'failedCount',
//       excludeColumns: ['action'],
//     },
//     {
//       key: ProcessStatusEnum.COMPLETED,
//       label: 'Completed',
//       color: '#4CA64C',
//       countKey: 'completedCount',
//       excludeColumns: ['action'],
//     },
//   ];

//   return (
//     <>
//       <Card title={<span style={{color: 'white'}}>Uniqlo</span>}>
//         <Segmented
//           size="large"
//           block
//           options={tabData.map((tab) => ({
//             label: (
//               <span style={{ color: tab.color }}>
//                 {tab.label}: {countData[0]?.[tab.countKey]}
//               </span>
//             ),
//             value: tab.key,
//           }))}
//           onChange={tabsOnchange}
//           value={activeKey}
//           style={{ marginBottom: '20px' }}
//         />
//         {mainData.length > 0 ? (
//           <Table
//             pagination={{
//               pageSize: 100,
//               onChange(current, pageSize) {
//                 setPage(current);
//                 setPageSize(pageSize);
//               },
//             }}
//             scroll={{ x: 'max-content' }}
//             columns={columns.filter(
//               (o) =>
//                 !tabData
//                   .find((tab) => tab.key === activeKey)
//                   ?.excludeColumns?.includes(o.dataIndex)
//             )}
//             dataSource={mainData}
//             size="small"
//             bordered
//           />
//         ) : (
//           <Alert
//             message="No data available☹️"
//             type="info"
//             showIcon
//             style={{ width: '160px', margin: 'auto' }}
//           />
//         )}
//       </Card>
//     </>
//   );
// };

// export default UniqloView;
