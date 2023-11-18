import "./userProfile.css"

const UserProfile = ({user}) => {
    return (
        <>
            <div class="form-container ">
                <h1>Welcome</h1>
                <div class="profile-image">
                    <img width="120" height="120" class="margin-top mat-elevation-z1" />
                </div>

                <h3 class="margin-top">Full Name:</h3>
                <div class="names">
                    <div class="row margin-top">
                        <p>{user.username}</p>
                        <p>Rado</p>
                    </div>
                </div>

                <h3>Address:</h3>
                <div class="row margin-top">
                    <p class="contact-info">adressa mi </p>
                </div>

                <h3>Contact Info:</h3>
                <div class="row margin-top">
                    <p class="contact-info">12312313</p>
                    <p class="contact-info">{user.email}</p>
                </div>

                <h3>Description:</h3>
                <div class="row margin-top">
                    <p>info za men</p>
                </div>

            </div >
        </>
    );
}

export default UserProfile;