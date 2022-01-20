import React from 'react'
import AnimalRequest from './AnimalRequest'
import TreatmentRequest from "./TreatmentRequest"
import { FaDog, FaTrash } from 'react-icons/fa'
import useLogin from '../../useLogin'
import {
    BrowserRouter as Router,
    Routes,
    Route, Link
} from "react-router-dom";

const Requests = ({ requestView, setRequestView }) => {
    const { login, removeLogin } = useLogin();
    return (
        <div class="columns is-centered is-multilined">
            <div class="column is-four-fifths">
                <nav class="breadcrumb is-centered is-large" aria-label="breadcrumbs">
                    <ul>

                        {login.UserType == "admin" || login.UserType == "animal technician" || login.UserType == "teacher" ? (
                            <li class={requestView == "animalRequests" ? ("is-active") : ""}>
                                <a class={requestView == "animalRequests" ? ("is-active") : ""} onClick={e => {
                                    e.preventDefault()
                                    setRequestView("animalRequests")
                                }}>
                                    <span class='icon-is-small'>
                                        <FaDog />
                                    </span>
                                    <span>Animal Requests</span>
                                </a>
                            </li>) : ""}



                        {login.UserType == "animal technician" || login.UserType == "care attendant" ? (
                            <li class={requestView == "treatmentRequests" ? ("is-active") : ""}>
                                <a onClick={e => {
                                    e.preventDefault()
                                    setRequestView("treatmentRequests")
                                }} >
                                    <span class='icon-is-small'>
                                        <FaDog />
                                    </span>
                                    <span>Treatment requests</span>
                                </a>
                            </li>) : ""}
                    </ul>
                </nav>
                {requestView == "animalRequests" ? (
                    <AnimalRequest />) : ""}

                {requestView == "treatmentRequests" ? (<TreatmentRequest />) : ""}









            </div>


        </div>
    )
}

export default Requests
