import React, { useState, Fragment, useEffect } from "react";
import { Bar, Line, Pie }  from 'react-chartjs-2'
import {
    Container,
    Grid,
    Menu,
    Header,
    GridColumn,
    Dropdown,
    Button,
  } from "semantic-ui-react";






  const datasetsDyn =[];
//   [
//   {label: "Semana1", data:   [510760.933, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296, 1526542.632, 166819.867, 478737.555, 3302935.835], borderColor: "rgba(227,71,236,0.7)", backgroundColor: "rgba(227,71,236, 0.7)", fill: false}
//   ,{label: "Semana2", data:  [510760.933, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296, 1526542.632, 166819.867, 478737.555, 3302935.835], borderColor: "rgba(135,34,139,0.7)", backgroundColor: "rgba(135,34,139, 0.7)", fill: false}
//   ,{label: "Semana3", data:  [510760.933, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296, 1526542.632, 166819.867, 478737.555, 3302935.835], borderColor: "rgba(36,55,199,0.7)", backgroundColor: "rgba(36,55,199, 0.7)", fill: false}
//   ,{label: "Semana4", data:  [510760.933, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296, 1526542.632, 166819.867, 478737.555, 3302935.835], borderColor: "rgba(12,135,148,0.7)", backgroundColor: "rgba(12,135,148, 0.7)", fill: false}
//   ,{label: "Semana5", data:  [510760.933, 1055898.066, 510760.933, 835341.594, 76629.573, 2208010.296, 1526542.632, 166819.867, 478737.555, 3302935.835], borderColor: "rgba(20,83,249,0.7)", backgroundColor: "rgba(20,83,249, 0.7)", fill: false}
//   ];

  const LabelsDyn = [];
    // ["ZONA BAJA SUR", "ZONA ENSENADA", "ZONA GUAYMAS", "ZONA HERMOSILLO", "ZONA JALISCO", "ZONA MEXICALI ", "ZONA NOGALES", "ZONA OBREGON", "ZONA SAN QUINTIN", "ZONA TIJUANA "]




  export const Chart  = ({ data }) => {

    if (data.length) {

      LabelsDyn.length=0;
      datasetsDyn.length=0;
 var dataAux = [];
  //var datasets

  var Props = Object.keys(data[0]);

  //variables para color de las  lineas graficas
  var r;
  var g;
  var b;


  //CICLO QUE OBTIENE  labels
  for (var j = 0; j < data.length; j++) {
     LabelsDyn.push(data[j]["Zona"]);
  }

  //LLENANDO DATASETS PARA CADA ZONA
  for (var i = 0; i < Props.length; i++) {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);

    if (Props[i] != "Zona") {
      for (let j = 0; j < data.length; j++) {
        dataAux.push(data[j][Props[i]]);
      }

      var x = {
        label: Props[i],
        data: dataAux,
        borderColor: "rgba(" + r + "," + g + "," + b + ",0.7)",
        backgroundColor: "rgba(" + r + "," + g + "," + b + ", 0.7)",
        fill: false,
      };
      datasetsDyn.push(x);
      dataAux = [];
    }
  }


        // columns = Object.keys(data[0]).map((key, index) => {
        //     return {
        //         name: key,
        //         label: replaceAll(key, '_', ' '),
        //     }
        // }
        // );
    };




    return (
      <>
        <Bar
          data={{
            labels: LabelsDyn,
            datasets: datasetsDyn,
            
          }}
        />
      </>
    );
}