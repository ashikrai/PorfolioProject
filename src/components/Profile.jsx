import React, { useState } from 'react'
import { userProfileDefaultData } from '../Utils/Constants';
import "../resources/css/profile.css"
import Btnicon from "../resources/images/logo.png"
import { Button } from '@mui/material';
import { PublishOutlined } from '@mui/icons-material';

export default function Profile() {
    const [profileData, setProfileData]= useState(userProfileDefaultData);
    const tempProfileData= profileData;

    const changeProfileData= (event)=>{
        setProfileData({...tempProfileData})
        event.preventDefault();
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileData((prevData) => ({...prevData, "Photo": reader.result}))
          };
          reader.readAsDataURL(file);
        }
    };

    const updateProfile = (event, dataType) => {
        const value= event.target.value
        switch(dataType){
            case "date":
                setProfileData((prevData) => ({...prevData, "DOB": value}))
                break;
            case "email":
                tempProfileData["EmailID"]= value
                break;
            case "number":
                tempProfileData["PhoneNo"]= value
                break;
            case "photo":
                handleImageChange(event)
                break;
            default:
                break
        }
    }
    // console.log(profileData)
    
    return (
        <div className="ProfileContainer">
            <div className='ProfileData'>
                <div className="ProfileHeader">
                    <div className="ProfilePicDiv">
                        <img alt="userPhoto" className="profilePic" src={profileData["Photo"]} />
                    </div>
                    <h1 className="userName">{profileData["Name"]}</h1>
                    <div className="BioData">
                        <p className="userData"><b>UserName:</b> {profileData["UserName"]}</p>
                        <p className="userData"><b>EmailID:</b> {profileData["EmailID"]}</p>
                        <p className="userData"><b>Number:</b> {profileData["PhoneNo"]}</p>
                        <p className="userData"><b>Address:</b> {profileData["Address"]}</p>
                        <p className="userData"><b>Description:</b> {profileData["Description"]}</p>
                    </div>
                </div>
                <div className="ProfileBody">
                    <div className="form">
                        <div className="inputDiv">
                            <p className="Tag">DOB</p>
                            <input className="profileInput" type="date" onChange={(event) => updateProfile(event, "date")} />
                        </div>
                        <div className="inputDiv">
                            <p className="Tag">Email</p>
                            <input className="profileInput" placeholder='Enter Email' type="email" onChange={(event) => updateProfile(event, "email")}/>
                        </div>
                        
                        <div className="inputDiv">
                            <p className="Tag">Phone Number</p>
                            <input className="profileInput" placeholder='Enter number'type="number" onChange={(event) => updateProfile(event, "number")}/>
                        </div>
                        
                        <div className="inputFileDiv">
                            <p className="Tag">Photo</p>
                            <div className="FileInputDiv">
                                <input className="profilePicInput" type="file" onChange={(event) => updateProfile(event, "photo")}/>
                                <div className="IconBtn">
                                    <button onClick={changeProfileData} className="ProxyBtn" >Upload</button>
                                    <img className='BtnIcon' src={Btnicon} alt="Btn Icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ProfileFooter">
                        <button onClick={changeProfileData} className="SubmitBtn" >Submit</button>
                        <Button variant='contained' endIcon={<PublishOutlined />} > Submit </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
