import React from 'react'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
const SearchAnimal = ({ searchTrigger, setSearchTrigger, setSelectedAnimal, setSelectedAnimalID, animalList }) => {
    // const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList] = useState([])

    const filter = (e) => {

        const searchValue = e.target.value


        const filtered = animalList.filter((value) => {
            return (value.AnimalName.toLowerCase().includes(searchValue.toLowerCase())) || (value.AnimalID.toString().includes(searchValue.toLowerCase()))
        })
        if (searchValue === "") {
            setFilteredList([])
        } else {
            setFilteredList(filtered)
        }


    }

    const chooseAnimal = (e) => {
        e.preventDefault()
        if (e.target.value >= 0) {
            for (let i = 0; i < animalList.length; i++) {
                if (animalList[i].AnimalID == e.target.value) {
                    setSelectedAnimal(animalList[i])
                    setSelectedAnimalID(e.target.value)
                    setSearchTrigger(false)
                    return;
                }
            }
        }
    }


    return (
        <div>
            {searchTrigger === true ? (
                <div class="modal is-active">
                    <div class="modal-background" onClick={(e) => {
                        setSearchTrigger(false)
                    }}></div>
                    <div class="modal-content" style={{ borderRadius: "2em" }}>

                        <section class="modal-card-body " >
                            <section class="modal-card-body has-text-centered pb-0">
                                <h1 class="title is-4">Search animal by name or ID:</h1>
                                <div class="field">
                                    <div class="control has-icons-right">
                                        <input class="input is-rounded is-large has-background-link-light"
                                            onChange={filter} />
                                        <span class="icon is-large is-right has-text-link">
                                            <FaSearch />
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <section class="modal-card-body pt-0" >
                            <section class="modal-card-body has-text-left" style={{ height: "500px", overflow: "auto" }}>

                                {filteredList.map((animal) => {
                                    return (
                                        <button class="button is-fullwidth is-size-4 has-text-weight-medium" style={{ height: "100px", position: "relative", top: "-20px", justifyContent: "left" }}
                                            value={animal.AnimalID} onClick={chooseAnimal}>
                                            <figure class="image is-96x96" style={{ position: "relative", top: "15px", marginRight: "100px" }} > {/*, left: "-50px" */}
                                                < img class="is-rounded" src={animal.Image} />
                                            </figure>
                                            {animal.AnimalName} {"\t#"} {animal.AnimalID}
                                        </button>)
                                })}
                            </section>
                        </section>







                    </div>
                </div>
            ) : ""
            }

        </div >
    )
}

export default SearchAnimal
