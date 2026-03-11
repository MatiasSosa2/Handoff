import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: '.env.local' });
dotenv.config();

const mysqlConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
};

const databaseName = process.env.MYSQL_DATABASE || 'handoff_turnos';

let pool;

const createSchema = async (databasePool) => {
  await databasePool.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      service VARCHAR(120) NOT NULL,
      appointment_date DATE NOT NULL,
      appointment_time TIME NOT NULL,
      notes TEXT NOT NULL,
      status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
      source ENUM('internal', 'calendly') NOT NULL DEFAULT 'internal',
      client_email_sent TINYINT(1) NOT NULL DEFAULT 1,
      owner_email_sent TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_schedule (appointment_date, appointment_time),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
};

export const getPool = async () => {
  if (pool) {
    return pool;
  }

  const connection = await mysql.createConnection(mysqlConfig);
  await connection.query('CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', [databaseName]);
  await connection.end();

  pool = mysql.createPool({
    ...mysqlConfig,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await createSchema(pool);

  return pool;
};