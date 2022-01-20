import React from 'react'
import 'bulma/css/bulma.min.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa"
import { useState, useEffect } from "react"
import axios from 'axios';
import PropTypes from 'prop-types'



const Login = ({ setLogin }) => {
    useEffect(() => {
        document.title = "ENSF607 Vet Application"
    }, [])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [test, setTest] = useState()
    const [suspension, setSuspension] = useState("")


    const loginUser = (e) => {
        if (!username || !password) {
            alert("Please enter an account and password")
            return
        }
        const loginOptions = {
            url: "http://localhost:8080/login",
            method: "POST",
            data: {
                username: username,
                password: password
            }

        }
        axios(loginOptions)
            .then(json => {
                if (!json) {
                    throw "Error logging in, please try again"
                } if (json.data.length < 1) {
                    throw "No matching account and password combiantion found, please try again: "
                } if (json.data.at(0).Banned != 1) {
                    setLogin(json.data.at(0))
                    setTest(json.data.at(0))
                } else {
                    setSuspension(true)
                }
            }).catch(err => alert(err))
    }


    return (

        < div class="columns is-centered" >
            <div class="field is-centered" style={{ marginTop: "20em", border: "lightgrey solid 2px", borderRadius: "2em", padding: "30px" }}>
                <h1 class="title is-3 has-text-centered">Log in to proceed</h1>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="field-label is-normal"
                            style={{ fontWeight: "700" }} >Username: </label>
                    </div>
                    <div className="control has-icons-left">
                        <input class="input" type="text" placeholder="Enter your password"
                            value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                        <span class="icon is-left">
                            <FaUser />
                        </span>
                    </div>
                </div>
                <div class="field is-horizontal ">
                    <div class="field-label is-normal">
                        <label class="field-label" style={{ fontWeight: "700" }} >Password: </label>
                    </div>
                    <div className="control has-icons-left">
                        <input class="input" type="password" placeholder="Enter your password"
                            value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        <span class="icon is-left">
                            <FaLock />
                        </span>
                    </div>

                </div>

                <div class="field has-text-centered" >
                    <p class="control">
                        <button class="button is-success"
                            onClick={loginUser}>Login</button>
                    </p>

                </div>
                {suspension ? (<p class="has-text-centered has-text-danger">You've been suspended, contact administration</p>) : ""}

            </div>



        </div >

    )
}

Login.prototypes = {
    setLogin: PropTypes.func.isRequired
}
export default Login

