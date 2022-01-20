import 'bulma/css/bulma.min.css';

import React from 'react'
import { FaApple } from "react-icons/fa";
import { FaEdit, FaCamera } from "react-icons/fa";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaDog, FaTrash } from 'react-icons/fa'
import axios from 'axios';
import AddAnimal from "./AddAnimal"
import EditAnimal from "./EditAnimal"
import DeleteAnimal from './DeleteAnimal';
import Panel from "./Panel.js"
import { FaBook, FaCommentAlt, FaBell } from 'react-icons/fa'
import UserInput from './UserInput';
import SearchAnimal from './SearchAnimal';





const BrowseAnimal = ({ useLogin }) => {
    const { login, setLogin } = useLogin()

    const [searchTrigger, setSearchTrigger] = useState(false);
    const [addTrigger, setAddTrigger] = useState(false);
    const [editTrigger, setEditTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [animalList, setAnimalList] = useState([]);
    const [firstCall, setFirstCall] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState([]);
    const [selectedAnimalID, setSelectedAnimalID] = useState(0);
    const [inputView, setInputView] = useState("");

    const chooseAnimal = (e) => {
        e.preventDefault()
        // if (e.target.value - 1 >= 0) {
        //     setSelectedAnimal(animalList[e.target.value - 1])
        // }
        if (e.target.value >= 0) {
            for (let i = 0; i < animalList.length; i++) {
                if (animalList[i].AnimalID == e.target.value) {
                    setSelectedAnimal(animalList[i])
                    setSelectedAnimalID(e.target.value)
                }
            }
        }
    }

    async function animalListCall() {
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

    useEffect(() => {
        {
            if (firstCall === false) {
                animalListCall()
                setFirstCall(true)
            }
            const interval = setInterval(() => {
                animalListCall()
            }, 2000);
            return () => clearInterval(interval)
        }
    })


    return (

        <div class="columns is-multiline is-half" style={{ backgroundColor: "rgb(248, 248, 248", height: "130%" }} >

            <UserInput inputView={inputView} setInputView={setInputView} selectedAnimal={selectedAnimal} selectedAnimalID={selectedAnimalID} />
            <SearchAnimal searchTrigger={searchTrigger} setSearchTrigger={setSearchTrigger} setSelectedAnimal={setSelectedAnimal} setSelectedAnimalID={setSelectedAnimalID} animalList={animalList} />
            <AddAnimal addTrigger={addTrigger} setAddTrigger={setAddTrigger} />
            <EditAnimal editTrigger={editTrigger} setEditTrigger={setEditTrigger} selectedAnimal={selectedAnimal} animalListCall={animalListCall} />
            <DeleteAnimal deleteTrigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger} selectedAnimal={selectedAnimal} />
            <div class="column is-half is-vcentered" style={{ paddingTop: "50px", paddingLeft: "50px" }}>

                <div class="control has-icons-left">
                    <div class="select is-outlined-link is-center is-medium has-icons-left">
                        <select class="select is-info" onChange={chooseAnimal}>
                            <option selected value={0}>Select an animal:</option>
                            {animalList?.map((animal) => {
                                return (
                                    <option value={animal.AnimalID}>
                                        {animal.AnimalName}{"\t#" + animal.AnimalID}</option>
                                )
                            })}
                        </select>
                        <span class="icon is-left">
                            <FaDog />
                        </span>
                    </div>


                </div>

                <div style={{ paddingTop: "25px" }}>
                    {selectedAnimal == "" ? <p class="title is-3">Select an animal to begin</p> : ""}
                    <figure class="image is-3by2" >
                        <img src={selectedAnimal.Image}
                            class="image is-rounded" >
                        </img>

                    </figure>
                </div>
                {selectedAnimal != "" ? (
                    <div class="columns is-centered" style={{ marginTop: "60px" }}>
                        <div class="box" style={{ position: "relative", left: "20px" }}>
                            <div class="field has-addons">
                                <p class="control">
                                    <button class="button is-info" onClick={(e) => {
                                        e.preventDefault()
                                        setInputView("comment")
                                    }}>
                                        <span class="icon">

                                            <FaCommentAlt />
                                        </span>
                                        <span>Write Comment</span>
                                    </button>
                                </p>
                                {login.UserType == "care attendant" || login.UserType == "admin" ? (
                                    <p class="control">
                                        <button class="button is-warning" onClick={(e) => {
                                            e.preventDefault()
                                            setInputView("exam")
                                        }}>
                                            <span class="icon">
                                                <FaBook />

                                            </span>
                                            <span>Record examination results</span>
                                        </button>
                                    </p>) : ""}
                                {login.UserType == "care attendant" || login.UserType == "animal technician" || login.UserType == "admin" ? (
                                    <p class="control">
                                        <button class="button is-primary" onClick={(e) => {
                                            e.preventDefault()
                                            setInputView("status")
                                        }}>
                                            <span class="icon">
                                                <FaSpinner />

                                            </span>
                                            <span>Update Status</span>
                                        </button>
                                    </p>) : ""}
                                {login.UserType == "care attendant" || login.UserType == "admin" ? (
                                    <p class="control">
                                        <button class="button is-danger" onClick={(e) => {
                                            e.preventDefault()
                                            setInputView("alert")
                                        }}>
                                            <span class="icon">
                                                <FaBell />

                                            </span>
                                            <span>Add alert</span>
                                        </button>
                                    </p>) : ""}
                                {login.UserType == "care attendant" || login.UserType == "admin" ? (
                                    <p class="control">
                                        <button class="button is-black" onClick={(e) => {
                                            e.preventDefault()
                                            setInputView("image")
                                        }}>
                                            <span class="icon">
                                                <FaCamera />

                                            </span>
                                            <span>Add image</span>
                                        </button>
                                    </p>) : ""}

                            </div>
                        </div>




                    </div>) : ""
                }
            </div >

            <div class="column is-half" style={{ fontSize: "20px", paddingTop: "30px" }}>

                <div class="column">
                    <nav class="level-center">
                        <div class="level-item">
                            <p class="title is-3"> Animal Attributes</p>
                            <div class="dropdown is-hoverable is-right" style={{ marginLeft: "50px" }}>
                                <div class="dropdown-trigger">
                                    <button class="button" aria-haspopup='true' aria-controls="dropdown-menu4">
                                        <span></span>
                                        <span class="icon is-small">
                                            <FaCaretDown />
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <div class="dropdown-item">
                                            <button class="button is-info" style={{ paddingLeft: "33px", paddingRight: "33px" }} onClick={(e) => {
                                                e.preventDefault()
                                                setSearchTrigger(true)
                                            }
                                            }>
                                                <span class="icon is-small">
                                                    <FaSearch />
                                                </span>
                                                <span>
                                                    Search
                                                </span>
                                            </button>


                                        </div>
                                        {(login?.UserType == "admin" || login?.UserType == "animal technician" || login?.UserType == "care attendant")
                                            ? (<div class="dropdown-item">
                                                <button class="button is-warning" onClick={(e) => {
                                                    if (selectedAnimal != "") {
                                                        e.preventDefault()
                                                        setEditTrigger(true)
                                                    } else {
                                                        alert("Select an animal first before editing!")
                                                    }
                                                }}>
                                                    <span class="icon is-small">
                                                        <FaEdit />
                                                    </span>
                                                    <span>
                                                        Edit animal
                                                    </span>
                                                </button>

                                            </div>) : ""}
                                        {login.UserType == "admin" ? (
                                            <div class="dropdown-item">
                                                <button class="button is-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setAddTrigger(true)
                                                    }}>
                                                    <span class="icon is-small">
                                                        <FaPlus />
                                                    </span>
                                                    <span>
                                                        Add animal
                                                    </span>
                                                </button>


                                            </div>) : ""}
                                        {login.UserType == "admin" ? (
                                            <div class="dropdown-item">
                                                <button class="button is-danger"
                                                    onClick={(e) => {
                                                        if (selectedAnimal != "") {
                                                            e.preventDefault()
                                                            setDeleteTrigger(true)
                                                        }
                                                    }}>
                                                    <span class="icon is-small">
                                                        <FaTrash />
                                                    </span>
                                                    <span>
                                                        Remove animal
                                                    </span>
                                                </button>


                                            </div>) : ""}


                                    </div>

                                </div>
                            </div>
                        </div>
                    </nav>

                    <table class="table is-bordered" style={{ margin: "auto" }}>
                        <tbody>
                            {Object.entries(selectedAnimal).map(([key, value]) => {
                                if (key != "Image") {
                                    return (
                                        <tr>
                                            <th>
                                                {key}
                                            </th>
                                            <td style={{ width: "50%" }}>{value}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>

                    </table>

                </div>
            </div >
            {
                selectedAnimal != "" ? (
                    <div class="column is-full" style={{ position: "relative", top: "-200px" }}>
                        <Panel
                            selectedAnimal={selectedAnimal} selectedAnimalID={selectedAnimalID} />
                    </div>) : ""
            }




        </div >
    )
}

export default BrowseAnimal
