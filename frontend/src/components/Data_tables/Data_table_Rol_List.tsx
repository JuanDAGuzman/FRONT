import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Data_Table.module.css'; // Importa los estilos CSS

type Usuario = {
  id: string;
  nombre: string;
  rol: string;
  estado: string;
};

const RoleTable: React.FC = () => {
  const navigate = useNavigate();

  const datosIniciales: Usuario[] = [
    { id: '1001', nombre: 'Juan Pérez', rol: 'admin', estado: 'activo' },
    { id: '1002', nombre: 'Laura Gómez', rol: 'doctor', estado: 'activo' },
    { id: '1003', nombre: 'Carlos Ruiz', rol: 'doctor', estado: 'inactivo' },
  ];

  const [usuarios] = useState<Usuario[]>(datosIniciales);
  const [filtroID, setFiltroID] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const filtrarUsuarios = (): Usuario[] => {
    return usuarios.filter((usuario) => {
      const coincideID = usuario.id.includes(filtroID);
      const coincideRol = filtroRol === '' || usuario.rol === filtroRol;
      const coincideEstado = filtroEstado === '' || usuario.estado === filtroEstado;
      return coincideID && coincideRol && coincideEstado;
    });
  };

  const handleEdit = (row: Usuario) => {
    console.log('Editando usuario:', row);
  };

  const handleDelete = (row: Usuario) => {
    console.log('Eliminando usuario:', row);
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
    },
    {
      name: 'Rol',
      selector: (row: Usuario) => row.rol,
    },
    {
      name: 'Estado',
      selector: (row: Usuario) => row.estado,
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
      <h2 className={styles.title}>Lista de Roles</h2>

      <button
        className={styles.registerButton}
        onClick={() => navigate('/')}
      >
        Registrar Rol
      </button>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Filtrar por ID"
          value={filtroID}
          onChange={(e) => setFiltroID(e.target.value)}
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

export default RoleTable;
