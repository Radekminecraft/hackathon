import Header from "@/components/header";
import React from "react";
export default function Login() {
    var user = document.getElementById("username");
    var pass = document.getElementById("password");
    const url = "localhost:8000/logcheck";
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user": user , "pass": pass})
    })

    return (
        <>
        <Header></Header>
        <div id="logform-div" action="Login()">
            <form id="logform-form">
                <label for="username">Username</label><br></br>
                <input type="text" id="username" name="username"></input><br></br>

                <label for="password">Password</label><br></br>
                <input type="password" id="password" name="password"></input><br></br>
                <div class="spacer-20"></div>
                <input id="logform-submit" type="submit" value="Submit"></input>
            </form>
        </div>
        
        </>
    );
}