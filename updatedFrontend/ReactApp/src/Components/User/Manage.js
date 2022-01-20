import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


import useLogin from '../../useLogin'




const Manage = () => {
    const { login, setLogin } = useLogin()
    const [firstCall, setFirstCall] = useState(false)
    const [userList, setUserList] = useState([])
    async function getUserList() {
        if (login.UserType == "admin") {
            axios({ url: "http://localhost:8080/manageuser" })
                .then(json => setUserList(json.data))
                .catch(err => {
                    console.log("Could not get list of users")
                    console.log(err)
                })
        } if (login.UserType == "teacher") {
            axios({
                url: "http://localhost:8080/manageuser/student",
                method: "GET"
            })
                .then(json => setUserList(json.data))
                .catch(err => {
                    console.log("Could not get list of students")
                    console.log(err)
                })

        }

    }
    async function suspendUser(e) {
        e.preventDefault()
        axios({
            url: "http://localhost:8080/manageuser/suspend/" + e.target.value,
            method: "PUT"
        }).then(json => getUserList())
            .catch(err => console.log("Could not suspend user"))
    }

    async function unsuspendUser(e) {
        e.preventDefault()
        axios({
            url: "http://localhost:8080/manageuser/unsuspend/" + e.target.value,
            method: "PUT"
        }).then(json => getUserList())
            .catch(err => console.log("Could not unsuspend user"))
    }

    useEffect(() => {
        {
            if (firstCall === false) {
                getUserList()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                getUserList()
            }, 2000);
            return () => clearInterval(interval)
        }
    })

    return (
        <div class="columns is-centered">

            <div class="column is-9">
                <div class="column is-primary" >
                    <h1 class="title is-1">Manage user access</h1>
                    <table class="table is-fullwidth is-bordered is-hoverable">
                        <thead style={{ backgroundColor: "rgb(200,200,200)" }}>
                            <tr>
                                <th style={{ width: "25%" }}>User ID</th>
                                <th style={{ width: "25%" }}>User Name</th>
                                <th style={{ width: "25%" }}>Role</th>
                                <th style={{ width: "25%" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => {
                                if (user.UserId !== login.UserId) {
                                    return (
                                        <tr>
                                            <td>{user.UserId} </td>
                                            <td>{user.Name} </td>
                                            <td>{user.UserType} </td>
                                            <td>{user.Banned === 1 ? (
                                                <div>Currently Suspended< button class="button is-success is-small ml-5" value={user.UserId} onClick={unsuspendUser}>Restore</button></div>) :
                                                (<div>Currently Active < button class="button is-danger is-small ml-5" value={user.UserId} onClick={suspendUser}>Suspend</button></div>)}
                                            </td>

                                        </tr>

                                    )
                                }
                            })
                            }

                        </tbody>

                    </table>


                </div>
            </div>
        </div >
    )
}

export default Manage
