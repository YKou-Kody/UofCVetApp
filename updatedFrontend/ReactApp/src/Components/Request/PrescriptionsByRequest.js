import React from 'react'
import useLogin from '../../useLogin'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Prescription from './Prescription';




const PrescriptionsByRequest = ({ viewTrigger, setViewTrigger, selectedRequest }) => {
    const [firstCall, setFirstCall] = useState(false);
    const [prescriptions, setPrescriptions] = useState([])

    const visibility = () => {
        if (viewTrigger = true) {
            return "modal is-active"
        } else {
            return "modal"
        }
    }


    async function getPrescriptionsForRequest() {
        axios({
            url: "http://localhost:8080/prescription/" + selectedRequest,
            method: "GET"
        })
            .then(json => {
                setPrescriptions(json.data);
                console.log(json.data)
            }).catch(err => console.log("Could not get list of prescriptions"))

    }

    useEffect(() => {
        {
            if (firstCall === false) {
                getPrescriptionsForRequest()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                getPrescriptionsForRequest()
            }, 2000);
            return () => clearInterval(interval)
        }
    })

    return (
        <div class={visibility()}>

            <div class="modal-background" onClick={(e) => {
                setViewTrigger(false)
            }}>

            </div>
            <div class="modal-content" style={{ width: "1500px", height: "800px" }}>
                <article class="tile is-child notification is-black is-12"
                >
                    <article class="tile has-text-centered">
                        <h1 class="title is-1 has-text-centered"
                            style={{ margin: "auto" }}>Prescriptions made</h1>
                    </article>
                </article>


                <article class="tile is-child notification is-white is-12"
                    style={{ height: "600px", overflow: "auto" }}>

                    <table class="table is-fullwidth is-hoverable is-bordered">
                        <thead style={{ backgroundColor: "lightGrey" }}>
                            <tr>
                                <th>Animal</th>
                                <th>Date</th>
                                <th>Treatment</th>
                                <th>Prescribed medicine</th>
                                <th>Dosage</th>
                                <th>Delivery Method</th>
                                <th>Comment / instruction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map(prescription => {
                                return (
                                    <tr>
                                        <td>{prescription.AnimalName}#{prescription.AnimalID}</td>
                                        <td>{prescription.RecordDate}</td>
                                        <td>{prescription.Treatment_Type}</td>
                                        <td>{prescription.DrugType}</td>
                                        <td>{prescription.Dosage}</td>
                                        <td>{prescription.Delivery_Method}</td>
                                        <td>{prescription.Comment}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </article>
            </div>
        </div>
    )
}

export default PrescriptionsByRequest
