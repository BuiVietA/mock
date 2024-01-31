import { Button } from "antd"
import Sider from "antd/es/layout/Sider"
import Layout, { Content, Footer, Header } from "antd/es/layout/layout"




const Profile = () => {

    return (
       <Layout>
        <Header>
            
        </Header>
        <Layout>
            <Sider width={250} style={{backgroundColor:"yellowgreen", borderRadius: 10, height:'90vh',}}>
                <div style={{display: 'flex', flexDirection: 'column', padding:20}}>
                <Button title="Edit profile"> Edit profile</Button>
                <Button title="Product">Product</Button>
                </div>
            </Sider>
        </Layout>
        
       </Layout>
    )
}

export default Profile