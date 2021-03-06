import React, { useEffect } from "react"
import { Navbar } from "./components/Navbar/Navbar"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";

export const App = () => {

    useEffect(() => {
        setSession();
    }, []);

    async function setSession() {

        let params = (new URL(document.location)).searchParams;
        let uId = params.get("uId");

        try {

            const user = await axios.get(`/setSession/${uId}`, {});
           
            localStorage.setItem('user', JSON.stringify(user.data) );
        } catch (error) {
            alert(error);
        }

    }

    /* Redux */
    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch()
    /* Redux */
    return (
        <div>
            <Navbar></Navbar>
        </div>
    )
}
