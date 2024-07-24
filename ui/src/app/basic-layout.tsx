import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { ProBreadcrumb, ProConfigProvider } from '@ant-design/pro-components';
import ProLayout, { DefaultFooter, FooterToolbar } from '@ant-design/pro-layout';
import { useState } from 'react';
import { Button, ConfigProvider, Tooltip, theme } from 'antd';
import { UserOutlined, PieChartOutlined, LogoutOutlined, TableOutlined, CloudUploadOutlined, PicCenterOutlined, ControlOutlined, UploadOutlined, EditOutlined, LaptopOutlined, FileTextFilled } from '@ant-design/icons'
import { treeRouter } from './common';


export interface BasicLayoutProps { }

export interface IAppColors {
    primaryColor: string,
    secondaryColor: string
}

export function BasicLayout(props: BasicLayoutProps) {
    const colors = {
        darkMode: {
            primaryColor: '#6C22A6',
            secondaryColor: "#99BC85"
        },
        dayMode: {
            primaryColor: '#6C22A6',
            secondaryColor: "#99BC85",
        }
    }
    const [pathname, setPathname] = useState(location.pathname);
    const [dark, setDark] = useState(true);
    const navigate = useNavigate();
    const [appColors, setAppColors] = useState<IAppColors>(colors.dayMode)
    // const { token: { colorPrimary, colorPrimaryActive, colorPrimaryBg, colorBgBase } } = useToken()

    // function handleLogout() {
    //     localStorage.clear()
    //     navigate('/login')
    // }

    function handleModeChange() {
        setDark(!dark)
        setAppColors(prev => dark ? colors.darkMode : colors.dayMode)
    }

    const handleLogout = () => {
        localStorage.removeItem('auth'); 
        navigate('/'); 
    }

    const baseRouterList: any[] = [

        {
            label: "User Details",
            key: "user-form",
            path: "/user-form",
            icon: <UserOutlined />,
           filepath: "../",
        },
        // {
        //     label: "PDF Upload",
        //     key: "pdf-upload",
        //     path: "/pdf-upload",
        //     icon: <PicCenterOutlined />,
        //     filepath: "../",

        // },

    ]
    return (
        <ProConfigProvider dark={!dark}    >
            <ConfigProvider
                locale={{ locale: 'en-US' }}
                theme={{
                    algorithm: theme.compactAlgorithm,
                    token: {
                        // borderRadius: 50,
                        colorBgBase: '#D3D3D9'
                    },
                    // components: {
                    //     Card: { headerBg: colorPrimary },

                    // }
                }}
            >
                <div
                    id="main-layout"
                    style={{
                        height: '100vh',
                    }}
                >
                    <ProLayout
                        title="Shahi"
                        logo={<TableOutlined />}
                        locale="en-US"
                        // colorPrimary={colorPrimary}
                        headerContentRender={(props) => (
                            <div style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>
                            <h2 style={{ fontSize: '30px' }}>VPN Management</h2>
                        </div>
                        )}
                        fixSiderbar
                        layout="mix"
                        route={{
                            path: '/',
                            routes: treeRouter(baseRouterList),
                        }}
                        location={{
                            pathname,
                        }}
                        avatarProps={{
                            src: <UserOutlined />,
                            size: 'large',
                          //  title: 'admin',
                            render: (props, dom) => (
                                <div>
                                    {dom}
                                    <Button
                                        type="text"
                                        icon={<LogoutOutlined />}
                                        onClick={handleLogout}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ),
                        }}
                        menuItemRender={(item, dom) => (
                            <Link
                                to={item?.path || '/'}
                                onClick={() => {
                                    setPathname(item.path || '/');
                                }}
                            >
                                {dom}
                            </Link>
                        )}
                        // footerRender={() => (
                           
                        // )}
                    >
                        <div>
                            <Outlet />
                        </div>
                    </ProLayout>;
                </div>
            </ConfigProvider>
        </ProConfigProvider>
    );
}

export default BasicLayout;
