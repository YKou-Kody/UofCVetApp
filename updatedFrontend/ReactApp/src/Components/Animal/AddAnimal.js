import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const AddAnimal = ({ addTrigger, setAddTrigger }) => {

    const postRequest = (e) => {
        if (!animalName) {
            alert("Please enter animal name")
            setRequestStatus(false)
            return;
        }
        if (!tattoo && tattoo !== 0) {
            alert("Please enter a tattoo number or leave it as 0")
            setRequestStatus(false)
            return;
        }
        e.preventDefault()
        const newAnimalOptions = {
            url: "http://localhost:8080/animal",
            method: "POST",
            data: {
                animalName: animalName, species: species,
                weight: weight, tattooNum: tattoo, city: city, birthDate: birthdate, breed: breed, sex: sex,
                rfid: rfid, microchip: microchip, animalStatus: animalStatus, draughtMeatDiary: draughtmeatdiary, features: features, color: color, image: image
            }
        }
        axios(newAnimalOptions)
            .then(json => {
                return json.data
            })
            .then(result => {
                if (result == 1) {
                    clearFields();
                    setRequestStatus(true)
                } else {
                    setRequestStatus(false)
                }
            })
            .catch(err => alert(err))
    }
    const [requestStatus, setRequestStatus] = useState()
    const [animalName, setAnimalName] = useState("");
    const [species, setSpecies] = useState("");
    const [weight, setWeight] = useState("");
    const [tattoo, setTattoo] = useState(0);
    const [city, setCity] = useState("");
    const [birthdate, setBirth] = useState();
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("U");
    const [rfid, setRfid] = useState("");
    const [microchip, setmicrochip] = useState("");
    const [animalStatus, setAnimalStatus] = useState("");
    const [draughtmeatdiary, setDraughtmeatdiary] = useState("");
    const [features, setFeatures] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("")

    const clearFields = () => {
        setAnimalName("");
        setSpecies("");
        setWeight("");
        setTattoo(0);
        setCity("");
        setBirth();
        setBreed("");
        setSex("U");
        setRfid("");
        setmicrochip("");
        setAnimalStatus("");
        setDraughtmeatdiary("");
        setFeatures("");
        setColor("");
        setImage("")
    }

    const trigger = () => {
        if (addTrigger == true) {
            return "modal is-active"
        } else {
            return "modal"
        }

    }


    return (
        <div class={trigger()}>
            <div class="modal-background" onClick={(e) => {
                setAddTrigger(false)
            }}></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add an animal</p>
                    <button class="delete" aria-label="close" onClick={(e) => {
                        setAddTrigger(false)
                        setRequestStatus("")
                        if (requestStatus == true) {
                            window.location.href = "/animal"
                        }
                    }}></button>
                </header>
                {!requestStatus ? (
                    <section class="modal-card-body is-left has-text-left">
                        <form id="test">
                            <div class="field">
                                <label class="label">Animal name:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter animal name" value={animalName} onChange={(e) => {
                                        setAnimalName(e.target.value)
                                    }}></input>
                                </div>
                                <p class="help">*Required</p>
                            </div>
                            <div class="field">
                                <label class="label">Species:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter animal species" value={species} onChange={(e) => {
                                        setSpecies(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Weight:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter animal weight" value={weight} onChange={(e) => {
                                        setWeight(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Animal tattoo number:</label>
                                <div class="control">
                                    <input class="input" type="number" placeholder="Enter animal tattoo number" value={tattoo} onChange={(e) => {
                                        setTattoo(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">City:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter city" value={city} onChange={(e) => {
                                        setCity(e.target.value)
                                    }}>
                                    </input>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Birthdate:</label>
                                <div class="control">
                                    <input class="input" type="date" placeholder="Select birthdate" value={birthdate} onChange={(e) => {
                                        setBirth(e.target.value)
                                    }}></input>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Breed:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter breed" value={breed} onChange={(e) => {
                                        setBreed(e.target.value)
                                    }}></input>
                                </div>
                            </div>


                            <div class="field">
                                <label class="label">Sex:</label>
                                <div class='control'>
                                    <label class="radio">
                                        <input type="radio" name="mf" onChange={(e) => {
                                            setSex('M')
                                        }} />
                                        M
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="mf" onChange={(e) => {
                                            setSex('M')
                                        }} />
                                        F
                                    </label>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">RFID:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter RFID" value={rfid} onChange={(e) => {
                                        setRfid(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Microchip:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter microchip" value={microchip} onChange={(e) => {
                                        setmicrochip(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Animal current status:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter animal current status" value={animalStatus} onChange={(e) => {
                                        setAnimalStatus(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Draught_Meat_Diary:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Draught_Meat_Diary" value={draughtmeatdiary} onChange={(e) => {
                                        setDraughtmeatdiary(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Distinguishing feautres:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter distinguishing features" value={features} onChange={(e) => {
                                        setFeatures(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Animal color:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Enter animal color" value={color} onChange={(e) => {
                                        setColor(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Profile picture:</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Provide a URL link of animal profile picture" value={image} onChange={(e) => {
                                        setImage(e.target.value)
                                    }}></input>
                                </div>
                            </div>
                        </form>

                    </section>) : ""}
                <footer class='modal-card-foot'>
                    {!requestStatus ? (
                        <section>
                            <button class="button is-danger is-outlined" onClick={(e) => {
                                e.preventDefault()
                                setRequestStatus("")
                            }}>Cancel</button>
                            <button class="button is-success" onClick={postRequest}>Submit</button></section>) : ""}

                    {requestStatus ? <p class="has-text-success" style={{ marginLeft: "200px" }}>Animal successfully added!</p> : ""}
                    {requestStatus === false ? <p class="has-text-danger" style={{ marginLeft: "200px" }}>Could not add animal</p> : ""}
                </footer>
            </div>
        </div>

    )
}

export default AddAnimal
