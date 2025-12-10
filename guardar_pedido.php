<?php
// conectar a la BD
$conexion = new mysqli("localhost", "root", "", "live4style");

// verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// recibir datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$departamento = $_POST['departamento'];
$ciudad = $_POST['ciudad'];
$direccion = $_POST['direccion'];

// insertar datos
$sql = "INSERT INTO pedidos (nombre, apellido, telefono, departamento, ciudad, direccion)
        VALUES ('$nombre', '$apellido', '$telefono', '$departamento', '$ciudad', '$direccion')";

if ($conexion->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error: " . $conexion->error;
}

$conexion->close();
?>
