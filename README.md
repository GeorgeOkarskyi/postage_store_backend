# Postage store APIs

1. Clone the repository:
    ```bash
    git clone https://github.com/GeorgeOkarskyi/postage_store_backend
    ```

2. Create `.env` file with 
    ```
    MIKRO_ORM_DB_NAME=db_name
    MIKRO_ORM_USER=db_name
    MIKRO_ORM_PASSWORD=password
    MIKRO_ORM_HOST=host
    TOKEN_KEY=token_key
    ```

3. Create and start container
    - ` podman machine init `
    - ` podman machine start `
    - ` podman-compose up -d `

4. Connect to this instanse using DBeaver or pgAdmin. Use the .env vars:
    1. The host is MIKRO_ORM_HOST;
    2. Both DB name and user are MIKRO_ORM_DB_NAME;
    3. The password is MIKRO_ORM_PASSWORD;

5. Install dependencies:
    ```
    npm install
    ```
6. Run Migration create and up
    ```
    npm run migration:create
    nom run migration:up
    ```
7. Build the project
    ```
    npm run build
    ```
8. Start the project
    ```
    npm run start:dev
    ```

## API Endpoints 

| Method	| Endpoint | Description |
|----------|----------|----------|
| GET	| /api/products	| Get all products |
| GET	| /api/products/:productId	| Get a product |
| GET	| /api/profile/cart	| Get user cart |
| PUT	| /api/profile/cart	| Update user cart |
| DELETE	| /api/profile/cart	| Delete user cart |
| POST	| /api/profile/cart/checkout	| Checkout user cart |
| POST	| /auth/register	| Register user |
| POST	| /auth/login	| Login user |