import React from 'react';
import {connect} from "react-redux";
import PersonIco from "src/icons/PersonIco";
import ProfilePicture from "src/components/ProfilePicture";
import {selectAuthProfilePicture} from "src/feature/auth/authSlice";

type Props = {
    picture?: string;
}

const ProfileIndicator = (props: Props) => {
    if (props.picture) {
        return <ProfilePicture className="profile-picture-loaded" src={props.picture} alt="Profile Picture"/>
    } else {
        return (<PersonIco/>)
    }
};

const mapStateToProps = state => ({
    picture: selectAuthProfilePicture(state)
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndicator);
