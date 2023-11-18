import { useState } from "react";
import "./userProfile.css"
import Button from 'react-bootstrap/Button';
import EditProfileModal from "../editUser/EditUserModal";

const UserProfile = ({ user }) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="form-container">
                <h1>Welcome</h1>
                <div className="profile-image">
                    <img className="image" />
                </div>
                <p>{user.displayName}</p>

                <h3 className="margin-top">Full Name:</h3>
                <div className="names">
                    <div className="row-style">
                        <p>Rado</p>
                        <p>Nqkoi si</p>
                    </div>
                </div>

                <div className="address-contact">

                    <div className="address-info">
                        <h3>Address:</h3>
                        <div>
                            <p className="contact-info">adressa mi </p>
                        </div>
                    </div>

                    <div className="address-info">
                        <h3>Contact Info:</h3>
                        <div>
                            <p className="contact-info">{user.email}</p>
                        </div>
                    </div>
                </div>

                <h3>Description:</h3>
                <div className="row margin-top">
                    <p>info za men</p>
                </div>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit profile
                </Button>

                <EditProfileModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div >
        </>
    );
}

export default UserProfile;