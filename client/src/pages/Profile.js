import { Icon } from "@material-ui/core";
import React, { useState } from "react";
import { Input, Label, Card, Tab, Header } from 'semantic-ui-react'



const stilos = {
  TabPaneStyle: { borderColor: '#2185D0', padding: '3%' },
  tabOptions: { borderColor: '#2185D0 !important' }
}
export const Profile = () => {
  
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('user')));
  const panes = [
    {
      menuItem: { content: 'Perfil', icon: 'user' }, render: () => <Tab.Pane style={stilos.TabPaneStyle}>
        <Header as='h2'>Informacion</Header>

        <p style={{ fontWeight: 'bold' }}>
          Nombre: <label style={{ fontWeight: 'normal' }}>{usuario.NombreCompleto}</label>
        </p>
        <p style={{ fontWeight: 'bold' }}>
          Departamento: <label style={{ fontWeight: 'normal' }}>{usuario.Departamento}</label>
        </p>
        {/* <p style={{ fontWeight: 'bold' }}>
          Puesto: <label style={{ fontWeight: 'normal' }}>{usuario.Puesto}</label>
        </p> */}
        <p style={{ fontWeight: 'bold' }}>
          Correo: <label style={{ fontWeight: 'normal' }}>{usuario.Email}</label>
        </p>
        <p style={{ fontWeight: 'bold' }}>
          Telefono: <label style={{ fontWeight: 'normal' }}>{usuario.CelPersonal}</label>
        </p>

      </Tab.Pane>
    },
    { menuItem: { content: 'Configuraciones', icon: 'cogs' }, render: () => <Tab.Pane style={stilos.TabPaneStyle}><Header as='h2'>Proximamente</Header></Tab.Pane> },
  ]
  return (
    <div style={{ padding: '2% 10% 0 10%' }}>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} style={stilos.tabOptions} />
    </div>
  );
};


