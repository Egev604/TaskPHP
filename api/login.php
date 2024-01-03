<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['login'], $data['password'])) {
    echo json_encode(['error' => 'Недостаточно данных для входа']);
    exit;
}

$host = 'localhost'; 
$dbname = 'postgres';
$user = 'postgres';
$password = 'root';

try {
    $dbh = new PDO("pgsql:host=$host;dbname=$dbname;", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $dbh->prepare('SELECT * FROM users WHERE login = :login');
    $stmt->bindParam(':login', $data['login']);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => 'Пользователь не найден']);
        exit;
    }
    $hashedPassword = md5($user['salt'] . $data['password']);
    if ($hashedPassword===$user['password']) {
        echo json_encode(['success' => 'Аутентификация успешна']);
    } else {
        echo json_encode(['error' => 'Неверный пароль']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка при аутентификации: ' . $e->getMessage()]);
}