import { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue } from 'firebase/database';

import styles from "./userProfile.module.css"
import AuthContext from '../../contexts/authContext';

import Button from 'react-bootstrap/Button';
import EditProfileModal from "../editUser/EditUserModal";

const UserProfile = () => {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState({});
    const { userId, username, email } = useContext(AuthContext);
    const db = getDatabase();

    // TODO // move the function to the userService
    useEffect(() => {
        const userRef = ref(db, `/users/${userId}`);

        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        };

        const onError = (error) => {
            console.error('Error fetching user data:', error);
        };

        const unsubscribe = onValue(userRef, onDataChange, { errorCallback: onError });

        return () => {
            unsubscribe();
        };
    }, [userId]);

    return (
        <div className={styles['form-container']}>
            <h1>Welcome</h1>
            <p className={styles.username}>{username}</p>

            <h3 className={styles["margin-top"]}>Full Name:</h3>
            <div className={styles["names"]}>
                <div className={styles["row-style"]}>
                    <p>{userData.firstName}</p>
                    <p>{userData.lastName}</p>
                </div>
            </div>

            <div className={styles["address-contact"]}>

                <div className={styles["address-info"]}>
                    <h3>Address:</h3>
                    <div>
                        <p className={styles["contact-info"]}>{userData.address}</p>
                    </div>
                </div>

                <div className={styles["address-info"]}>
                    <h3>Contact Info:</h3>
                    <div>
                        <p className={styles["contact-info"]}>{email}</p>
                    </div>
                </div>
            </div>

            <h3>Description:</h3>
            <div className={styles["row margin-top"]}>
                <p>{userData.description}</p>
            </div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Edit profile
            </Button>

            <EditProfileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                uid={userId}
                data = {userData}
            />
        </div >
    );
}

export default UserProfile;