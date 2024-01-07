<?php
include 'database.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
try {
    
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