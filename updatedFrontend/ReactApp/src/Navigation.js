import React, { useEffect, useState } from 'react'
import 'bulma/css/bulma.min.css';
import useLogin from "./useLogin"
import { Navigate } from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


const Navigation = ({ requestView, setRequestView }) => {
    const { login, removeLogin } = useLogin();

    return (

        <nav className="navbar is-primary is-size-5" role="navigation" aria-label="main navigation" >
            <div class="navbar-brand">
                <p class="navbar-item" href="/test">
                    <figure class="image is-50x50">
                        <img src="https://cdn-icons-png.flaticon.com/512/33/33777.png" />
                    </figure>
                </p>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <Link class="navbar-item" to="">
                        Home
                    </Link>
                    <Link class="navbar-item" to="animal">
                        Browse animals
                    </Link>
                    <div class="navbar-item has-dropdown is-hoverable">
                        {login.UserType != "student" ? (
                            <Link class="navbar-item" to="/requests" onClick={(e) => {
                                setRequestView("")
                            }}>
                                Requests
                                <FaCaretDown />
                            </Link>) : ""}

                        <div class="navbar-dropdown">
                            {login.UserType == "admin" || login.UserType == "animal technician" || login.UserType == "teacher" ? (

                                <Link class="navbar-item is-large" to="requests" onClick={(e) => {
                                    setRequestView('animalRequests')
                                }}>Animal requests</Link>) : ""}

                            {login.UserType == "animal technician" || login.UserType == "care attendant" ? (
                                <Link class="navbar-item" to="requests" onClick={(e) => {
                                    setRequestView("treatmentRequests")
                                }}>Treatment/diagnosis requests</Link>) : ""}
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <a class="navbar-item">

                        {login.UserType == "admin" ? (
                            <Link className="button is-link mr-3" to="/register">
                                Register a user
                            </Link>) : ""}
                        {login.UserType == "admin" ? (
                            <Link className="button is-warning mr-3" to="/manage">
                                Manage users
                            </Link>) : ""}
                        {login.UserType == "teacher" ? (
                            <Link className="button is-link mr-3" to="/manage">
                                Manage students
                            </Link>) : ""}

                        <button className="button is-danger"
                            onClick={(e) => {
                                removeLogin();
                                window.location.href = "/"
                            }}>
                            Logout
                        </button>
                    </a>
                </div>

            </div>








        </nav >


    )
}

export default Navigation
