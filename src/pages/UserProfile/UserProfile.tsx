import {FC} from "react";
import Layout from "../../components/Layout/Layout";
import {Link} from "react-router-dom";

const UserProfile: FC = () => {
    return (
        <Layout>

            <div>This is user profile page</div>

            <Link to="/">Go to Homepage</Link>


        </Layout>
    )
}

export default UserProfile