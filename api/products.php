<?php
$host = 'localhost'; 
$dbname = 'postgres';
$user = 'postgres';
$password = 'root';
header('Content-Type: application/json');
try {
    $dbh = new PDO("pgsql:host=$host;dbname=$dbname;", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $search = isset($_GET['search']) ? $_GET['search'] : '';

    if (!empty($search)) {
        $stmt = $dbh->prepare('SELECT * FROM products WHERE name ILIKE :search');
        $searchTerm = '%' . $search . '%';
        $stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
    } else {
        $stmt = $dbh->query('SELECT * FROM products');
    }

    $stmt->execute();
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных']);
}