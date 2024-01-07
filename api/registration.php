<?php
include 'database.php';



header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['userName'], $data['login'], $data['password'])) {
    echo json_encode(['error' => 'Недостаточно данных для регистрации']);
    exit;
}

header('Content-Type: application/json');
try {
    
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
    if ($e->getCode() == '23505') {
        echo json_encode(['error' => 'user_already_exists']);
    } else {
        echo json_encode(['error' => 'Ошибка при регистрации: ' . $e->getMessage()]);
    }
}