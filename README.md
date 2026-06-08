# Commerce Laravel + Next.js Project

This is a full-stack e-commerce application built using:

- Backend: Laravel (API)
- Frontend: Next.js (React + TypeScript)

---

## 📁 Project Structure
commerce-laravel-nextjs
│
├── Ecom-api # Laravel backend (API)
└── ecom-front # Next.js frontend

---

## 🚀 Installation Guide

Follow these steps to run the project locally:

---

## 1️⃣ Clone the repository

```bash
git clone https://github.com/mina-8/commerce-laravel-nextjs
cd commerce-laravel-nextjs

cd Ecom-api

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan db:seed --class=DatabaseSeeder

php artisan serve

http://127.0.0.1:8000

cd ../ecom-front

npm install

npm run dev


DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api