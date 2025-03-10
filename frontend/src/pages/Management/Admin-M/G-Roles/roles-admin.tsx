import React from "react";
import styles from "./roles-admin.module.css";
import { useNavigate } from "react-router-dom";
import Navbar_G from "../../../../components/NavBars/Navbar_Globla";
import { Button, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";

const Manage_roles: React.FC = () => {
    const navigate = useNavigate();

    // Datos de roles de ejemplo
    const roles = [
        { id: 1, name: "Administrador", permissions: "Todos los permisos" },
        { id: 2, name: "Doctor", permissions: "Gestionar pacientes" },
    ];

    return (
        <div className={styles.Manage_roles}>
            {/* Barra de navegación */}
            <Navbar_G
                profileText="Regresar"
                profilePath="/dashboard-Admin"
                profileImg="public/user.png"
                centerText="Gestión de Roles"
                menuItems={[{ label: "Configuraciones", path: "/" }]}
                onLogout={() => navigate("/")}
            />

            {/* Contenedor principal */}
            <div className={styles.container}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Button 
                        className={styles.button} 
                        onClick={() => alert("Crear nuevo rol")}
                    >
                        ➕ Crear Nuevo Rol
                    </Button>
                </aside>

                {/* Contenido principal */}
                <main className={styles.mainContent}>
                    <h1 className={styles.title}>Gestión de Roles</h1>

                    {/* Tabla de Roles */}
                    <Card shadow="sm" className={styles.tableCard}>
                        <CardBody>
                            <Table aria-label="Tabla de roles" removeWrapper shadow="none">
                                <TableHeader>
                                    <TableColumn width="10%">ID</TableColumn>
                                    <TableColumn width="30%">Rol</TableColumn>
                                    <TableColumn width="40%">Permisos</TableColumn>
                                    <TableColumn width="20%">Acciones</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{role.id}</TableCell>
                                            <TableCell>
                                                <Chip color="secondary" variant="bordered">
                                                    {role.name}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>{role.permissions}</TableCell>
                                            <TableCell>
                                                <div className={styles.actionButtons}>
                                                    <Tooltip content="Modificar Rol">
                                                        <Button 
                                                            size="sm" 
                                                            color="warning" 
                                                            variant="flat" 
                                                            onClick={() => alert("Modificar " + role.name)}
                                                        >
                                                            ✏️
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip content="Eliminar Rol">
                                                        <Button 
                                                            size="sm" 
                                                            color="danger" 
                                                            variant="flat" 
                                                            onClick={() => alert("Eliminar " + role.name)}
                                                        >
                                                            🗑️
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Manage_roles;
