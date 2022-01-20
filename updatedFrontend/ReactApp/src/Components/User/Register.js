import React from 'react'
import useLogin from '../../useLogin'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'


const Register = () => {
    const today = new Date();
    const { login, removeLogin } = useLogin();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [date, setDate] = useState(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)
    const [requestStatus, setRequestStatus] = useState("")
    const [usernameList, setUsernameList] = useState([])
    const [usernameCheck, setUsernameCheck] = useState([])
    const [fullname, setFullname] = useState("")
    const [firstCall, setFirstCall] = useState(false)


    const addUser = (e) => {
        e.preventDefault()
        if (!username) {
            alert("Please enter an username")
            setRequestStatus(false)
            return;
        }
        if (usernameCheck?.includes(username)) {
            alert("username exists")
            return;
        }
        if (!password) {
            alert("Please enter a password longer than 5 characters")
            setRequestStatus(false)
            return;
        }
        if (!fullname) {
            alert("Enter fullname")
            return;
        }
        if (!userType) {
            alert("Select a user type")
            return;
        }
        e.preventDefault()
        const newAnimalOptions = {
            url: "http://localhost:8080/manageuser",
            method: "POST",
            data: {
                username: username,
                password: password,
                userType: userType,
                email: email, date: date,
                fullname: fullname
            }
        }
        axios(newAnimalOptions)
            .then(json => {
                return json.data
            })
            .then(result => {
                if (result == 1) {
                    setRequestStatus(true)
                } else {
                    setRequestStatus(false)
                }
            })
            .catch(err => alert(err))
    }

    const checkUsername = () => {
        let test;
        const checkUsernameOptions = {
            url: "http://localhost:8080/manageuser/usernamecheck",
            method: "GET",
        }
        axios(checkUsernameOptions)
            .then(json => {
                return json.data
            })
            .then(usernames => {
                // test = usernames;
                // for (let i = 0; i < usernames.length; i++) {
                //     if (user === usernames[i]) {
                //         return false;
                //     }
                // }
                // alert("reaches here")
                // return true;
                setUsernameCheck(usernames)

            }).catch(err => alert(err))

    }
    useEffect(() => {
        {
            if (firstCall === false) {
                checkUsername()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                checkUsername()
                console.log(usernameCheck)
            }, 5000);
            return () => clearInterval(interval)
        }
    })


    return (

        <div class="columns is-centered mt-6">
            {login.UserType == "admin" ? (
                <div class="column is-half is-right" >
                    <p class="title is-2"> Register an user</p>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Username: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Enter username" value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }} />
                                </p>
                            </div>
                            <div class="field-label is-normal">
                                <label class="label">Password: </label>
                            </div>
                            <div class="field">
                                <p class="control is-expanded">
                                    <input class="input is-success" type="password" placeholder="Enter a password" value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Email: </label>
                        </div>
                        <div class="field-body">
                            <div class="field is-expanded">
                                <p class="control is-expanded">
                                    <input class="input" type="email" placeholder="Enter email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Full name: </label>
                        </div>
                        <div class="field-body">
                            <div class="field is-expanded">
                                <p class="control is-expanded">
                                    <input class="input" type="email" placeholder="Enter full name" value={fullname} onChange={(e) => {
                                        setFullname(e.target.value)
                                    }} />
                                </p>
                            </div>

                        </div>
                    </div>


                    <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">User role: </label>
                        </div>
                        <div class="field-body">
                            <div class="field is-narrow">
                                <div class="control">
                                    <label class="radio mr-3">
                                        <input type="radio" name="role" onChange={(e) => {
                                            setUserType("admin")
                                        }} />
                                        Admin
                                    </label>
                                    <label class="radio mr-3">
                                        <input type="radio" name="role" onChange={(e) => {
                                            setUserType("animal technician")
                                        }} />
                                        Animal Health Technician
                                    </label>
                                    <label class="radio mr-3">
                                        <input type="radio" name="role" onChange={(e) => {
                                            setUserType("teacher")
                                        }} />
                                        Teaching Technician
                                    </label>
                                    <label class="radio mr-3">
                                        <input type="radio" name="role" onChange={(e) => {
                                            setUserType("care attendant")
                                        }} />
                                        Animal Care Attendant
                                    </label>
                                    <label class="radio mr-3">
                                        <input type="radio" name="role" onChange={(e) => {
                                            setUserType("student")
                                        }} />
                                        Student
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="field is-horizontal">
                        <div class="field-label">
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary" onClick={e => {
                                        addUser(e)
                                    }}>
                                        Register user
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {requestStatus ? <p class="has-text-success" style={{ marginLeft: "130px" }}>Register successful</p> : ""}
                    {requestStatus === false ? <p class="has-text-danger" style={{ marginLeft: "130px" }}>Register failed</p> : ""}

                </div>) : ""}
        </div >
    )
}

export default Register
