<?php
$host = 'localhost'; 
$dbname = 'postgres';
$user = 'postgres';
$password = 'root';
header('Content-Type: application/json');

try {

    $dbh = new PDO("pgsql:host=$host;dbname=$dbname;", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $requestUri = $_SERVER['REQUEST_URI'];
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    $path = parse_url($requestUri, PHP_URL_PATH);
    $pathSegments = explode('/', trim($path, '/'));

    $action = isset($pathSegments[1]) ? $pathSegments[1] : '';
    switch ($action) {
        case 'create':
            if ($requestMethod === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);

                $name = $data['name'];

                $stmt = $dbh->prepare('INSERT INTO products (name) VALUES (:name)');
                $stmt->bindParam(':name', $name);
                $stmt->execute();

                echo json_encode(['message' => 'Product created']);
            } else {
                echo json_encode(['error' => 'Invalid request method for create action']);
            }
            break;

        case 'get':
        default:
            if ($requestMethod === 'GET') {
                $stmt = $dbh->query('SELECT * FROM products');
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($products);
            } else {
                echo json_encode(['error' => 'Invalid request method for default action']);
            }
            break;
    }




} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $e->getMessage()]);
}