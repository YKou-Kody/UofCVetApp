import React from 'react'
import Comments from './Comments'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Prescription from '../Request/Prescription';

const Panel = ({ selectedAnimal, selectedAnimalID }) => {
    const [comments, setComments] = useState([])
    const [treatments, setTreatments] = useState([])
    const [exams, setExams] = useState([])
    const [status, setStatus] = useState([])
    const [alerts, setAlerts] = useState([])
    const [images, setImages] = useState([])

    const [view, setView] = useState("")

    async function getExams() {
        axios({
            url: "http://localhost:8080/examhistory/" + selectedAnimalID,
            method: "GET"
        }).then(json => setExams(json.data))
            .catch(err => console.log("Could not get exam history for animal"))
    }

    const getComments = () => {
        const getCommentOptions = {
            url: "http://localhost:8080/comment/" + selectedAnimalID,
            method: "GET"
        }
        axios(getCommentOptions)
            .then(json => {
                return json.data
            })
            .then(result => {
                setComments(result)
            })
            .catch(err => console.log("Could not get comments for animal"))
    }

    const getPrescriptions = () => {
        axios({
            url: "http://localhost:8080/prescription/animal/" + selectedAnimalID,
            method: "GET"
        }).then(json => setTreatments(json.data))
            .catch(err => console.log("Could not get prescriptions for animal"))
    }

    async function getAlerts() {
        axios({
            url: "http://localhost:8080/alert/" + selectedAnimalID,
            method: "GET"
        }).then(json => setAlerts(json.data))
            .catch(err => console.log("Could not get alerts for animal"))
    }

    async function getStatus() {
        axios({
            url: "http://localhost:8080/status/" + selectedAnimalID,
            method: "GET"
        }).then(json => setStatus(json.data))
            .catch(err => console.log("Could not get status history for animal"))
    }
    async function getImages() {
        axios({
            url: "http://localhost:8080/image/" + selectedAnimalID,
            method: "GET"
        }).then(json => setImages(json.data))
            .catch(err => console.log("Could not get images for animal"))
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (view == "alerts") {
                getAlerts()
            }
            if (view == "treaments") {
                getPrescriptions()
            }
            if (view == "comments") {
                getComments()
            }
            if (view == "exams") {
                getExams()
            } if (view == "status") {
                getStatus()
            } if (view == "images") {
                getImages()
            }
        }, 1000)
        return () => clearInterval(interval)

    })



    return (
        <div class="columns">
            <div class="column is-2" style={{ position: "relative", left: "30px" }}>
                <button class="button is-fullwidth is-medium is-warning pt-6 pb-6" onClick={(e) => {
                    setView("images")
                    e.preventDefault()
                    getImages()
                }}
                    style={view == "images" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Images
                </button>
                <button class="button is-fullwidth is-medium is-success pt-6 pb-6" onClick={(e) => {
                    setView("comments")
                    e.preventDefault()
                    getComments()
                }}
                    style={view == "comments" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Comments
                </button>
                <button class="button is-fullwidth is-medium is-primary pt-6 pb-6" onClick={(e) => {
                    setView("treatments")
                    e.preventDefault()
                    getPrescriptions()
                }}
                    style={view == "treatments" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Treatment/Prescription
                </button>
                <button class="button is-fullwidth is-medium is-info pt-6 pb-6" onClick={(e) => {
                    e.preventDefault()
                    setView("exams")
                    getExams()
                }} style={view == "exams" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Examination data
                </button>
                <button class="button is-fullwidth is-medium is-link pt-6 pb-6" onClick={(e) => {
                    e.preventDefault()
                    setView("status")
                    getStatus()
                }} style={view == "status" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Status history
                </button>

                <button class="button is-fullwidth is-medium is-danger pt-6 pb-6" onClick={(e) => {
                    setView("alerts")
                    e.preventDefault()
                    getAlerts()
                }}
                    style={view == "alerts" ? { height: "200px", transition: "0.5s" } : { transition: "0.5s" }}>
                    Alerts
                </button>

            </div>
            <div class="column is-10 has-text-centered has-background-light" style={{ border: "20px solid black", overflow: "auto", height: "800px", borderRadius: "2em" }} >

                {view == "images" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-warning">
                                <tr>
                                    <th width="300px">Animal Images:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images?.map((image) => {
                                    return (
                                        <tr>
                                            <td>
                                                <p>{image.Date}</p>
                                                <img src={image.FileLocation} />
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>

                ) : ""}

                {view == "comments" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-primary">
                                <tr>
                                    <th width="300px">Date</th>
                                    <th>Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments?.map((comment) => {
                                    return (
                                        <tr>
                                            <td>{comment.Date}</td>
                                            <td>{comment.Description}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : ""}

                {view == "treatments" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-success">
                                <tr>
                                    <th width="300px">Date</th>
                                    <th width="300px">Treatment</th>
                                    <th width="300px">Prescribed Medicine</th>
                                    <th width="300px">Dosage</th>
                                    <th width="300px">Delivery method</th>
                                    <th width="300px">Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatments?.map((treatment) => {
                                    return (
                                        <tr>
                                            <td>{treatment.RecordDate}</td>
                                            <td>{treatment.Treatment_Type}</td>
                                            <td>{treatment.DrugType}</td>
                                            <td>{treatment.Dosage}</td>
                                            <td>{treatment.Delivery_method}</td>
                                            <td>{treatment.Comment}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>

                ) : ""}

                {view == "exams" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-info">
                                <tr>
                                    <th width="300px">Date</th>
                                    <th width="300px">Measurement type</th>
                                    <th width="300px">Measurement value</th>
                                    <th>Measured by</th>

                                </tr>
                            </thead>
                            <tbody>
                                {exams?.map((exam) => {
                                    return (
                                        <tr>
                                            <td>{exam.Date}</td>
                                            <td>{exam.Measurement}
                                            </td>
                                            <td>{exam.MeasurementValue}</td>
                                            <td>{exam.Name}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>) : ""}

                {view == "status" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-link">
                                <tr>
                                    <th width="300px">Date</th>
                                    <th width="300px">Status</th>
                                    <th width="300px">Location</th>
                                    <th>Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {status?.map((stat) => {
                                    return (
                                        <tr>
                                            <td>{stat.Date}</td>
                                            <td>{stat.Status}
                                            </td>
                                            <td>{stat.Location}</td>
                                            <td>{stat.Description}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>) : ""}









                {view == "alerts" ? (
                    <div class="column is-centered">
                        <table class="table has-text-centered is-bordered is-striped is-hoverable is-fullwidth" style={{ margin: "auto" }}>
                            <thead class="has-background-danger">
                                <tr>
                                    <th width="300px">Date</th>
                                    <th width="300px">Severity</th>
                                    <th width="300px">Description</th>


                                </tr>
                            </thead>
                            <tbody>
                                {alerts?.map((alert) => {
                                    return (
                                        <tr>
                                            <td>{alert.Date}</td>
                                            <td>
                                                {alert.Severity === 3 && (<span class="tag is-danger is-medium">High</span>)}
                                                {alert.Severity === 2 && (<span class="tag is-warning is-medium">Medium</span>)}
                                                {alert.Severity === 1 && (<span class="tag is-primary is-medium">Low</span>)}
                                            </td>
                                            <td>{alert.Description}</td>
                                        </tr>)
                                })}
                                {/* <tr>{comments[0]?.Description}</tr> */}

                            </tbody>


                        </table>



                    </div>) : ""}

            </div>

        </div>
    )
}

export default Panel
