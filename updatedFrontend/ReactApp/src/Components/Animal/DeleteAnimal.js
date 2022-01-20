import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const DeleteAnimal = ({ deleteTrigger, setDeleteTrigger, selectedAnimal }) => {
    const trigger = () => {
        if (deleteTrigger == true) {
            return "modal is-active"
        } else {
            return "modal"
        }
    }
    const [requestStatus, setRequestStatus] = useState()

    const deleteAnimal = (e) => {
        e.preventDefault()
        if (!selectedAnimal) {
            setRequestStatus(false)
            alert("Select an animation before pressing remove")
            return;
        }
        const deleteOptions = {
            url: "http://localhost:8080/animal/" + selectedAnimal.AnimalID,
            method: "DELETE"
        }
        axios(deleteOptions)
            .then(json => {
                return json.data
            }).then(result => {
                if (result == 1) {
                    setRequestStatus(true)
                } else {
                    setRequestStatus(false)
                }
            }).catch(err => alert(err))
    }
    return (
        <div>
            <div class={trigger()}>
                <div class="modal-background" onClick={() => setDeleteTrigger(false)}></div>
                <div class="modal-content">
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Remove animal</p>
                            <button class="delete" aria-label="close"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDeleteTrigger(false)
                                    setRequestStatus("")
                                    if (requestStatus == true) {
                                        window.location.href = "/animal"
                                    }
                                }}></button>
                        </header>
                        {requestStatus != true ? (
                            <section class="modal-card-body ">
                                <p class="title is-3 ">
                                    Confirm removal of
                                    {"\t"}{selectedAnimal.AnimalName}{" #"}{selectedAnimal.AnimalID}?
                                </p>
                            </section>) : ""}
                        <footer class="modal-card-foot ">
                            {requestStatus != true ? (
                                <section>
                                    <button class="button " onClick={(e) => {
                                        e.preventDefault()
                                        setDeleteTrigger(false)
                                        setRequestStatus("")
                                        if (requestStatus == true) {
                                            window.location.href = "/animal"
                                        }
                                    }}>Cancel</button>
                                    <button class="button is-danger"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (selectedAnimal != "") {
                                                deleteAnimal(e)
                                            }
                                        }}>Delete animal</button></section>) : ""}
                            {requestStatus === true ? <p class="has-text-success" style={{ marginLeft: "150px" }}>Animal successfully removed!</p> : ""}
                            {requestStatus === false ? <p class="has-text-danger" style={{ marginLeft: "200px" }}>Could not remove animal</p> : ""}
                        </footer>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DeleteAnimal
