import React, { useState } from 'react';
import { FileOutlined, PieChartOutlined,ProfileOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Imgs from './Image/Imgs';
import Text from './Image/Text';

const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children)
  {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Đấu giá online', '1', <PieChartOutlined />),
  getItem('Tài sản đấu giá', 'sub1', <UserOutlined />, [
    getItem('Tài sản nhà nước', '2'),
    getItem('Bất Động sản', '3'),
    getItem('Phương tiện-xe cộ', '4'),
    getItem('Sưu tầm nghệ thuật', '5'),
    getItem('Tà sản khác', '6'),
  ]),
  getItem('Cuộc đấu giá', 'sub2', <TeamOutlined />, [
    getItem('Cuộc đấu giá đang diễn ra ', '7'),
    getItem('Cuộc đấu giá sắp diễn ra', '8'),
    getItem('Cuộc đấu giá đã kết thúc', '9'),
  ]),
  getItem('Tin tức', '10', <FileOutlined />),
  getItem('Giới thiệu', '11'),
  getItem('Product', '12'),
  getItem('Profile', '13', <ProfileOutlined />),
  getItem('Logout', '14', <LogoutOutlined />),
];

const Home = () => {
  const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  };

  const handleMenuItemClick = (key) => {
    switch (key) {
      case '1':
        window.location.reload();
        break;
      case '2':
        break;
      case '3':
        break;

      case '4':
        break;

      case '5':
        break;

      case '6':
        break;

      case '7':
        break;

      case '8':
        break;

      case '9':
        break;

      case '10':
        break;

      case '11':
        break;

      case '12':
        navigate('/product');
        break;

      case '13':
        navigate('/profile')
          
        break;
      case '14':
        // Thực hiện các bước đăng xuất nếu cần
        handleLogout();
       
        break;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Header style={{ marginTop: 30 }}>
        <Menu items={items} mode="horizontal" onClick={({ key }) => handleMenuItemClick(key)}>
        </Menu>
      </Header>

      <Content style={{display: 'flex',flexDirection:"row"}}>
        <Text />
      <div style={{ color: 'green', fontSize: 14, marginLeft:150}}>
        {/* <Link to="/">Đăng xuất</Link> */}
        <h1>Khách hàng và đối tác tiêu biểu</h1>
        <Imgs />
      </div>
 </Content>
 

      <Footer style={{ textAlign: 'center', color: 'white', backgroundColor: 'black' }}>
        Design Action ©{new Date().getFullYear()} Created by Group 1<br />
      </Footer>
    </Layout>
  );
};

export default Home;
