<?php
/**
 * Simple router for EthicBot PHP
 * Handles routing between the HTML interface and PHP backend
 */

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove leading slash
$path = ltrim($path, '/');

// If no path or root, serve the HTML interface
if (empty($path) || $path === 'index.php') {
    include 'index_php.html';
    exit;
}

// If requesting the chatbot API
if ($path === 'ethicbot.php' || $path === 'api') {
    include 'ethicbot.php';
    exit;
}

// If requesting assets
if (preg_match('/\.(css|js|ico|png|jpg|jpeg|gif|svg)$/', $path)) {
    return false; // Let PHP's built-in server handle static files
}

// Default fallback
include 'index_php.html';
?>
