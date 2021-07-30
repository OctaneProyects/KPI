import React, { useState, Fragment, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { MUITable } from "../components/MUITable";
import { Chart } from "../components/Chart";
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
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
const productsOptions = [
  { id: "Todos", text: "Todos", value: "Todos" },
  { id: "Premiun", text: "Premiun", value: "Premium" },
  { id: "Regular", text: "Regular", value: "Regular" },
  { id: "Diesel", text: "Diesel", value: "Diesel" },
];
const dateOptions = [
  { key: "Enero", text: "Enero", value: "Enero" },
  { key: "Febrero", text: "Febrero", value: "Febrero" },
  { key: "Marzo", text: "Marzo", value: "Marzo" },
  { key: "Abril", text: "Abril", value: "Abril" },
  { key: "Mayo", text: "Mayo", value: "Mayo" },
];

const Labels = [
  "ZONA BAJA SUR",
  "ZONA ENSENADA",
  "ZONA GUAYMAS",
  "ZONA HERMOSILLO",
  "ZONA JALISCO",
  "ZONA MEXICALI ",
  "ZONA NOGALES",
  "ZONA OBREGON",
  "ZONA SAN QUINTIN",
  "ZONA TIJUANA ",
];

// [
//   "EL FLORIDO",
//   "UNIVERSIDAD",
//   "TANAMA",
//   "MATAMOROS",
//   "CERRO DE LAS ABEJAS",
//   "BLVD 2000",
// ];
const datasets = [
  {
    label: "Semana1",
    data: [
      1655599.487, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296,
      1526542.632, 166819.867, 478737.555, 3302935.835,
    ],
    borderColor: "rgba(227,71,236,0.7)",
    backgroundColor: "rgba(227,71,236, 0.7)",
    fill: false,
  },
  {
    label: "Semana2",
    data: [
      1655599.487, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296,
      1526542.632, 166819.867, 478737.555, 3302935.835,
    ],
    borderColor: "rgba(135,34,139,0.7)",
    backgroundColor: "rgba(135,34,139, 0.7)",
    fill: false,
  },
  {
    label: "Semana3",
    data: [
      1655599.487, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296,
      1526542.632, 166819.867, 478737.555, 3302935.835,
    ],
    borderColor: "rgba(36,55,199,0.7)",
    backgroundColor: "rgba(36,55,199, 0.7)",
    fill: false,
  },
  {
    label: "Semana4",
    data: [
      1655599.487, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296,
      1526542.632, 166819.867, 478737.555, 3302935.835,
    ],
    borderColor: "rgba(12,135,148,0.7)",
    backgroundColor: "rgba(12,135,148, 0.7)",
    fill: false,
  },
  {
    label: "Semana5",
    data: [
      1655599.487, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296,
      1526542.632, 166819.867, 478737.555, 3302935.835,
    ],
    borderColor: "rgba(20,83,249,0.7)",
    backgroundColor: "rgba(20,83,249, 0.7)",
    fill: false,
  },
];
//  [
//   {
//     label: "Premium",
//     data: [617594, 181045, 153060, 106519, 105162, 95072],
//     backgroundColor: [
//       "rgba(255, 99, 132, 0.6)",
//       "rgba(255, 99, 132, 0.6)",
//       "rgba(255, 99, 132, 0.6)",
//       "rgba(255, 99, 132, 0.6)",
//       "rgba(255, 99, 132, 0.6)",
//       "rgba(255, 99, 132, 0.6)",
//     ],
//   },
//   {
//     label: "Regular",
//     data: [617594, 181045, 153060, 106519, 105162, 95072],
//     backgroundColor: [
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//       "rgba(0, 199, 132, 0.6)",
//     ],
//   },
//   {
//     label: "Diesel",
//     data: [716594, 185045, 356060, 508519, 409162, 196072],
//     backgroundColor: [
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//       "rgba(169, 169, 169, 0.6)",
//     ],
//   },
// ];

//DATA GRAFICA DINAMICA
const LabelsDyn = [];

const datasetsDyn = [];

//funcion que construye grafica de manera dinamica
function chartConstructor(datos) {
  // const datos = JSON.parse(datos);

  //var data
  var data = [];
  //var datasets

  var Props = Object.keys(datos[0]);

  //variables para color de las  lineas graficas
  var r;
  var g;
  var b;

  //CICLO QUE OBTIENE  labels
  for (var j = 1; j < datos.length; j++) {
    LabelsDyn.push(datos[j]["Zona"]);
  }

  //LLENANDO DATASETS PARA CADA ZONA
  for (var i = 0; i < Props.length; i++) {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);

    if (Props[i] != "Zona") {
      for (let j = 1; j < datos.length; j++) {
        data.push(datos[j][Props[i]]);
      }

      var x = {
        label: Props[i],
        data: data,
        borderColor: "rgba(" + r + "," + g + "," + b + ",0.7)",
        backgroundColor: "rgba(" + r + "," + g + "," + b + ", 0.7)",
        fill: false,
      };
      datasetsDyn.push(x);
      data = [];
    }
  }
}

export const Reports = () => {
  const [isloading, setloading] = useState(true);
  const [activeItem, setActiveItem] = useState("tijuana");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const [dataGraph, setDataGraph] = useState([]);
  const [data, setData] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [zonas, setZonas] = useState([]);

  //manejar valores de los selects
  const [sitiosSelect, setSitiosSel] = useState([]);
  const [zonasSelect, setZonasSel] = useState([]);

  //para el DateRangePicker
  const [state, setState] = useState([
    {
      isOpen: true,
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    // getGastos();
    getZonas();

    // getSitios();
    // consultaMov();
  }, []);

  //funcion para obtener arreglo con numeros de zonas para busqueda
  function handleDropDownZonas(datosZon) {
    let id_zon = 0;

    if (datosZon.target.tagName == "SPAN") {
      id_zon = datosZon.target.parentElement.id;
    } else {
      id_zon = datosZon.target.id;
    }
    zonasSelect.push(id_zon);
    console.log(zonasSelect);
  }

  //funcion para obtener arreglo con numeros de estaciones para busqueda
  function handleDropDownSitios(datosSit) {
    let id_est = "";
    if (datosSit.target.tagName == "SPAN") {
      id_est = datosSit.target.parentElement.id;
    } else {
      id_est = datosSit.target.id;
    }
    sitiosSelect.push(id_est);

    console.log(sitiosSelect);
  }

  function handleBusqueda(val) {
    setloading(true);
    consultaMov();
    console.log(zonasSelect);
    console.log(sitiosSelect);
  }

  const consultaMov = async () => {
    try {
      const { data } = await axios.get(
        "http://portal.grupoeco.com.mx/KPIApi/api/GetVentas",
        // "http://localhost:9000/api/GetVentas",
        {
          params: {
            Zonas: zonasSelect,
            Sitios: sitiosSelect,
            FechaI: "",
            FechaF: "",
            Opc: 1,
          },
        }
      );

      if (data) {
        setData(JSON.parse(data));
        setloading(false);
        // chartConstructor(data);
      } else {
        setData([]);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //funcion que consulta  la API para obtener el datos de gastos
  async function getGastos() {
    try {
      const dataGraph = await axios.get(
        "http://portal.grupoeco.com.mx/KPIApi/api/getingresos",
        // "http://localhost:9000/api/getingresos",
        {
          params: { Opc: 1, IdCia: 1 },
        }
      );

      setDataGraph(dataGraph.data);
      return dataGraph;
    } catch (error) {
      alert(error);
      return dataGraph;
    }
  }

  //funcion que consulta  la API para obtener zonas
  async function getZonas() {
    try {
      const zonas = await axios.post(
        "/GetGastos",
        // "http://localhost:9000/api/getzonas",

        {
        }
      );

      alert(JSON.parse(zonas.data.data));
      // console.log(JSON.parse(zonas.data));
      return zonas;
    } catch (error) {
      alert(error);
      return zonas;
    }
  }
  //funcion que consulta  la API para obtener sitios
  async function getSitios() {
    try {
      const sitios = await axios.get(
        "http://portal.grupoeco.com.mx/KPIApi/api/getsitios",
        // "http://localhost:9000/api/getzonas",

        {
          params: { Opc: 1 },
        }
      );

      setSitios(JSON.parse(sitios.data));
      // console.log(JSON.parse(sitios.data));
      return sitios;
    } catch (error) {
      alert(error);
      return sitios;
    }
  }

  return (
    <div>
      {/* FILTROS */}
      <Grid centered columns={4}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Container>
              <Header as="h3">Zona</Header>
              <Dropdown
                placeholder="Zona"
                fluid
                multiple
                selection
                options={zonas}
                // onChange={event => setZonasSel(event.target.value)}
                onChange={(datos) => handleDropDownZonas(datos)}
              />
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
            <Container>
              <Header as="h3">Estacion</Header>
              <Dropdown
                placeholder="Producto"
                fluid
                multiple
                selection
                options={sitios}
                onChange={(datosSit) => handleDropDownSitios(datosSit)}
              />
            </Container>
          </Grid.Column>

          <Grid.Column width={4}>
            <Container>
              {/* <Header as="h3">Fecha</Header> */}
              {/* <DateRangePicker /> */}
              {/* <Input placeholder='Fecha' /> */}
              {/* <Input placeholder='Fecha' /> */}
              {/* <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                showSelectionPreview  = {false}
                showMonthAndYearPickers = {false}
                showPreview={false}
              /> */}
              {/* <Dropdown
                placeholder="Fecha"
                fluid
                multiple
                selection
                options={dateOptions}
              /> */}
            </Container>
          </Grid.Column>
          <Grid.Column width={3}>
            <Container style={{ marginTop: 35 }}>
              <Button
                verticalAlign="bottom"
                primary
                onClick={() => handleBusqueda()}
              >
                Consultar
              </Button>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        {isloading ? (
          <Dimmer active inverted>
            <Loader inverted>Cargando</Loader>
          </Dimmer>
        ) : (
          <Grid centered>
            <Grid.Row className="ui internally celled grid">
              {/* GRAFICA ZONAS */}
              <Grid.Column width={10}>
                <Grid.Row className="ui centered" columns={2}>
                  <Header as="h1">Resumen</Header>

                  <Grid.Column>
                    <Menu color="blue" tabular>
                      <Menu.Item
                        name="tijuana"
                        active={activeItem === "tijuana"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        name="tecate"
                        active={activeItem === "tecate"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        name="rosarito"
                        active={activeItem === "rosarito"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        name="ensenada"
                        active={activeItem === "ensenada"}
                        onClick={handleItemClick}
                      />
                    </Menu>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Chart data={data} />

                    {/* <Bar
                     data={{
                       labels: Labels,
                       datasets: datasets,
                     }}
                   /> */}
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={10}>
                <Grid.Row className="ui centered" columns={2}>
                  <Header as="h1">Detalle</Header>

                  <Grid.Column width={5}>
                    {/* <Chart data={data} /> */}
                    {/* TABLA DE VENTAS */}
                    <GridColumn verticalAlign="top" width={10}>
                      <MUITable title={"Ventas"} data={data} />
                    </GridColumn>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
