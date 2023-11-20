import { useEffect, useState } from "react";
import "./userProfile.css"
import Button from 'react-bootstrap/Button';
import EditProfileModal from "../editUser/EditUserModal";
import { getDatabase, ref, onValue } from 'firebase/database';
import userService from "../../services/userService"

const UserProfile = ({ user }) => {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState({});
    const db = getDatabase();

    useEffect(() => {
        const userRef = ref(db, `/users/${user.uid}`);

        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        };

        const onError = (error) => {
            console.error('Error fetching user data:', error);
        };

        const unsubscribe = onValue(userRef, onDataChange, { errorCallback: onError });

        return () => {
            // Unsubscribe from the real-time listener on component unmount
            unsubscribe();
        };
    }, [db, user]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (user && user.uid) {
    //                 const data = await userService.getUserData(user.uid);
    //                 setUserData(data);
    //             } else {
    //                 console.log("User object or UID is undefined.");
    //             }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };

    //     fetchData();
    // }, [user]);

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
                        <p>{userData.firstName}</p>
                        <p>{userData.lastName}</p>
                    </div>
                </div>

                <div className="address-contact">

                    <div className="address-info">
                        <h3>Address:</h3>
                        <div>
                            <p className="contact-info">{userData.address}</p>
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
                    <p>{userData.description}</p>
                </div>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit profile
                </Button>

                <EditProfileModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    uid = {user.uid}
                />
            </div >
        </>
    );
}

export default UserProfile;