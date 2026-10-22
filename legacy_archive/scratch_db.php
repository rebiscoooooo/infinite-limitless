<?php
$conn = new mysqli('localhost', 'u803120420_infinite123', 'Infinite#1230', 'u803120420_infinite_db');
$result = $conn->query("SHOW COLUMNS FROM world_plan_registrations");
while ($row = $result->fetch_assoc()) {
    echo $row['Field'] . "\n";
}
?>
