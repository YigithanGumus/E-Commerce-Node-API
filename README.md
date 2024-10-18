# E-Commerce Node API

Bu, Node.js, Express ve MongoDB kullanılarak oluşturulmuş bir e-ticaret uygulaması için RESTful API'dir. API, kullanıcılar, ürünler, siparişler ve sepetler için yönetim uç noktaları sağlar ve tam bir e-ticaret deneyimi sunar.

This is a RESTful API for an e-commerce application built with Node.js, Express, and MongoDB. The API provides endpoints for managing users, products, orders, and carts, allowing for a complete e-commerce experience.

## Özellikler / Features

- Kullanıcı kaydı ve kimlik doğrulama / User registration and authentication
- Ürün yönetimi (CRUD işlemleri) / Product management (CRUD operations)
- Sipariş yönetimi (oluşturma, güncelleme, silme, alma) / Order management (create, update, delete, retrieve)
- Sepet yönetimi (ekleme, silme, alma) / Cart management (add, delete, retrieve)
- Kategori yönetimi / Category management
- Güvenli erişim için JWT tabanlı kimlik doğrulama / JWT-based authentication for secure access
- Ürün resimleri için dosya yükleme desteği / File upload support for product images

## Kullanılan Teknolojiler / Technologies Used

- **Node.js**: Sunucu tarafı uygulamaları oluşturmak için JavaScript çalışma zamanı / JavaScript runtime for building server-side applications
- **Express**: Node.js için web çerçevesi / Web framework for Node.js
- **MongoDB**: Uygulama verilerini depolamak için NoSQL veritabanı / NoSQL database for storing application data
- **Mongoose**: MongoDB ve Node.js için ODM (Nesne Veri Modelleme) kütüphanesi / ODM (Object Data Modeling) library for MongoDB and Node.js
- **JWT (JSON Web Tokens)**: Güvenli kullanıcı kimlik doğrulaması için / For secure user authentication
- **CryptoJS**: Şifreleme için / For password encryption
- **Dosya Yükleme**: Ürün resimleri yüklemek için destek / Support for uploading product images

## Kurulum / Installation

1. Depoyu klonlayın: / Clone the repository:
   ```bash
   git clone https://github.com/YigithanGumus/E-Commerce-Node-API.git
   cd E-Commerce-Node-API
   ```

2. Bağımlılıkları yükleyin: / Install dependencies:
   ```bash
   npm install
   ```

3. Kök dizinde bir `.env` dosyası oluşturun ve MongoDB bağlantı dizesi ile gizli anahtarlarınızı ekleyin: / Create a `.env` file in the root directory and add your MongoDB connection string and secret keys:
   ```plaintext
   MONGO_URL=mongodb://127.0.0.1:27017/ecommerce
   PASS_SEC=your_password_secret
   JWT_SEC=your_jwt_secret
   ```

4. Sunucuyu başlatın: / Start the server:
   ```bash
   npm start
   ```

## API Uç Noktaları / API Endpoints

### Kullanıcı Uç Noktaları / User Routes
- `POST /api/auth/register`: Yeni bir kullanıcı kaydı / Register a new user
- `POST /api/auth/login`: Mevcut bir kullanıcı girişi / Log in an existing user
- `GET /api/users`: Tüm kullanıcıları al (Yönetici sadece) / Get all users (Admin only)
- `GET /api/users/:userID`: Belirli bir kullanıcıyı al (Yönetici sadece) / Get a specific user (Admin only)
- `PUT /api/users/:userID`: Bir kullanıcıyı güncelle (Yönetici sadece) / Update a user (Admin only)
- `DELETE /api/users/:userID`: Bir kullanıcıyı sil (Yönetici sadece) / Delete a user (Admin only)

### Ürün Uç Noktaları / Product Routes
- `POST /api/products`: Yeni bir ürün oluştur / Create a new product
- `PUT /api/products/:productID`: Bir ürünü güncelle / Update a product
- `DELETE /api/products/:productID`: Bir ürünü sil / Delete a product
- `GET /api/products`: Tüm ürünleri al / Get all products
- `GET /api/products/:productID`: Belirli bir ürünü al / Get a specific product

### Sipariş Uç Noktaları / Order Routes
- `POST /api/orders`: Yeni bir sipariş oluştur / Create a new order
- `PUT /api/orders/:orderID`: Bir siparişi güncelle (Yönetici sadece) / Update an order (Admin only)
- `DELETE /api/orders/:orderID`: Bir siparişi sil (Yönetici sadece) / Delete an order (Admin only)
- `GET /api/orders`: Tüm siparişleri al (Yönetici sadece) / Get all orders (Admin only)
- `GET /api/orders/user/:userID`: Belirli bir kullanıcı için tüm siparişleri al / Get all orders for a specific user

### Sepet Uç Noktaları / Cart Routes
- `POST /api/carts`: Yeni bir sepet oluştur / Create a new cart
- `DELETE /api/carts/:cartID`: Bir sepeti sil / Delete a cart
- `GET /api/carts/:userID`: Belirli bir kullanıcı için sepeti al / Get the cart for a specific user
- `GET /api/carts`: Tüm sepetleri al (Yönetici sadece) / Get all carts (Admin only)

### Kategori Uç Noktaları / Category Routes
- `POST /api/categories`: Yeni bir kategori oluştur / Create a new category
- `PUT /api/categories/:categoryID`: Bir kategoriyi güncelle / Update a category
- `DELETE /api/categories/:categoryID`: Bir kategoriyi sil / Delete a category
- `GET /api/categories`: Tüm kategorileri al / Get all categories
- `GET /api/categories/:categoryID`: Belirli bir kategoriyi al / Get a specific category

## Katkıda Bulunma / Contributing

Katkılar hoş karşılanır! Lütfen bir pull request göndermekten veya herhangi bir öneri veya iyileştirme için bir sorun açmaktan çekinmeyin. / Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Lisans / License

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın. / This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Teşekkürler / Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [CryptoJS](https://cryptojs.gitbook.io/docs/)
