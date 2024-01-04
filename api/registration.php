<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['userName'], $data['login'], $data['password'])) {
    echo json_encode(['error' => 'Недостаточно данных для регистрации']);
    exit;
}
$host = 'localhost'; 
$dbname = 'postgres';
$user = 'postgres';
$password = 'root';
header('Content-Type: application/json');
try {
    $dbh = new PDO("pgsql:host=$host;dbname=$dbname;", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $salt = bin2hex(random_bytes(22));
    $hashedPassword = md5($salt . $data['password']);
    $stmt = $dbh->prepare('INSERT INTO users (name, login, password, salt) VALUES (:userName, :login, :password, :salt)');
    $stmt->bindParam(':userName', $data['userName']);
    $stmt->bindParam(':login', $data['login']);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':salt', $salt);
    $stmt->execute();
    

    echo json_encode(['success' => 'Регистрация успешна']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка при регистрации: ' . $e->getMessage()]);
}