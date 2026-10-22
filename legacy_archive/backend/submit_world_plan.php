<?php
header('Content-Type: application/json');
date_default_timezone_set('Asia/Manila');

$host = 'localhost'; 
$dbname = 'u803120420_infinite_db'; 
$username = 'u803120420_infinite123';      
$password = 'Infinite#1230';          


$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    exit;
}

// 0. Check for duplicate email or username
$email = $_POST['email'] ?? '';
$username_input = $_POST['username'] ?? '';

if (!empty($email) || !empty($username_input)) {
    $stmt_check = $conn->prepare("SELECT id, email, username FROM world_plan_registrations WHERE email = ? OR username = ?");
    $stmt_check->bind_param("ss", $email, $username_input);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stmt_check->close();
        $conn->close();
        
        if ($row['email'] === $email) {
            echo json_encode(['status' => 'error', 'message' => 'This email address has already been registered.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'This username is already taken. Please choose another.']);
        }
        exit;
    }
    $stmt_check->close();
}

// 1. Handle the File Upload
$uploadDir = '../uploads/payments/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true); // Create directory if it doesn't exist
}

$fileName = '';
if (isset($_FILES['paymentProof']) && $_FILES['paymentProof']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['paymentProof']['tmp_name'];
    $fileExtension = strtolower(pathinfo($_FILES['paymentProof']['name'], PATHINFO_EXTENSION));
    
    // Allowed file types
    $allowedExts = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!in_array($fileExtension, $allowedExts)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, and PDF are allowed.']);
        exit;
    }

    $fileName = time() . '_' . bin2hex(random_bytes(5)) . '.' . $fileExtension;
    $destPath = $uploadDir . $fileName;

    if (!move_uploaded_file($fileTmpPath, $destPath)) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save uploaded file.']);
        exit;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Payment proof file is required.']);
    exit;
}

// 2. Insert into Database
try {
    $conn->query("ALTER TABLE world_plan_registrations ADD COLUMN status VARCHAR(20) DEFAULT 'Pending'");
} catch (Exception $e) {
    // Ignore if column already exists
}

$stmt = $conn->prepare("INSERT INTO world_plan_registrations (username, email, first_name, middle_name, last_name, birthdate, contact_no, address, package_type, payment_date, payment_proof, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");

$stmt->bind_param("sssssssssss", 
    $_POST['username'], 
    $_POST['email'], 
    $_POST['firstName'], 
    $_POST['middleName'], 
    $_POST['lastName'], 
    $_POST['birthdate'], 
    $_POST['contact'], 
    $_POST['address'], 
    $_POST['packageType'], 
    $_POST['paymentDate'], 
    $fileName
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database insertion failed.']);
}

$stmt->close();
$conn->close();
?>