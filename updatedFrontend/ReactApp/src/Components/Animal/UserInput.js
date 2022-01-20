import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import useLogin from '../../useLogin';
const UserInput = ({ inputView, setInputView, selectedAnimal, selectedAnimalID }) => {
    const { login, setLogin } = useLogin()
    const [comment, setComment] = useState()
    const [measurementType, setMeasurementType] = useState()
    const [measurementValue, setMeasurementValue] = useState()
    const [status, setStatus] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [newalert, setNewAlert] = useState()
    const [severity, setSeverity] = useState()
    const [image, setImage] = useState()


    const today = new Date();
    const [date, setDate] = useState(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)





    //post request for examination
    async function postExamResult() {
        axios({
            url: "http://localhost:8080/examhistory",
            method: "POST",
            data: { date: date, measurement: measurementType, measurementValue: measurementValue, userId: login.UserId, animalId: selectedAnimalID }
        })
            .then((json) => {
                if (json.data == 1) {
                    setInputView("success")
                    setMeasurementType("")
                    setMeasurementValue("")
                }
            })
            .catch(err => alert("Could not add exam result"))
    }


    // post request for alert
    async function postAlert() {
        if (newalert == "") {
            return
        }
        axios({
            url: "http://localhost:8080/alert",
            method: "POST",
            data: { animalId: selectedAnimalID, date: date, description: newalert, severity: severity }
        })
            .then((json) => {
                if (json.data == 1) {
                    setInputView("success")
                    setNewAlert("")
                    setSeverity("")
                }
            })
            .catch(err => alert("Could not add alert"))
    }
    //post request for status update
    async function postStatus() {
        if (status == "") {
            return
        }
        axios({
            url: "http://localhost:8080/status",
            method: "POST",
            data: { animalId: selectedAnimalID, date: date, description: description, location: location, status: status }
        })
            .then((json) => {
                if (json.data == 1) {
                    setInputView("success")
                    setStatus("")
                    setDescription("")
                    setLocation("")
                }
            })
            .catch(err => console.log("Could not post status"))
    }

    async function postComment() {
        if (comment == "") {
            return
        }
        axios({
            url: "http://localhost:8080/comment",
            method: "POST",
            data: { animalId: selectedAnimalID, date: date, description: comment, userId: login.UserId }
        })
            .then((json) => {
                if (json.data == 1) {
                    setInputView("success")
                    setComment("")
                }
            })
            .catch(err => console.log("Could not post comment"))
    }
    async function postImage() {
        if (image == "") {
            return
        }
        axios({
            url: "http://localhost:8080/image",
            method: "POST",
            data: { animalId: selectedAnimalID, date: date, image: image, userId: login.UserId }
        })
            .then((json) => {
                if (json.data == 1) {
                    setInputView("success")
                    setImage("")
                }
            })
            .catch(err => console.log("Could not post image"))
    }

    return (
        <div>
            {inputView === "comment" ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Make comment</p>
                            <button class="delete" aria-label="close" onClick={(e) => setInputView("")}></button>
                        </header>
                        <section class="modal-card-body">
                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Comment:</label>
                                    <div class="control">
                                        <input class="input" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button">Cancel
                            </button>
                            <button class="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                postComment()
                            }}> Add Comment
                            </button>
                        </footer>
                    </div>
                </div>
            ) : ""}



            {inputView === "exam" ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Record Examination Result</p>
                            <button class="delete" aria-label="close" onClick={(e) => setInputView("")}></button>
                        </header>
                        <section class="modal-card-body">

                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Measurement type:</label>
                                    <div class="control">
                                        <input class="input" value={measurementType} onChange={(e) => setMeasurementType(e.target.value)} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Measurement value:</label>
                                    <div class="control">
                                        <input class="input" value={measurementValue} onChange={(e) => setMeasurementValue(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button">Cancel
                            </button>
                            <button class="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                postExamResult()
                            }}> Confirm
                            </button>
                        </footer>
                    </div>
                </div>
            ) : ""}



            {inputView === "status" ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Update Status</p>
                            <button class="delete" aria-label="close" onClick={(e) => setInputView("")}></button>
                        </header>
                        <section class="modal-card-body">

                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Status:</label>
                                    <div class="control">
                                        <input class="input" value={status} onChange={(e) => setStatus(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Description:</label>
                                    <div class="control">
                                        <input class="input" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Location:</label>
                                    <div class="control">
                                        <input class="input" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button">Cancel
                            </button>
                            <button class="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                postStatus()
                            }}> Confirm
                            </button>
                        </footer>

                    </div>

                </div>
            ) : ""}


            {inputView === "alert" ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Add Alert</p>
                            <button class="delete" aria-label="close" onClick={(e) => setInputView("")}></button>
                        </header>
                        <section class="modal-card-body" style={{ height: "300px" }}>

                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">Alert message:</label>
                                    <div class="control">
                                        <input class="input" value={newalert} onChange={(e) => setNewAlert(e.target.value)} />
                                    </div>
                                </div>
                            </section>


                            <label class="label">Severity:</label>
                            <div class="select is multiple">
                                <select multiple size="3" onChange={(e) => setSeverity(e.target.value)}>
                                    <option class="has-background-danger" value={3}>High</option>
                                    <option class="has-background-warning" value={2}>Medium</option>
                                    <option class="has-background-success" value={1}>Low</option>
                                </select>
                            </div>
                        </section>

                        <footer class="modal-card-foot">
                            <button class="button" onClick={(e) => setInputView("")}>Cancel
                            </button>
                            <button class="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                postAlert()
                            }}> Confirm
                            </button>
                        </footer>

                    </div>

                </div>
            ) : ""}


            {inputView === "image" ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Add Image</p>
                            <button class="delete" aria-label="close" onClick={(e) => setInputView("")}></button>
                        </header>
                        <section class="modal-card-body">

                            <section class="modal-card-body has-text-left">
                                <div class="field">
                                    <label class="label">URL of new image:</label>
                                    <div class="control">
                                        <input class="input" value={image} onChange={(e) => setImage(e.target.value)} />
                                    </div>
                                </div>
                            </section>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button">Cancel
                            </button>
                            <button class="button is-dark" onClick={(e) => {
                                e.preventDefault()
                                postImage()
                            }}> Add Image
                            </button>
                        </footer>

                    </div>

                </div>
            ) : ""}


            {inputView == "success" ? (

                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => setInputView("")}></div>
                    <div class="modal-content">
                        <div class="notification is-primary">
                            <button class="delete" onClick={(e) => setInputView("")}></button>
                            <h1 class="title is-1">Success!</h1>
                        </div>
                    </div>
                </div>
            ) : ""}



















        </div>
    )
}
// comment exam alert status
export default UserInput
