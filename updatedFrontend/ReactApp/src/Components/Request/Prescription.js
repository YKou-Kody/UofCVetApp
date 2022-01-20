import React from 'react'
import useLogin from '../../useLogin'
import axios from 'axios';
import { useState, useEffect } from 'react';


const Prescription = ({ prescriptionTrigger, setPrescriptionTrigger, selectedRequest }) => {
    const [drugs, setDrugs] = useState([])
    const [firstCall, setFirstCall] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState("")
    const [treatments, setTreatments] = useState([])
    const [selectedTreatment, setSelectedTreatment] = useState("")
    const [dosage, setDosage] = useState("")
    const [delivery, setDelivery] = useState("")
    const [comment, setComment] = useState("")
    const { login, setLogin } = useLogin();
    const today = new Date();
    const [date, setDate] = useState(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)
    const [requestStatus, setRequestStatus] = useState("")


    const visibility = () => {
        if (prescriptionTrigger === true) {
            return "modal is-active"
        } else {
            return "modal"
        }
    }

    async function addPrescription(e) {
        e.preventDefault()
        if (selectedTreatment == "" || selectedDrug == "") {
            return
        }
        axios({
            url: "http://localhost:8080/prescription",
            method: "POST",
            data: {
                Initiator: login.UserId, AnimalID: selectedRequest.substring(selectedRequest.indexOf(",") + 1),
                RecordDate: date, Instructions: selectedTreatment, DrugID: selectedDrug,
                Dosage: dosage, Delivery_Method: delivery, RequestID: selectedRequest.substring(0, selectedRequest.indexOf(",")),
                Comment: comment
            }
        }).then(json => {
            return json.data
        }).then(result => {
            if (result == 1) {
                setRequestStatus(true)
            } else {
                setRequestStatus(false)
            }
        }).catch(err => alert(err + " could not make prescription"))

    }
    async function getDrugs() {
        axios({
            url: "http://localhost:8080/drug",
            method: "GET"
        })
            .then(json => {
                setDrugs(json.data)
            })
            .catch(err => alert("Could not get drug list"))
    }

    async function getTreatments() {
        axios({
            url: "http://localhost:8080/remedy",
            method: "GET"
        })
            .then(json => {
                setTreatments(json.data)
            })
            .catch(err => alert("Could not get treatment list"))
    }





    useEffect(() => {
        {
            if (firstCall === false) {
                getDrugs()
                getTreatments()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                getTreatments()
                getDrugs()
            }, 2000);
            return () => clearInterval(interval)
        }
    })


    return (
        <div class={visibility()}>
            <div class="modal-background" onClick={() => setPrescriptionTrigger(false)}></div>
            <div class="modal-content">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add prescription</p>
                    <button class="delete" aria-label="close" onClick={() => setPrescriptionTrigger(false)}></button>
                </header>

                {requestStatus != true ? (
                    <div>
                        <section class="modal-card-body">

                            <div class="select is-multiple">
                                <h1 class="title is-6 mb-1" >Schedule treatment</h1>

                                <select multiple size="6" style={{ width: "300px" }}
                                    onChange={(e) => {
                                        setSelectedTreatment(e.target.value)
                                    }}>
                                    {treatments.map(treatment => {
                                        return (<option value={treatment.ID}>{treatment.Treatment_Type}</option>)
                                    })}
                                </select>

                            </div>

                            <div class="select is-multiple">
                                <h1 class="title is-6 mb-1" >Prescribe medicine</h1>
                                <select multiple size="6" style={{ width: "300px" }}
                                    onChange={(e) => {
                                        setSelectedDrug(e.target.value)
                                    }}>
                                    {drugs.map(drug => {
                                        return (<option value={drug.ID}>{drug.DrugType}</option>)
                                    })}
                                </select>

                            </div>

                        </section>
                        <section class="modal-card-body has-text-left">
                            <div class="field">
                                <label class="label">Dosage:</label>
                                <div class="control">
                                    <input class="input" value={dosage}
                                        onChange={(e) => {
                                            setDosage(e.target.value)
                                        }} />
                                </div>
                            </div>
                        </section>

                        <section class="modal-card-body has-text-left">
                            <div class="field">
                                <label class="label">Delivery method:</label>
                                <div class="control">
                                    <input class="input" value={delivery}
                                        onChange={(e) => {
                                            setDelivery(e.target.value)
                                        }} />
                                </div>
                            </div>
                        </section>

                        <section class="modal-card-body has-text-left">
                            <div class="field">
                                <label class="label">Instructions/comments:</label>
                                <div class="control">
                                    <textarea class="textarea"
                                        onChange={(e) => {
                                            setComment(e.target.value)
                                        }}></textarea>
                                </div>
                            </div>
                        </section>
                    </div>) : ""}
                {requestStatus === true ? (
                    <section class="modal-card-body">
                        <h1 class="title is-success">Prescription added</h1>
                    </section>
                ) : ""}




                <footer class="modal-card-foot">

                    {requestStatus != true ? (
                        <div>
                            <button class="button is-danger" onClick={() => setPrescriptionTrigger(false)}>Cancel</button>
                            <button class="button is-warning" onClick={(e) => {
                                e.preventDefault()
                                addPrescription(e)
                            }}>Add Prescription</button>
                        </div>) : ""}
                    {requestStatus === false ? (<p class="has-text-danger ml-6">Request failed</p>)
                        : ""}
                </footer>


            </div>

        </div >
    )
}

export default Prescription
