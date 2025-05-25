import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';

import styles from './Data_Table.module.css'; // Reutilizamos tus estilos CSS

type Paciente = {
  cedula: string;
  nombre: string;
  ciudad: string;
  centroMedico: string;
  estado: 'activo' | 'inactivo';
  diagnostico: string;
};

const Table: React.FC = () => {
  

  const datosInicialesPacientes: Paciente[] = [
    { cedula: '1234567890', nombre: 'Ana López', ciudad: 'Bogotá', centroMedico: 'Clínica del Country', estado: 'activo', diagnostico: 'Gripe' },
    { cedula: '9876543210', nombre: 'Pedro Gómez', ciudad: 'Medellín', centroMedico: 'Hospital General', estado: 'activo', diagnostico: 'Fractura de tibia' },
    { cedula: '1122334455', nombre: 'Sofía Vargas', ciudad: 'Cali', centroMedico: 'Centro Médico Imbanaco', estado: 'inactivo', diagnostico: 'Asma' },
    { cedula: '5544332211', nombre: 'Mateo Díaz', ciudad: 'Barranquilla', centroMedico: 'Clínica Portoazul', estado: 'activo', diagnostico: 'Hipertensión' },
  ];

  const [pacientes] = useState<Paciente[]>(datosInicialesPacientes);
  const [filtroCedula, setFiltroCedula] = useState('');
  const [filtroCentroMedico, setFiltroCentroMedico] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const filtrarPacientes = (): Paciente[] => {
    return pacientes.filter((paciente) => {
      const coincideCedula = paciente.cedula.includes(filtroCedula);
      const coincideCentroMedico = filtroCentroMedico === '' || paciente.centroMedico === filtroCentroMedico;
      const coincideEstado = filtroEstado === '' || paciente.estado === filtroEstado;
      return coincideCedula && coincideCentroMedico && coincideEstado;
    });
  };

  const handleEdit = (row: Paciente) => {
    console.log('Editando paciente:', row);
    // Aquí podrías navegar a la página de edición con el ID del paciente
  };

  const handleDelete = (row: Paciente) => {
    console.log('Eliminando paciente:', row);
    // Aquí podrías implementar la lógica para eliminar al paciente
  };

  const columns: TableColumn<Paciente>[] = [
    {
      name: 'Cédula',
      selector: (row: Paciente) => row.cedula,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row: Paciente) => row.nombre,
      sortable: true,
    },
    {
      name: 'Ciudad',
      selector: (row: Paciente) => row.ciudad,
      sortable: true,
    },
    {
      name: 'Centro Médico',
      selector: (row: Paciente) => row.centroMedico,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row: Paciente) => row.estado,
      sortable: true,
    },
    {
      name: 'Diagnóstico',
      selector: (row: Paciente) => row.diagnostico,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleEdit(row)}
            className={styles.button}
            title="Editar"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className={styles.button}
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        color: 'rgba(128, 0, 0, 0.9)',
        fontSize: '15px',
        backgroundColor: '#f1f1f1',
      },
    },
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Lista de Pacientes</h2>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Filtrar por Cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filtroCentroMedico}
          onChange={(e) => setFiltroCentroMedico(e.target.value)}
          className={styles.searchInput}
        >
          <option value="">Todos los centros médicos</option>
          {[...new Set(pacientes.map((p) => p.centroMedico))].map((centro) => (
            <option key={centro} value={centro}>{centro}</option>
          ))}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className={styles.searchInput}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtrarPacientes()}
        fixedHeader
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;