import React, { useState, Fragment, useEffect } from "react";
import { MUITable } from "../components/MUITable";
import {
    Container,
    Dimmer,
    Grid,
    Menu,
    Header,
    Input,
    Loader,
    GridColumn,
    Dropdown,
    Button,
    Segment,
} from "semantic-ui-react";
import axios from "axios";
import { func } from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

export const Gastos = () => {
    const [isloading, setloading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {
        getGastos();

    }, []);




    const getGastos = async () => {
        try {
            const { data } = await axios.post(
                "/GetGastos",
                {
                });
            if (data) {
                setData(JSON.parse(data.data));
                setloading(false);
            } else {
                setData([]);
                setloading(false);
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div>
            {/* FILTROS */}
            <Grid>
                {isloading ? (
                    <Dimmer active inverted>
                        <Loader inverted>Cargando</Loader>
                    </Dimmer>
                ) : (
                    
                                <Grid.Row className="ui centered" width={1}>
                                    
                                    
                                    
                                    <Grid.Column width={16}>
                                    <Header className="ui centered" as="h1">Gastos</Header>
                                    </Grid.Column>
                                    


                                    <Grid.Row className="ui centered" width={20}>
                                    <Grid.Column width={20}>
                                        <MUITable title={""} data={data} />
                                    </Grid.Column>
                                    </Grid.Row>
                                </Grid.Row>
                    
                )}
            </Grid>
        </div>
    );
};