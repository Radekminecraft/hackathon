import Header from "@/components/header";
import React from "react";
export default function Login() {
    return (
        <>
        <Header></Header>
        <div id="logform-div">
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