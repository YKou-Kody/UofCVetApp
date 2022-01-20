import React from 'react'
import useLogin from "../../useLogin"


const HomeScreen = () => {
    const { login, setLogin } = useLogin();
    return (
        <div>
            <section class="hero is-light is-fullheight-with-navbar">
                <div class="hero-body">
                    <section class="section">
                        <p class="title is-1">
                            Welcome to the vet app!
                        </p>
                        <p class="title is-2">
                            Logged in as: {" "}{login?.Name}
                        </p>
                        <p class="title is-3">{login?.UserType == "student" ? "Student" : ""}
                            {login?.UserType == "teacher" ? "Teaching technician" : ""}
                            {login?.UserType == "admin" ? "Admin" : ""}
                            {login?.UserType == "animal technician" ? "Animal health technician" : ""}
                            {login?.UserType == "care attendant" ? "Animal care attendant" : ""}</p>
                        <p class>{Date()} </p>
                    </section>
                    <section>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/UofCCoat.svg/1200px-UofCCoat.svg.png" width="300" style={{ position: "relative", left: "800px" }} />
                    </section>

                </div>

            </section>
        </div>
    )
}

export default HomeScreen
