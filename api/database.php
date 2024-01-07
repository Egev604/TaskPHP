<?php
$host = 'localhost';
$dbname = 'postgres';
$user = 'postgres';
$password = 'root';

try {
    $dbh = new PDO("pgsql:host=$host;dbname=$dbname;", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных']);
}
?>