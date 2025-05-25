import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Data_Table.module.css'; // Reutilizamos tus estilos CSS

type Usuario = {
  id: string;
  nombre: string;
  rol: 'admin' | 'doctor';
  estado: 'activo' | 'inactivo';
};

const Table: React.FC = () => {
  const navigate = useNavigate();

  const datosInicialesUsuarios: Usuario[] = [
    { id: 'user001', nombre: 'Admin General', rol: 'admin', estado: 'activo' },
    { id: 'doc002', nombre: 'Dra. Ana Pérez', rol: 'doctor', estado: 'activo' },
    { id: 'doc003', nombre: 'Dr. Carlos López', rol: 'doctor', estado: 'inactivo' },
    { id: 'user004', nombre: 'Admin Ventas', rol: 'admin', estado: 'activo' },
  ];

  const [usuarios] = useState<Usuario[]>(datosInicialesUsuarios);
  const [filtroID, setFiltroID] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const filtrarUsuarios = (): Usuario[] => {
    return usuarios.filter((usuario) => {
      const coincideID = usuario.id.toLowerCase().includes(filtroID.toLowerCase());
      const coincideNombre = usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase()); // Filtro por nombre
      const coincideRol = filtroRol === '' || usuario.rol === filtroRol;
      const coincideEstado = filtroEstado === '' || usuario.estado === filtroEstado;
      return coincideID && coincideNombre && coincideRol && coincideEstado;
    });
  };

  const [filtroNombre, setFiltroNombre] = useState(''); // Estado para filtrar por nombre

  const handleRegistrarUsuario = () => {
    navigate('/registrar-usuario'); // Define tu ruta para registrar usuarios
  };

  const handleVerPacientes = () => {
    navigate('/patient_list_admin'); // Asume que esta es la ruta de tu tabla de pacientes
  };

  const handleEdit = (row: Usuario) => {
    console.log('Editando usuario:', row);
    // Aquí podrías navegar a la página de edición del usuario
  };

  const handleDelete = (row: Usuario) => {
    console.log('Eliminando usuario:', row);
    // Aquí podrías implementar la lógica para eliminar el usuario
  };

  const columns: TableColumn<Usuario>[] = [
    {
      name: 'ID',
      selector: (row: Usuario) => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row: Usuario) => row.nombre,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: (row: Usuario) => row.rol,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: (row: Usuario) => row.estado,
      sortable: true,
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
      <h2 className={styles.title}>Lista de Usuarios</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          className={styles.registerButton}
          onClick={handleRegistrarUsuario}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <FaUserPlus /> Registrar Usuario
        </button>
        <button
          className={styles.viewPacientesButton} // Nueva clase para el botón de ver pacientes
          onClick={handleVerPacientes}
        >
          <FaUsers style={{ marginRight: '8px' }} /> Ver Pacientes
        </button>
      </div>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Filtrar por ID"
          value={filtroID}
          onChange={(e) => setFiltroID(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Filtrar por Nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
          className={styles.searchInput}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
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
        data={filtrarUsuarios()}
        fixedHeader
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;