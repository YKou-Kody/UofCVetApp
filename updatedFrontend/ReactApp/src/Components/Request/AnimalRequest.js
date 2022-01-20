import React from 'react'
import axios from 'axios';
import { FaApple } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaDog, FaTrash } from 'react-icons/fa'
import useLogin from '../../useLogin';

const AnimalRequest = () => {
    const { login, setLogin } = useLogin();
    const [animalList, setAnimalList] = useState([])
    const [firstCall, setFirstCall] = useState(false);
    const [requestList, setRequestList] = useState([])
    const [unavailableAnimals, setUnavailableAnimals] = useState([])
    const [selectedAnimal, setSelectedAnimal] = useState();
    const [reasoning, setReasoning] = useState("");
    const [postStatus, setPostStatus] = useState()


    async function animalListCall() {
        if (login.UserType == "teacher") {
            const getOptions = {
                url: "http://localhost:8080/animal",
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/jason;charset=UTF-8"
                }
            }
            axios(getOptions)
                .then(json => {
                    setAnimalList(json.data)
                })
                .catch(err => console.log(err + "could not get animals"))
        }
    }

    async function getUnavailableAnimalListCall() {
        const unavailable = {
            url: "http://localhost:8080/request/unavailable",
            method: "GET"
        }
        axios(unavailable)
            .then(json => {
                setUnavailableAnimals(json.data)
            })
            .catch(err => console.log(err))
    }

    async function userRequestCall() {
        if (login.UserType == "teacher") {
            const getOptions = {
                url: "http://localhost:8080/request/user/" + login.UserId,
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/jason;charset=UTF-8"
                }
            }
            axios(getOptions)
                .then(json => {
                    setRequestList(json.data)

                })
                .catch(err => console.log(err + "could not get request data"))
        }
        else if (login.UserType == "admin") {
            const getOptions = {
                url: "http://localhost:8080/request/stage/" + 0,
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/jason;charset=UTF-8"
                }
            }
            axios(getOptions)
                .then(json => {
                    setRequestList(json.data)

                })
                .catch(err => console.log(err))
        } else if (login.UserType == "animal technician") {
            const getOptions = {
                url: "http://localhost:8080/request/stage/" + 1,
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/jason;charset=UTF-8"
                }
            }
            axios(getOptions)
                .then(json => {
                    setRequestList(json.data)

                })
                .catch(err => console.log(err))
        }
    }
    async function cancelRequest(e) {
        e.preventDefault();
        let num = e.target.value
        const cancelOptions = {
            url: `http://localhost:8080/request/${e.target.value}`,
            method: "PUT",
            params: { stage: 4 }
        }
        axios(cancelOptions)
            .then(resp => {
                userRequestCall()
                animalListCall()
                getUnavailableAnimalListCall()
                return resp;
            })
            .then(json => {
                console.log(json)

            })
            .catch(err => console.log(err))
    }

    async function approveRequest(e) {
        e.preventDefault();
        let num = e.target.value
        let stage;
        if (login.UserType == "admin") {
            stage = 1
        } else if (login.UserType == "animal technician") {
            stage = 2
        }
        const proceedOptions = {
            url: `http://localhost:8080/request/${e.target.value}`,
            method: "PUT",
            params: { stage: stage }
        }
        axios(proceedOptions)
            .then(resp => {
                userRequestCall()
                return resp;
            })
            .catch(err => console.log(err))
    }



    async function completeRequest(e) {
        e.preventDefault();
        let num = e.target.value
        const cancelOptions = {
            url: `http://localhost:8080/request/${e.target.value}`,
            method: "PUT",
            params: { stage: 5 }
        }
        axios(cancelOptions)
            .then(resp => {
                animalListCall()
                getUnavailableAnimalListCall()
                userRequestCall()
                return resp;
            })
            .catch(err => console.log(err))
    }

    async function postRequest(e) {
        // const postRequest = (e) => {
        if (!selectedAnimal) {
            return
        }
        e.preventDefault()
        const postOptions = {
            url: "http://localhost:8080/request",
            method: "POST",
            data: { initiator: login.UserId, animal: selectedAnimal, reason: reasoning }
        }
        setSelectedAnimal("")
        axios(postOptions)
            .then(json => {
                userRequestCall()
                getUnavailableAnimalListCall()
                animalListCall()
                return json.data
            })
            .then(result => {
                if (result == 1) {
                    setPostStatus(true)
                } else {
                    setPostStatus(false)
                }
            })
            .catch(err => alert(err))
    }




    useEffect(() => {
        {
            if (firstCall === false) {
                userRequestCall()
                animalListCall()
                getUnavailableAnimalListCall()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                userRequestCall()
                animalListCall()
                getUnavailableAnimalListCall()
            }, 2000);
            return () => clearInterval(interval)
        }
    })



    return (

        <div class="column">
            {login.UserType == "teacher" ? (
                <div class="tile is ancestor">
                    <div class="tile is vertical is-9">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <div class="tile is-child notification is-primary" >
                                    <div class="column" style={{ height: "700px", overflow: "auto" }}>
                                        <h1 class="title is-2"> Active Requests</h1>
                                        <div class="column" >
                                            <table class='table is-hoverable is-fullwidth is-bordered'>
                                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Purpose of request</th><th>Current stage</th><th>Action</th></tr></thead>
                                                <tbody>
                                                    {requestList.map((item) => {
                                                        if (item.Stage < 3) {
                                                            return (
                                                                <tr>
                                                                    <td>{item.AnimalName}{"\t#"}{item.Animal}</td>
                                                                    <td>{item.InitiatorName}</td>
                                                                    <td>{item.reason}</td>
                                                                    <td>{item.Stage == 0 && "Awaiting admin approval"}
                                                                        {item.Stage == 1 && "Awaiting technician approval"}
                                                                        {item.Stage == 2 && "Approved"}
                                                                        {item.Stage == 3 && "Rejected"}
                                                                        {item.Stage == 4 && "Cancelled"}
                                                                        {item.Stage == 5 && "Completed, animal returned"}
                                                                    </td>

                                                                    <td>{item.Stage <= 1 ? (<button class="button is-danger" value={item.RequestID}
                                                                        onClick={cancelRequest}>Cancel Request</button>) : ""
                                                                    }
                                                                        {item.Stage == 2 ? (<button class="button is-success" value={item.RequestID}
                                                                            onClick={completeRequest}>Complete</button>) : ""
                                                                        }
                                                                    </td>
                                                                </tr>)
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <h1 class="title is-2 pt-6">Request history</h1>
                                            <table class='table is-hoverable is-fullwidth is-bordered'>
                                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Purpose of request</th><th>Current stage</th><th>Action</th></tr></thead>
                                                <tbody>
                                                    {requestList.map((item) => {
                                                        if (item.Stage >= 3) {
                                                            return (
                                                                <tr>
                                                                    <td>{item.AnimalName}{"\t#"}{item.Animal}</td>
                                                                    <td>{item.InitiatorName}</td>
                                                                    <td>{item.reason}</td>
                                                                    <td>{item.Stage == 0 && "Awaiting admin approval"}
                                                                        {item.Stage == 1 && "Awaiting technician approval"}
                                                                        {item.Stage == 2 && "Approved"}
                                                                        {item.Stage == 3 && "Rejected"}
                                                                        {item.Stage == 4 && "Cancelled"}
                                                                        {item.Stage == 5 && "Completed, animal returned"}
                                                                    </td>

                                                                    <td>{item.Stage <= 1 ? (<button class="button is-danger" value={item.RequestID}
                                                                        onClick={cancelRequest}>Cancel Request</button>) : ""
                                                                    }
                                                                        {item.Stage == 2 ? (<button class="button is-success" value={item.RequestID}
                                                                            onClick={completeRequest}>Complete</button>) : ""
                                                                        }
                                                                    </td>
                                                                </tr>)
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tile is vertical is-3">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <div class="tile is-child notification is-link">
                                    {postStatus == true ? (
                                        <div>
                                            <h1 class="title is-3 has-text-success">Request success!</h1>
                                            <button class="button is-primary is-medium" onClick={(e) => {
                                                e.preventDefault();
                                                setPostStatus("");
                                            }}>Start new request</button>
                                        </div>
                                    ) : ""}
                                    {postStatus != true ? (
                                        <div>
                                            <h1 class="title is-3">Create request</h1>
                                            <div class="select is-multiple">
                                                <p >Select an animal to request</p>
                                                <select multiple size="5" style={{ width: "300px" }} onChange={(e) => setSelectedAnimal(e.target.value)}>
                                                    {animalList.map((animal) => {
                                                        for (let i = 0; i < unavailableAnimals.length; i++) {
                                                            if (unavailableAnimals[i] == animal.AnimalID)
                                                                return;
                                                        }
                                                        return (<option value={animal.AnimalID}>{animal.AnimalName}{"\t#"}{animal.AnimalID}</option >)
                                                    })}
                                                </select>
                                                <p class="help is-italic">*Animals not included in the list are unavailable</p>
                                                <p class="pt-6">Reasoning:</p>
                                                <textarea class="textarea" onChange={(e) => {
                                                    setReasoning(e.target.value)
                                                }}></textarea>
                                                <button class="button mt-6" onClick={postRequest}>Submit Request</button>
                                            </div>
                                        </div>) : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : ""
            }

            {login.UserType == "admin" ? (
                <div class="tile is ancestor">
                    <div class="tile is vertical is-12">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <div class="tile is-child notification is-primary" >
                                    <div class="column" style={{ height: "700px", overflow: "auto" }}>
                                        <h1 class="title is-2">Requests awaiting admin approval</h1>
                                        <div class="column" >
                                            <table class='table is-hoverable is-fullwidth is-bordered'>
                                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Purpose of request</th><th>Current stage</th><th>Action</th></tr></thead>
                                                <tbody>
                                                    {requestList.map((item) => {
                                                        if (item.Stage < 3) {
                                                            return (
                                                                <tr>
                                                                    <td>{item.AnimalName}{"\t#"}{item.Animal}</td>
                                                                    <td>{item.InitiatorName}</td>
                                                                    <td>{item.reason}</td>
                                                                    <td>{item.Stage == 0 && "Awaiting admin approval"}
                                                                    </td>

                                                                    <td>{item.Stage <= 1 ? (<button class="button is-danger mr-2 pr-5 pl-5" value={item.RequestID}
                                                                        onClick={cancelRequest}>Reject</button>) : ""
                                                                    }
                                                                        {item.Stage == 0 ? (<button class="button is-success" value={item.RequestID}
                                                                            onClick={approveRequest}>Approve</button>) : ""
                                                                        }
                                                                    </td>
                                                                </tr>)
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : ""
            }


            {login.UserType == "animal technician" ? (
                <div class="tile is ancestor">
                    <div class="tile is vertical is-12">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <div class="tile is-child notification is-primary" >
                                    <div class="column" style={{ height: "700px", overflow: "auto" }}>
                                        <h1 class="title is-2">Requests awaiting animal technician approval</h1>
                                        <div class="column" >
                                            <table class='table is-hoverable is-fullwidth is-bordered'>
                                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Purpose of request</th><th>Current stage</th><th>Action</th></tr></thead>
                                                <tbody>
                                                    {requestList.map((item) => {
                                                        if (item.Stage < 3) {
                                                            return (
                                                                <tr>
                                                                    <td>{item.AnimalName}{"\t#"}{item.Animal}</td>
                                                                    <td>{item.InitiatorName}</td>
                                                                    <td>{item.reason}</td>
                                                                    <td>{item.Stage == 1 && "Awaiting technician approval"}
                                                                    </td>
                                                                    <td>{item.Stage == 1 ? (<button class="button is-danger mr-2 pr-5 pl-5" value={item.RequestID}
                                                                        onClick={cancelRequest}>Reject</button>) : ""
                                                                    }
                                                                        {item.Stage == 1 ? (<button class="button is-success" value={item.RequestID}
                                                                            onClick={approveRequest}>Approve</button>) : ""
                                                                        }
                                                                    </td>
                                                                </tr>)
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : ""
            }
        </div >
    )
}


export default AnimalRequest
