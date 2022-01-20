import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';

const EditAnimal = ({ editTrigger, setEditTrigger, selectedAnimal, setSelectedAnimal, animalListCall }) => {

    const [initial, setInitial] = useState(false)
    const [contentTrigger, setContentTrigger] = useState(false)
    const [animalName, setAnimalName] = useState("")
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
    const [requestStatus, setRequestStatus] = useState()

    const trigger = () => {
        if (editTrigger == true) {
            return "modal is-active"
        } else {
            return "modal"
        }

    }

    const putRequest = (e) => {
        if (!animalName) {
            setRequestStatus(false)
            alert("Please do not leave animal name empty")
            return;
        }
        e.preventDefault()
        const newAnimalOptions = {
            url: "http://localhost:8080/animal/" + selectedAnimal.AnimalID,
            method: "PUT",
            data: {
                animalName: animalName, species: species,
                weight: weight, tattooNum: tattoo, city: city, birthDate: birthdate, breed: breed, sex: sex,
                rfid: rfid, microchip: microchip, animalStatus: animalStatus, draughtMeatDiary: draughtmeatdiary, features: features, color: color,
                image: image
            }
        }
        axios(newAnimalOptions)
            .then(json => {
                return json.data
            })
            .then(result => {
                if (result == 1) {
                    setRequestStatus(true)
                } else {
                    setRequestStatus(false)
                }
            })
            .catch(err => alert(err))
    }
    const editAnimal = (e) => {
        e.preventDefault()
        setAnimalName(selectedAnimal.AnimalName)
        setSpecies(selectedAnimal.Species)
        setWeight(selectedAnimal.Weight)
        setTattoo(selectedAnimal.TattooNum)
        setCity(selectedAnimal.City)
        setBirth(selectedAnimal.BirthDate)
        setBreed(selectedAnimal.Breed)
        setSex(selectedAnimal.Sex)
        setRfid(selectedAnimal.RFID)
        setmicrochip(selectedAnimal.Microchip)
        setAnimalStatus(selectedAnimal.AnimalStatus)
        setDraughtmeatdiary(selectedAnimal.Draught_Meat_diary)
        setFeatures(selectedAnimal.DistinguishingFeatures)
        setColor(selectedAnimal.Color)
        setImage(selectedAnimal.Image)
        setInitial(true)



    }
    const checkMale = () => {
        if (sex == 'M') {
            return true;
        } else return false;
    }
    const checkFemale = () => {
        if (sex == 'F') {
            return true;
        } else return false;
    }




    return (
        <div class={trigger()}>
            <div class="modal-background" onClick={() => setEditTrigger(false)}></div>
            <div class="modal-content">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit Animal: {selectedAnimal?.AnimalName} {"\t#"}{selectedAnimal?.AnimalID}</p>
                        <button class="delete" aria-label="close" onClick={(e) => {
                            e.preventDefault();
                            setEditTrigger(false);
                            setInitial(false)
                            setRequestStatus("")
                            if (requestStatus == true) {

                                window.location.href = "/animal"
                            }
                        }}></button>
                    </header>
                    {/* This section is for the edit confirmation */}
                    {!initial && requestStatus != true ?
                        <section class="modal-card-body is-left">
                            <h1 class="title is-4">Are you sure you want to edit {selectedAnimal.AnimalName}?</h1>

                            <button class="button is-warning" onClick={(e) => {
                                editAnimal(e)
                                setRequestStatus("")
                            }}>proceed</button>
                        </section>
                        : ""}



                    {/* This is the card body that shows up after proceeding */}
                    {(initial && requestStatus != true) ?
                        <section class="modal-card-body has-text-left">
                            <form id="test">
                                <div class="field">
                                    <label class="label">Animal ID:</label>
                                    <div class="control">
                                        <p class="title is-5">{selectedAnimal.AnimalID}</p>
                                    </div>
                                    <p class="help has-text-danger">*Cannot be edited</p>
                                </div>
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
                                            }} checked={checkMale()} />
                                            M
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="mf" onChange={(e) => {
                                                setSex('F')
                                            }} checked={checkFemale()} />
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
                                    <label class="label">Animal profile picture:</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Enter animal Image" value={image} onChange={(e) => {
                                            setImage(e.target.value)
                                        }}></input>
                                    </div>
                                </div>

                            </form>
                        </section>
                        : ""}


                    {initial ? (<footer class="modal-card-foot">
                        {requestStatus != true ? (<section>
                            <button class='button is-danger' onClick={(e) => {
                                e.preventDefault()
                                setEditTrigger(false)
                                setInitial(false)
                            }}>Cancel</button>
                            <button class="button is-success" onClick={(e) => putRequest(e)}>Save changes</button>
                        </section>) : ""}
                        {requestStatus ? <p class="has-text-success" style={{ marginLeft: "150px" }}>Animal successfully updated!</p> : ""}
                        {requestStatus === false ? <p class="has-text-danger" style={{ marginLeft: "200px" }}>Could not update animal</p> : ""}
                    </footer>) : ""}


                </div>


            </div>
        </div>

    )
}

export default EditAnimal
