import React from 'react'
import useLogin from '../../useLogin'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Prescription from './Prescription';
import PrescriptionsByRequest from './PrescriptionsByRequest';


const TreatmentRequest = () => {
    const { login, setLogin } = useLogin();
    const [requests, setRequests] = useState([]);
    const [firstCall, setFirstCall] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState();
    const [animalList, setAnimalList] = useState([])
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [message, setMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState("")
    const [prescriptionTrigger, setPrescriptionTrigger] = useState(false)
    const [viewTrigger, setViewTrigger] = useState(false);


    const submitRequest = (e) => {
        e.preventDefault()
        if (!selectedAnimal) {
            return;
        }
        const submitOptions = {
            url: "http://localhost:8080/treatment",
            method: "POST",
            data: { request: message, animalID: selectedAnimal, initiator: login.UserId }
        }
        setSelectedAnimal("")
        axios(submitOptions)
            .then(json => {
                getUserRequest()
                if (json.data == 1) {
                    setRequestStatus(true)

                } else {
                    setRequestStatus(false)
                }
            })
            .catch(err => { console.log(err) })
    }
    async function getUserRequest() {
        if (login.UserType == "care attendant") {
            const getOptions = {
                url: "http://localhost:8080/treatment/user/" + login.UserId,
                method: "GET"
            }
            axios(getOptions)
                .then(json => {
                    setRequests(json.data)
                    console.log(json.data)
                })
                .catch(err => console.log(err))
        }
        else if (login.UserType == "animal technician") {
            const getOptions = {
                url: "http://localhost:8080/treatment/stage0",
                method: "GET"
            }
            axios(getOptions)
                .then(json => {
                    setRequests(json.data)
                    console.log(json.data)
                })
                .catch(err => console.log(err))
        }

    }
    async function animalListCall() {
        if (login.UserType == "care attendant") {
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
                    console.log(json.data)
                })
                .catch(err => console.log(err + "could not get animals"))
        }
    }
    async function completePrescription(e) {
        axios({
            url: "http://localhost:8080/treatment/" + e.target.value,
            method: "PUT",
            data: {
                ApproveBy: login.UserId
            }
        }).then(json => {
            getUserRequest()
            return json.data
        })
            .catch(err => console.log("Could not mark request as complete"))
    }

    useEffect(() => {
        {
            if (firstCall === false) {
                getUserRequest();
                animalListCall()

                setFirstCall(true)
            }
            const interval = setInterval(() => {
                getUserRequest();
                animalListCall()
            }, 2000);
            return () => clearInterval(interval)
        }
    })
    return (
        <div class="column">
            {login.UserType == "care attendant" && viewTrigger ? (
                <PrescriptionsByRequest viewTrigger={viewTrigger}
                    setViewTrigger={setViewTrigger}
                    selectedRequest={selectedRequest} />) : ""}



            {prescriptionTrigger ? (<Prescription prescriptionTrigger={prescriptionTrigger}
                setPrescriptionTrigger={setPrescriptionTrigger} selectedRequest={selectedRequest} />) : ""}
            {login.UserType == "care attendant" ? (
                <div class="tile is-parent is-horizontal">
                    <div class="tile is-child is-link notification is-9">
                        <div class="column" style={{ height: "700px", overflow: "auto" }}>
                            <h1 class="title is-3">Prescription requests</h1>
                            <table class="table is-hoverable is-fullwidth is-bordered">
                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Reason of concern</th><th>Prescription status</th></tr>
                                </thead>
                                <tbody>

                                    {requests.map(request => {
                                        return (
                                            <tr>
                                                <td>{request.AnimalName}</td>
                                                <td>{request.InitiatorName}</td>
                                                <td>{request.Request}</td>
                                                <td>{request.Stage == 0 && "Waiting for prescription"}
                                                    {request.Stage == 1 && "View Prescription"}
                                                    {request.Stage == 1 && <button class="button is-link ml-4" value={request.ID}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            setSelectedRequest(e.target.value)
                                                            setViewTrigger(true)
                                                        }}>
                                                        View prescription</button>}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tile is-child is-danger notification is-3">
                        {requestStatus != true ? (

                            <div>
                                <h1 class="title is-3">Request prescription</h1>
                                <div class="select is-multiple">
                                    <p class="is-size-7">Select an animal to request prescription for </p>
                                    <select multiple size="6" style={{ width: "300px" }}
                                        onChange={(e) => setSelectedAnimal(e.target.value)}>
                                        {animalList.map((animal) => {
                                            return (<option value={animal.AnimalID}>{animal.AnimalName}{"\t#"}{animal.AnimalID}</option >)
                                        })}
                                    </select>
                                    <p class="pt-6">Symptoms:</p>
                                    <textarea class="textarea"
                                        onChange={(e) => {
                                            setMessage(e.target.value)
                                        }}></textarea>
                                    <button class="button mt-6" onClick={submitRequest}>Submit Request</button>
                                </div>
                            </div>) : ""}
                        {requestStatus === false ? (
                            <p>Request failed!</p>
                        ) : ""}

                        {requestStatus == true ? (
                            <div>
                                <h1 class="title is-4">Request Success!</h1>
                                <button class="button is-danger is-light"
                                    onClick={e => {
                                        e.preventDefault()
                                        setRequestStatus("")
                                    }}>Start new request</button>
                            </div>
                        ) : ""}


                    </div>
                </div>




            )








                : ""}


            {login.UserType == "animal technician" ? (
                <div class="tile is-parent is-horizontal">
                    <div class="tile is-child is-link notification is-12">
                        <div class="column" style={{ height: "700px", overflow: "auto" }}>
                            <h1 class="title is-3">Prescription requests</h1>
                            <table class="table is-hoverable is-fullwidth is-bordered">
                                <thead class="is-size-5" style={{ backgroundColor: "lightgrey" }}><tr><th>Animal</th> <th>Initiator</th><th>Reason of concern</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    {requests.map(request => {
                                        return (
                                            <tr>
                                                <td>{request.AnimalName}</td>
                                                <td>{request.InitiatorName}</td>
                                                <td>{request.Request}</td>
                                                <td>
                                                    <button class="button is-warning"
                                                        value={[request.ID, request.AnimalID]}
                                                        onClick={(e) => {
                                                            setPrescriptionTrigger(true)
                                                            setSelectedRequest(e.target.value)
                                                        }}> Add prescription</button>
                                                    <button class="button is-success ml-3"
                                                        value={request.ID}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            completePrescription(e)
                                                        }}>
                                                        Mark as complete</button>

                                                </td>

                                            </tr>
                                        )
                                    })}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>




            )








                : ""}

        </div>
    )
}

export default TreatmentRequest
