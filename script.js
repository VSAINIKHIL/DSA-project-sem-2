// ==================== DATA STRUCTURES ====================

// Node class for Linked List
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Linked List implementation for Users
class UserLinkedList {
    constructor() {    
        this.head = null;
        this.size = 0;
    }

    // Insert user at end
    insert(user) {
        const newNode = new Node(user);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return user;
    }

    // Insert at beginning (for recent users)
    insertAtBeginning(user) {
        const newNode = new Node(user);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        return user;
    }

    // Delete user by ID
    delete(userId) {
        if (!this.head) return null;

        if (this.head.data.id === userId) {
            const deleted = this.head.data;
            this.head = this.head.next;
            this.size--;
            return deleted;
        }

        let current = this.head;
        while (current.next && current.next.data.id !== userId) {
            current = current.next;
        }

        if (current.next) {
            const deleted = current.next.data;
            current.next = current.next.next;
            this.size--;
            return deleted;
        }
        return null;
    }

    // Find user by username (Linear Search)
    findByUsername(username) {
        let current = this.head;
        let comparisons = 0;
        
        while (current) {
            comparisons++;
            if (current.data.username.toLowerCase() === username.toLowerCase()) {
                console.log(`Linear Search: Found in ${comparisons} comparisons`);
                return current.data;
            }
            current = current.next;
        }
        console.log(`Linear Search: Not found after ${comparisons} comparisons`);
        return null;
    }

    // Find user by email
    findByEmail(email) {
        let current = this.head;
        while (current) {
            if (current.data.email.toLowerCase() === email.toLowerCase()) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Find user by ID
    findById(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Validate login credentials
    validateLogin(username, password, role) {
        let current = this.head;
        let comparisons = 0;
        
        while (current) {
            comparisons++;
            if (current.data.username === username && 
                current.data.password === password && 
                current.data.role === role) {
                console.log(`Login validation: Found in ${comparisons} comparisons`);
                return current.data;
            }
            current = current.next;
        }
        console.log(`Login validation: Not found after ${comparisons} comparisons`);
        return null;
    }

    // Get all users as array
    toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    }

    // Get users by role
    getUsersByRole(role) {
        const users = [];
        let current = this.head;
        while (current) {
            if (current.data.role === role) {
                users.push(current.data);
            }
            current = current.next;
        }
        return users;
    }

    // Bubble Sort users by username
    bubbleSortByUsername() {
        if (!this.head || !this.head.next) return;

        let swapped;
        do {
            swapped = false;
            let current = this.head;
            while (current.next) {
                if (current.data.username > current.next.data.username) {
                    // Swap data
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
        
        console.log("Users sorted by username using Bubble Sort");
    }

    // Selection Sort users by registration date
    selectionSortByDate() {
        if (!this.head || !this.head.next) return;

        let current = this.head;
        while (current) {
            let minNode = current;
            let searchNode = current.next;

            while (searchNode) {
                if (searchNode.data.createdAt < minNode.data.createdAt) {
                    minNode = searchNode;
                }
                searchNode = searchNode.next;
            }

            if (minNode !== current) {
                [current.data, minNode.data] = [minNode.data, current.data];
            }
            current = current.next;
        }
        
        console.log("Users sorted by registration date using Selection Sort");
    }

    // Quick Sort users by ID
    quickSortById() {
        const array = this.toArray();
        if (array.length <= 1) return;

        const sortedArray = this._quickSortHelper(array, (a, b) => a.id - b.id);
        
        // Rebuild linked list
        this.head = null;
        this.size = 0;
        sortedArray.forEach(user => this.insert(user));
        
        console.log("Users sorted by ID using Quick Sort");
    }

    _quickSortHelper(arr, compareFn) {
        if (arr.length <= 1) return arr;

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length; i++) {
            if (i === Math.floor(arr.length / 2)) continue;
            if (compareFn(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
                  
        return [...this._quickSortHelper(left, compareFn), pivot, ...this._quickSortHelper(right, compareFn)];
    }

    // Binary Search on sorted array (requires sorting first)
    binarySearchByUsername(username) {
        const users = this.toArray();
        users.sort((a, b) => a.username.localeCompare(b.username));
        
        let left = 0;
        let right = users.length - 1;
        let comparisons = 0;

        while (left <= right) {
            comparisons++;
            const mid = Math.floor((left + right) / 2);
            
            if (users[mid].username === username) {
                console.log(`Binary Search: Found in ${comparisons} comparisons`);
                return users[mid];
            }
            
            if (users[mid].username < username) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        console.log(`Binary Search: Not found after ${comparisons} comparisons`);
        return null;
    }
}

// Vehicle Linked List (extends base functionality)
class VehicleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert vehicle
    insert(vehicle) {
        const newNode = new Node(vehicle);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return vehicle;
    }

    // Delete vehicle
    delete(vehicleId) {
        if (!this.head) return null;

        if (this.head.data.id === vehicleId) {
            const deleted = this.head.data;
            this.head = this.head.next;
            this.size--;
            return deleted;
        }

        let current = this.head;
        while (current.next && current.next.data.id !== vehicleId) {
            current = current.next;
        }

        if (current.next) {
            const deleted = current.next.data;
            current.next = current.next.next;
            this.size--;
            return deleted;
        }
        return null;
    }

    // Find vehicle by ID
    findById(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    // Filter vehicles by type (car/bike)
    filterByType(type) {
        const vehicles = [];
        let current = this.head;
        while (current) {
            if (current.data.type === type) {
                vehicles.push(current.data);
            }
            current = current.next;
        }
        return vehicles;
    }

    // Filter by brand
    filterByBrand(brand) {
        const vehicles = [];
        let current = this.head;
        while (current) {
            if (current.data.brand.toLowerCase() === brand.toLowerCase()) {
                vehicles.push(current.data);
            }
            current = current.next;
        }
        return vehicles;
    }

    // Search vehicles (Linear Search)
    search(keyword) {
        keyword = keyword.toLowerCase();
        const results = [];
        let current = this.head;
        let comparisons = 0;

        while (current) {
            comparisons++;
            if (current.data.model.toLowerCase().includes(keyword) ||
                current.data.brand.toLowerCase().includes(keyword)) {
                results.push(current.data);
            }
            current = current.next;
        }
        
        console.log(`Vehicle search: ${comparisons} comparisons performed`);
        return results;
    }

    // Get all vehicles as array
    toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    }

    // Quick Sort implementation
    quickSort(compareFn) {
        const array = this.toArray();
        if (array.length <= 1) return;

        const sortedArray = this._quickSortHelper(array, compareFn);
        
        this.head = null;
        this.size = 0;
        sortedArray.forEach(item => this.insert(item));
    }

    _quickSortHelper(arr, compareFn) {
        if (arr.length <= 1) return arr;

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length; i++) {
            if (i === Math.floor(arr.length / 2)) continue;
            if (compareFn(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...this._quickSortHelper(left, compareFn), pivot, ...this._quickSortHelper(right, compareFn)];
    }

    // Bubble Sort (for small datasets)
    bubbleSort(compareFn) {
        if (!this.head || !this.head.next) return;

        let swapped;
        do {
            swapped = false;
            let current = this.head;
            while (current.next) {
                if (compareFn(current.data, current.next.data) > 0) {
                    [current.data, current.next.data] = [current.next.data, current.data];
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    // Get statistics
    getStatistics() {
        const vehicles = this.toArray();
        const stats = {
            total: vehicles.length,
            totalValue: 0,
            averagePrice: 0,
            byBrand: {},
            byType: { car: 0, bike: 0 }
        };

        vehicles.forEach(v => {
            stats.totalValue += v.price;
            stats.byBrand[v.brand] = (stats.byBrand[v.brand] || 0) + 1;
            if (v.type) stats.byType[v.type] = (stats.byType[v.type] || 0) + 1;
        });

        stats.averagePrice = stats.total > 0 ? stats.totalValue / stats.total : 0;
        return stats;
    }
}

// ==================== CLASS DEFINITIONS ====================

// User Class
class User {
    constructor(id, username, password, email, role, fullName, phone) {
        this.id = id;
        this.username = username;
        this.password = password; // In production, this should be hashed
        this.email = email;
        this.role = role; // 'admin' or 'user'
        this.fullName = fullName || '';
        this.phone = phone || '';
        this.createdAt = new Date();
        this.lastLogin = null;
        this.isActive = true;
        this.bidHistory = [];
        this.watchlist = [];
    }

    updateLastLogin() {
        this.lastLogin = new Date();
    }

    addToWatchlist(vehicleId) {
        if (!this.watchlist.includes(vehicleId)) {
            this.watchlist.push(vehicleId);
            return true;
        }
        return false;
    }

    removeFromWatchlist(vehicleId) {
        const index = this.watchlist.indexOf(vehicleId);
        if (index > -1) {
            this.watchlist.splice(index, 1);
            return true;
        }
        return false;
    }

    addBid(bid) {
        this.bidHistory.push(bid);
    }
}

// Vehicle Class
class Vehicle {
    constructor(id, model, year, price, brand, type, image, mileage, fuelType, transmission, description) {
        this.id = id;
        this.model = model;
        this.year = year;
        this.price = price;
        this.brand = brand;
        this.type = type; // 'car' or 'bike'
        this.image = image;
        this.mileage = mileage || 0;
        this.fuelType = fuelType || 'Petrol';
        this.transmission = transmission || 'Automatic';
        this.description = description || '';
        this.status = 'available'; // 'available', 'sold', 'pending'
        this.listedAt = new Date();
        this.bids = [];
        this.currentBid = price;
        this.bidCount = 0;
        this.featured = false;
    }

    placeBid(userId, amount) {
        if (amount > this.currentBid) {
            this.bids.push({
                userId,
                amount,
                timestamp: new Date()
            });
            this.currentBid = amount;
            this.bidCount++;
            return true;
        }
        return false;
    }

    markAsSold() {
        this.status = 'sold';
    }

    toggleFeatured() {
        this.featured = !this.featured;
    }
}

// Bid Class
class Bid {
    constructor(id, vehicleId, userId, amount) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.userId = userId;
        this.amount = amount;
        this.timestamp = new Date();
        this.status = 'active'; // 'active', 'won', 'lost'
    }
}

// ==================== APPLICATION STATE ====================

// Initialize data structures
const usersList = new UserLinkedList();
const vehiclesList = new VehicleLinkedList();
const bidsList = new VehicleLinkedList(); // Reusing for bids

// Current logged in user
let currentUser = null;
let nextUserId = 5;
let nextVehicleId = 11;
let nextBidId = 1;

// ==================== INITIALIZE SAMPLE DATA ====================

function initSampleData() {
    // Add sample users
    usersList.insert(new User(1, 'admin', 'admin123', 'admin@luxurybids.com', 'admin', 'System Admin', '+1-888-123-4567'));
    usersList.insert(new User(2, 'charan_singam', 'pass123', 'charan@email.com', 'user', 'charan', '+1-555-123-4567'));
    usersList.insert(new User(3, 'hemanth_vootla', 'pass123', 'hemanth@email.com', 'user', 'hemanth', '+1-555-987-6543'));
    usersList.insert(new User(4, 'sree_pad', 'pass123', 'mike@email.com', 'user', 'sreepad', '+1-555-456-7890'));

    // Add sample vehicles with type classification
    vehiclesList.insert(new Vehicle(
        1, 'Huracán', 2023, 325000, 'Lamborghini', 'car',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
        15, 'Petrol', 'Automatic', 'The Lamborghini Huracán is a stunning supercar with a V10 engine'
    ));
    
    vehiclesList.insert(new Vehicle(
        2, 'F8 Tributo', 2023, 295000, 'Ferrari', 'car',
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
        12, 'Petrol', 'Automatic', 'The Ferrari F8 Tributo represents the best of Ferrari engineering'
    ));
    
    vehiclesList.insert(new Vehicle(
        3, 'Panigale V4', 2023, 28500, 'Ducati', 'bike',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        0, 'Petrol', '6-Speed', 'The Ducati Panigale V4 is a masterpiece of Italian motorcycle engineering'
    ));
    
    vehiclesList.insert(new Vehicle(
        4, 'Ghost', 2024, 410000, 'Rolls Royce', 'car',
        'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800',
        18, 'Petrol', 'Automatic', 'The Rolls Royce Ghost epitomizes luxury and comfort'
    ));
    
    vehiclesList.insert(new Vehicle(
        5, 'S1000RR', 2023, 19500, 'BMW', 'bike',
        'https://images.unsplash.com/photo-1609630875171-b1321377a9c9?w=800',
        0, 'Petrol', '6-Speed', 'The BMW S1000RR is a superbike that dominates the track'
    ));
    
    vehiclesList.insert(new Vehicle(
        6, '911 Turbo S', 2023, 235000, 'Porsche', 'car',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        16, 'Petrol', 'PDK', 'The Porsche 911 Turbo S sets the benchmark for sports cars'
    ));
    
    vehiclesList.insert(new Vehicle(
        7, 'Ninja H2', 2023, 32000, 'Kawasaki', 'bike',
        'https://images.unsplash.com/photo-1568901838579-c7f3e2e5d6b1?w=800',
        0, 'Petrol', '6-Speed', 'The Kawasaki Ninja H2 features a supercharged engine'
    ));
    
    vehiclesList.insert(new Vehicle(
        8, '720S', 2023, 315000, 'McLaren', 'car',
        'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
        14, 'Petrol', 'SSG', 'The McLaren 720S offers incredible performance and handling'
    ));
    
    vehiclesList.insert(new Vehicle(
        9, 'YZF-R1M', 2023, 24500, 'Yamaha', 'bike',
        'https://images.unsplash.com/photo-1558980664-10dbd0c7f888?w=800',
        0, 'Petrol', '6-Speed', 'The Yamaha YZF-R1M is a track-focused racing machine'
    ));
    
    vehiclesList.insert(new Vehicle(
        10, 'DBS', 2023, 335000, 'Aston Martin', 'car',
        'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
        13, 'Petrol', 'Automatic', 'The Aston Martin DBS combines luxury with supercar performance'
    ));

    vehiclesList.insert(new Vehicle(
        10, 'ELECTRIC', 2026, 30000, 'tata', 'car',
        'https://ev.tatamotors.com/punch/ev.html',
        13, 'Petrol', 'Automatic', 'The TATA electric combines ability with super performance'
    ));

    console.log('Sample data initialized successfully!');
    console.log(`Total users: ${usersList.size}`);
    console.log(`Total vehicles: ${vehiclesList.size}`);
}

// Initialize data
initSampleData();

// ==================== AUTHENTICATION FUNCTIONS ====================

function showLoginModal() {
    // Create and show login modal
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <span class="close-modal">&times;</span>
            <h2>Login to Luxury Bids</h2>
            <div class="auth-tabs">
                <button class="tab-btn active" onclick="switchTab('login')">Login</button>
                <button class="tab-btn" onclick="switchTab('register')">Register</button>
            </div>
            
            <div id="loginForm" class="auth-form active">
                <div class="form-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="loginUsername" placeholder="Username">
                </div>
                <div class="form-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="loginPassword" placeholder="Password">
                </div>
                <div class="form-group">
                    <i class="fas fa-user-tag"></i>
                    <select id="loginRole">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button onclick="handleLogin()" class="auth-submit">Login</button>
                <p class="auth-switch">Don't have an account? <a onclick="switchTab('register')">Register</a></p>
            </div>

            <div id="registerForm" class="auth-form">
                <div class="form-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="regFullName" placeholder="Full Name">
                </div>
                <div class="form-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="regEmail" placeholder="Email">
                </div>
                <div class="form-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="regUsername" placeholder="Username">
                </div>
                <div class="form-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="regPassword" placeholder="Password">
                </div>
                <div class="form-group">
                    <i class="fas fa-phone"></i>
                    <input type="tel" id="regPhone" placeholder="Phone Number">
                </div>
                <div class="form-group">
                    <i class="fas fa-user-tag"></i>
                    <select id="regRole">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button onclick="handleRegister()" class="auth-submit">Register</button>
                <p class="auth-switch">Already have an account? <a onclick="switchTab('login')">Login</a></p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    window.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate using DSA (Linked List traversal)
    const user = usersList.validateLogin(username, password, role);

    if (user) {
        currentUser = user;
        user.updateLastLogin();
        
        // Update UI for logged in state
        updateUIForLogin(user);
        
        // Close modal
        document.querySelector('.auth-modal').remove();
        
        showNotification(`Welcome back, ${user.fullName || user.username}!`, 'success');
        
        // If admin, show admin panel
        if (user.role === 'admin') {
            showAdminPanel();
        }
        
        // Log the login event
        console.log(`User logged in: ${user.username} at ${new Date().toLocaleString()}`);
    } else {
        showNotification('Invalid credentials! Please try again.', 'error');
    }
}

function handleRegister() {
    const fullName = document.getElementById('regFullName').value;
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;
    const role = document.getElementById('regRole').value;

    // Validation
    if (!fullName || !email || !username || !password || !phone) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Check if username already exists (Linear Search)
    const existingUser = usersList.findByUsername(username);
    if (existingUser) {
        showNotification('Username already exists!', 'error');
        return;
    }

    // Check if email already exists
    const existingEmail = usersList.findByEmail(email);
    if (existingEmail) {
        showNotification('Email already registered!', 'error');
        return;
    }

    // Create new user
    const newUser = new User(nextUserId++, username, password, email, role, fullName, phone);
    
    // Insert using DSA (Linked List insertion)
    usersList.insert(newUser);
    
    showNotification('Registration successful! Please login.', 'success');
    
    // Switch to login tab
    switchTab('login');
    
    // Clear registration form
    document.getElementById('regFullName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regPhone').value = '';
    
    console.log(`New user registered: ${username} at ${new Date().toLocaleString()}`);
}

function logout() {
    if (currentUser) {
        console.log(`User logged out: ${currentUser.username} at ${new Date().toLocaleString()}`);
        currentUser = null;
        
        // Update UI for logged out state
        updateUIForLogout();
        
        // Remove admin panel if exists
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) adminPanel.remove();
        
        showNotification('Logged out successfully', 'info');
    }
}

// ==================== UI UPDATE FUNCTIONS ====================

function updateUIForLogin(user) {
    // Update navbar buttons
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <span class="user-greeting">Welcome, ${user.fullName || user.username}</span>
            <button class="btn btn-logout" onclick="logout()">Logout</button>
        `;
    }
}

function updateUIForLogout() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <button class="btn btn-login" onclick="showLoginModal()">Login</button>
            <button class="btn btn-register" onclick="showLoginModal()">Register</button>
        `;
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== ADMIN FUNCTIONS ====================

function showAdminPanel() {
    // Remove existing admin panel if any
    const existingPanel = document.getElementById('adminPanel');
    if (existingPanel) existingPanel.remove();

    const adminPanel = document.createElement('div');
    adminPanel.id = 'adminPanel';
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h3><i class="fas fa-crown"></i> Admin Dashboard</h3>
            <button class="btn-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
        
        <div class="admin-stats">
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <div class="stat-info">
                    <span class="stat-value">${usersList.size}</span>
                    <span class="stat-label">Total Users</span>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-car"></i>
                <div class="stat-info">
                    <span class="stat-value">${vehiclesList.size}</span>
                    <span class="stat-label">Total Vehicles</span>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-gavel"></i>
                <span class="stat-value">${vehiclesList.toArray().filter(v => v.status === 'available').length}</span>
                <span class="stat-label">Active Auctions</span>
            </div>
            <div class="stat-card">
                <i class="fas fa-dollar-sign"></i>
                <span class="stat-value">$${Math.round(vehiclesList.getStatistics().totalValue).toLocaleString()}</span>
                <span class="stat-label">Total Value</span>
            </div>
        </div>

        <div class="admin-tabs">
            <button class="admin-tab active" onclick="switchAdminTab('vehicles')">Manage Vehicles</button>
            <button class="admin-tab" onclick="switchAdminTab('users')">Manage Users</button>
            <button class="admin-tab" onclick="switchAdminTab('analytics')">Analytics</button>
        </div>

        <div id="adminVehiclesTab" class="admin-tab-content active">
            <div class="admin-actions">
                <h4>Add New Vehicle</h4>
                <div class="add-vehicle-form">
                    <input type="text" id="vehicleModel" placeholder="Model">
                    <input type="number" id="vehicleYear" placeholder="Year">
                    <input type="number" id="vehiclePrice" placeholder="Starting Price">
                    <input type="text" id="vehicleBrand" placeholder="Brand">
                    <select id="vehicleType">
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                    </select>
                    <input type="text" id="vehicleImage" placeholder="Image URL">
                    <input type="number" id="vehicleMileage" placeholder="Mileage (km/l)">
                    <select id="vehicleFuel">
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>
                    <textarea id="vehicleDesc" placeholder="Description"></textarea>
                    <button onclick="addVehicle()" class="btn-add">Add Vehicle</button>
                </div>
            </div>
            
            <div class="vehicle-list-admin">
                <h4>Vehicle Inventory</h4>
                <div class="admin-filters">
                    <input type="text" id="searchVehicle" placeholder="Search vehicles..." onkeyup="searchVehicles(this.value)">
                    <select onchange="filterVehiclesByType(this.value)">
                        <option value="all">All Types</option>
                        <option value="car">Cars Only</option>
                        <option value="bike">Bikes Only</option>
                    </select>
                    <select onchange="sortVehicles(this.value)">
                        <option value="price">Sort by Price</option>
                        <option value="year">Sort by Year</option>
                        <option value="brand">Sort by Brand</option>
                    </select>
                </div>
                <div id="vehicleAdminList" class="vehicle-admin-grid"></div>
            </div>
        </div>

        <div id="adminUsersTab" class="admin-tab-content">
            <h4>User Management</h4>
            <div class="user-list-admin">
                <div class="user-filters">
                    <input type="text" id="searchUser" placeholder="Search users..." onkeyup="searchUsers(this.value)">
                    <select onchange="filterUsersByRole(this.value)">
                        <option value="all">All Users</option>
                        <option value="user">Regular Users</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
                <div id="userAdminList" class="user-admin-grid"></div>
            </div>
        </div>

        <div id="adminAnalyticsTab" class="admin-tab-content">
            <h4>System Analytics</h4>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h5>Sorting Algorithm Performance</h5>
                    <canvas id="sortingChart"></canvas>
                </div>
                <div class="analytics-card">
                    <h5>Vehicle Distribution</h5>
                    <canvas id="vehicleChart"></canvas>
                </div>
                <div class="analytics-card">
                    <h5>Recent Activities</h5>
                    <div id="activityLog"></div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.featured').insertAdjacentElement('beforebegin', adminPanel);
    displayVehiclesForAdmin();
    displayUsersForAdmin();
}

function switchAdminTab(tab) {
    const tabs = document.querySelectorAll('.admin-tab');
    const contents = document.querySelectorAll('.admin-tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    if (tab === 'vehicles') {
        tabs[0].classList.add('active');
        document.getElementById('adminVehiclesTab').classList.add('active');
        displayVehiclesForAdmin();
    } else if (tab === 'users') {
        tabs[1].classList.add('active');
        document.getElementById('adminUsersTab').classList.add('active');
        displayUsersForAdmin();
    } else {
        tabs[2].classList.add('active');
        document.getElementById('adminAnalyticsTab').classList.add('active');
        loadAnalytics();
    }
}

// ==================== VEHICLE MANAGEMENT FUNCTIONS ====================

function addVehicle() {
    if (!currentUser || currentUser.role !== 'admin') {
        showNotification('Only admins can add vehicles!', 'error');
        return;
    }

    const model = document.getElementById('vehicleModel').value;
    const year = parseInt(document.getElementById('vehicleYear').value);
    const price = parseFloat(document.getElementById('vehiclePrice').value);
    const brand = document.getElementById('vehicleBrand').value;
    const type = document.getElementById('vehicleType').value;
    const image = document.getElementById('vehicleImage').value || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';
    const mileage = parseInt(document.getElementById('vehicleMileage').value) || 0;
    const fuelType = document.getElementById('vehicleFuel').value;
    const description = document.getElementById('vehicleDesc').value || '';

    if (!model || !year || !price || !brand) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }

    const newVehicle = new Vehicle(
        nextVehicleId++, model, year, price, brand, type,
        image, mileage, fuelType, 'Automatic', description
    );
    
    vehiclesList.insert(newVehicle);
    
    // Clear form
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleYear').value = '';
    document.getElementById('vehiclePrice').value = '';
    document.getElementById('vehicleBrand').value = '';
    document.getElementById('vehicleDesc').value = '';
    
    displayVehiclesForAdmin();
    showNotification('Vehicle added successfully!', 'success');
    
    console.log(`New vehicle added: ${model} by admin ${currentUser.username}`);
}

function deleteVehicle(vehicleId) {
    if (currentUser && currentUser.role === 'admin') {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            const deleted = vehiclesList.delete(vehicleId);
            if (deleted) {
                displayVehiclesForAdmin();
                showNotification(`Vehicle ${deleted.model} deleted successfully!`, 'success');
                console.log(`Vehicle deleted: ${deleted.model} by admin ${currentUser.username}`);
            }
        }
    }
}

function editVehicle(vehicleId) {
    const vehicle = vehiclesList.findById(vehicleId);
    if (!vehicle) return;

    // Populate form with vehicle data
    document.getElementById('vehicleModel').value = vehicle.model;
    document.getElementById('vehicleYear').value = vehicle.year;
    document.getElementById('vehiclePrice').value = vehicle.price;
    document.getElementById('vehicleBrand').value = vehicle.brand;
    document.getElementById('vehicleType').value = vehicle.type || 'car';
    document.getElementById('vehicleImage').value = vehicle.image;
    document.getElementById('vehicleMileage').value = vehicle.mileage;
    document.getElementById('vehicleFuel').value = vehicle.fuelType;
    document.getElementById('vehicleDesc').value = vehicle.description || '';

    // Change add button to update
    const addBtn = document.querySelector('.btn-add');
    addBtn.textContent = 'Update Vehicle';
    addBtn.onclick = () => updateVehicle(vehicleId);
}

function updateVehicle(vehicleId) {
    const vehicle = vehiclesList.findById(vehicleId);
    if (!vehicle) return;

    vehicle.model = document.getElementById('vehicleModel').value;
    vehicle.year = parseInt(document.getElementById('vehicleYear').value);
    vehicle.price = parseFloat(document.getElementById('vehiclePrice').value);
    vehicle.brand = document.getElementById('vehicleBrand').value;
    vehicle.type = document.getElementById('vehicleType').value;
    vehicle.image = document.getElementById('vehicleImage').value;
    vehicle.mileage = parseInt(document.getElementById('vehicleMileage').value) || 0;
    vehicle.fuelType = document.getElementById('vehicleFuel').value;
    vehicle.description = document.getElementById('vehicleDesc').value;

    // Reset form
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleYear').value = '';
    document.getElementById('vehiclePrice').value = '';
    document.getElementById('vehicleBrand').value = '';
    document.getElementById('vehicleDesc').value = '';

    const addBtn = document.querySelector('.btn-add');
    addBtn.textContent = 'Add Vehicle';
    addBtn.onclick = addVehicle;

    displayVehiclesForAdmin();
    showNotification('Vehicle updated successfully!', 'success');
}

function displayVehiclesForAdmin() {
    const vehicles = vehiclesList.toArray();
    const container = document.getElementById('vehicleAdminList');
    
    if (!container) return;

    if (vehicles.length === 0) {
        container.innerHTML = '<p class="no-data">No vehicles available.</p>';
        return;
    }

    let html = '';
    vehicles.forEach(vehicle => {
        html += `
            <div class="vehicle-admin-card">
                <img src="${vehicle.image}" alt="${vehicle.model}">
                <div class="vehicle-info">
                    <h4>${vehicle.model}</h4>
                    <p>${vehicle.brand} (${vehicle.year})</p>
                    <p class="price">$${vehicle.price.toLocaleString()}</p>
                    <p>Status: <span class="status ${vehicle.status}">${vehicle.status}</span></p>
                    <p>Type: ${vehicle.type || 'car'}</p>
                    <p>Bids: ${vehicle.bidCount || 0}</p>
                </div>
                <div class="vehicle-actions">
                    <button onclick="editVehicle(${vehicle.id})" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteVehicle(${vehicle.id})" class="btn-delete"><i class="fas fa-trash"></i></button>
                    <button onclick="toggleFeature(${vehicle.id})" class="btn-feature">
                        <i class="fas ${vehicle.featured ? 'fa-star' : 'fa-star-o'}"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function displayUsersForAdmin() {
    const users = usersList.toArray();
    const container = document.getElementById('userAdminList');
    
    if (!container) return;

    if (users.length === 0) {
        container.innerHTML = '<p class="no-data">No users found.</p>';
        return;
    }

    let html = '';
    users.forEach(user => {
        html += `
            <div class="user-admin-card">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <h4>${user.fullName || user.username}</h4>
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p><i class="fas fa-phone"></i> ${user.phone || 'N/A'}</p>
                    <p><i class="fas fa-tag"></i> ${user.role}</p>
                    <p><i class="fas fa-calendar"></i> Joined: ${user.createdAt.toLocaleDateString()}</p>
                    <p><i class="fas fa-clock"></i> Last Login: ${user.lastLogin ? user.lastLogin.toLocaleString() : 'Never'}</p>
                </div>
                <div class="user-actions">
                    <button onclick="toggleUserStatus(${user.id})" class="btn-status">
                        <i class="fas ${user.isActive ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                    <button onclick="deleteUser(${user.id})" class="btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== SEARCH AND FILTER FUNCTIONS ====================

function searchVehicles(keyword) {
    if (!keyword.trim()) {
        displayVehiclesForAdmin();
        return;
    }

    const results = vehiclesList.search(keyword);
    const container = document.getElementById('vehicleAdminList');
    
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = '<p class="no-data">No vehicles match your search.</p>';
        return;
    }

    let html = '';
    results.forEach(vehicle => {
        html += `
            <div class="vehicle-admin-card">
                <img src="${vehicle.image}" alt="${vehicle.model}">
                <div class="vehicle-info">
                    <h4>${vehicle.model}</h4>
                    <p>${vehicle.brand} (${vehicle.year})</p>
                    <p class="price">$${vehicle.price.toLocaleString()}</p>
                </div>
                <div class="vehicle-actions">
                    <button onclick="editVehicle(${vehicle.id})" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteVehicle(${vehicle.id})" class="btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function searchUsers(keyword) {
    if (!keyword.trim()) {
        displayUsersForAdmin();
        return;
    }

    keyword = keyword.toLowerCase();
    const users = usersList.toArray();
    const results = users.filter(user => 
        user.username.toLowerCase().includes(keyword) ||
        (user.fullName && user.fullName.toLowerCase().includes(keyword)) ||
        user.email.toLowerCase().includes(keyword)
    );

    const container = document.getElementById('userAdminList');
    
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = '<p class="no-data">No users match your search.</p>';
        return;
    }

    let html = '';
    results.forEach(user => {
        html += `
            <div class="user-admin-card">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <h4>${user.fullName || user.username}</h4>
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                </div>
                <div class="user-actions">
                    <button onclick="toggleUserStatus(${user.id})" class="btn-status">
                        <i class="fas ${user.isActive ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filterVehiclesByType(type) {
    if (type === 'all') {
        displayVehiclesForAdmin();
        return;
    }

    const filtered = vehiclesList.filterByType(type);
    const container = document.getElementById('vehicleAdminList');
    
    if (!container) return;

    if (filtered.length === 0) {
        container.innerHTML = `<p class="no-data">No ${type}s available.</p>`;
        return;
    }

    let html = '';
    filtered.forEach(vehicle => {
        html += `
            <div class="vehicle-admin-card">
                <img src="${vehicle.image}" alt="${vehicle.model}">
                <div class="vehicle-info">
                    <h4>${vehicle.model}</h4>
                    <p>${vehicle.brand} (${vehicle.year})</p>
                    <p class="price">$${vehicle.price.toLocaleString()}</p>
                </div>
                <div class="vehicle-actions">
                    <button onclick="editVehicle(${vehicle.id})" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteVehicle(${vehicle.id})" class="btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filterUsersByRole(role) {
    if (role === 'all') {
        displayUsersForAdmin();
        return;
    }

    const filtered = usersList.getUsersByRole(role);
    const container = document.getElementById('userAdminList');
    
    if (!container) return;

    if (filtered.length === 0) {
        container.innerHTML = `<p class="no-data">No ${role}s found.</p>`;
        return;
    }

    let html = '';
    filtered.forEach(user => {
        html += `
            <div class="user-admin-card">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <h4>${user.fullName || user.username}</h4>
                    <p><i class="fas fa-envelope"></i> ${user.email}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==================== SORTING FUNCTIONS ====================

function sortVehicles(criteria) {
    const compareFunctions = {
        price: (a, b) => a.price - b.price,
        year: (a, b) => b.year - a.year, // Newest first
        brand: (a, b) => a.brand.localeCompare(b.brand)
    };

    const compareFn = compareFunctions[criteria];
    
    // Demonstrate Quick Sort (most efficient)
    console.time('QuickSort');
    vehiclesList.quickSort(compareFn);
    console.timeEnd('QuickSort');
    
    displayVehiclesForAdmin();
    
    // Log sorting performance
    console.log(`Sorted ${vehiclesList.size} vehicles by ${criteria} using Quick Sort`);
}

// ==================== ANALYTICS FUNCTIONS ====================

function loadAnalytics() {
    const stats = vehiclesList.getStatistics();
    const users = usersList.toArray();
    
    // Demo analytics data
    document.getElementById('activityLog').innerHTML = `
        <div class="activity-item">
            <i class="fas fa-user-plus"></i>
            <span>New user registered: ${users[users.length-1]?.username || 'N/A'}</span>
            <small>Just now</small>
        </div>
        <div class="activity-item">
            <i class="fas fa-gavel"></i>
            <span>New bid placed on Lamborghini Huracán</span>
            <small>5 min ago</small>
        </div>
        <div class="activity-item">
            <i class="fas fa-car"></i>
            <span>Ferrari F8 Tributo sold for $310,000</span>
            <small>1 hour ago</small>
        </div>
        <div class="activity-item">
            <i class="fas fa-chart-line"></i>
            <span>Traffic increased by 25% this week</span>
            <small>2 hours ago</small>
        </div>
    `;
}

// ==================== ADDITIONAL STYLES ====================

const styles = `
    /* Auth Modal */
    .auth-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s;
    }

    .auth-modal-content {
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border-radius: 20px;
        padding: 2rem;
        width: 90%;
        max-width: 450px;
        position: relative;
        border: 1px solid rgba(255, 215, 0, 0.2);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .close-modal {
        position: absolute;
        right: 1.5rem;
        top: 1rem;
        font-size: 2rem;
        color: #ffd700;
        cursor: pointer;
        transition: 0.3s;
    }

    .close-modal:hover {
        transform: rotate(90deg);
    }

    .auth-modal h2 {
        color: #ffd700;
        margin-bottom: 2rem;
        text-align: center;
    }

    .auth-tabs {
        display: flex;
        margin-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 215, 0, 0.2);
    }

    .tab-btn {
        flex: 1;
        padding: 1rem;
        background: none;
        border: none;
        color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
        transition: 0.3s;
    }

    .tab-btn.active {
        color: #ffd700;
        border-bottom: 2px solid #ffd700;
    }

    .auth-form {
        display: none;
    }

    .auth-form.active {
        display: block;
    }

    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .form-group i {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #ffd700;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 10px;
        color: #fff;
        font-size: 1rem;
        transition: 0.3s;
    }

    .form-group textarea {
        min-height: 100px;
        resize: vertical;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #ffd700;
        outline: none;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    }

    .auth-submit {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #ffd700, #ffa500);
        border: none;
        border-radius: 10px;
        color: #0f172a;
        font-weight: 600;
        font-size: 1.1rem;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 1rem;
    }

    .auth-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
    }

    .auth-switch {
        text-align: center;
        margin-top: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .auth-switch a {
        color: #ffd700;
        cursor: pointer;
        text-decoration: none;
    }

    .auth-switch a:hover {
        text-decoration: underline;
    }

    /* Notifications */
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        background: white;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10001;
        animation: slideIn 0.3s;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .notification.success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }

    .notification.error {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
    }

    .notification.info {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
    }

    .notification i {
        font-size: 1.5rem;
    }

    /* Admin Panel */
    .admin-panel {
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border-radius: 20px;
        padding: 2rem;
        margin: 2rem 5%;
        border: 1px solid rgba(255, 215, 0, 0.2);
        position: relative;
        animation: slideUp 0.5s;
    }

    .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .admin-header h3 {
        color: #ffd700;
        font-size: 1.8rem;
    }

    .admin-header h3 i {
        margin-right: 10px;
    }

    .btn-close {
        background: none;
        border: none;
        color: #ffd700;
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s;
    }

    .btn-close:hover {
        transform: rotate(90deg);
    }

    .admin-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border: 1px solid rgba(255, 215, 0, 0.1);
    }

    .stat-card i {
        font-size: 2.5rem;
        color: #ffd700;
    }

    .stat-info {
        display: flex;
        flex-direction: column;
    }

    .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: #ffd700;
    }

    .stat-label {
        color: rgba(255, 255, 255, 0.7);
    }

    .admin-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 215, 0, 0.2);
        padding-bottom: 1rem;
    }

    .admin-tab {
        padding: 0.8rem 2rem;
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        transition: 0.3s;
        border-radius: 10px;
    }

    .admin-tab.active {
        background: linear-gradient(135deg, #ffd700, #ffa500);
        color: #0f172a;
    }

    .admin-tab-content {
        display: none;
    }

    .admin-tab-content.active {
        display: block;
    }

    .add-vehicle-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 15px;
    }

    .btn-add {
        padding: 1rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: 0.3s;
        grid-column: span 2;
    }

    .btn-add:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
    }

    .admin-filters,
    .user-filters {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }

    .admin-filters input,
    .admin-filters select,
    .user-filters input,
    .user-filters select {
        padding: 0.8rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 10px;
        color: #fff;
        flex: 1;
        min-width: 200px;
    }

    .vehicle-admin-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .vehicle-admin-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        overflow: hidden;
        border: 1px solid rgba(255, 215, 0, 0.1);
        transition: 0.3s;
    }

    .vehicle-admin-card:hover {
        transform: translateY(-5px);
        border-color: #ffd700;
    }

    .vehicle-admin-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .vehicle-admin-card .vehicle-info {
        padding: 1.5rem;
    }

    .vehicle-admin-card h4 {
        color: #ffd700;
        margin-bottom: 0.5rem;
    }

    .vehicle-admin-card .price {
        color: #10b981;
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0.5rem 0;
    }

    .vehicle-admin-card .status {
        padding: 0.2rem 0.8rem;
        border-radius: 50px;
        font-size: 0.9rem;
    }

    .status.available {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }

    .status.sold {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }

    .vehicle-actions {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        border-top: 1px solid rgba(255, 215, 0, 0.1);
    }

    .vehicle-actions button,
    .user-actions button {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .btn-edit:hover {
        background: #3b82f6;
    }

    .btn-delete:hover {
        background: #ef4444;
    }

    .btn-feature:hover {
        background: #ffd700;
        color: #0f172a;
    }

    .user-admin-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .user-admin-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 1.5rem;
        display: flex;
        gap: 1.5rem;
        border: 1px solid rgba(255, 215, 0, 0.1);
    }

    .user-avatar i {
        font-size: 4rem;
        color: #ffd700;
    }

    .user-info {
        flex: 1;
    }

    .user-info h4 {
        color: #ffd700;
        margin-bottom: 0.5rem;
    }

    .user-info p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0.3rem 0;
        font-size: 0.9rem;
    }

    .user-info i {
        width: 20px;
        color: #ffd700;
        margin-right: 5px;
    }

    .user-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .btn-status {
        background: rgba(16, 185, 129, 0.2) !important;
        color: #10b981 !important;
    }

    /* User Greeting */
    .user-greeting {
        color: #ffd700;
        font-weight: 600;
        margin-right: 1rem;
    }

    .btn-logout {
        background: #ef4444 !important;
        color: white !important;
    }

    .btn-logout:hover {
        background: #dc2626 !important;
    }

    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .admin-stats {
            grid-template-columns: 1fr;
        }

        .add-vehicle-form {
            grid-template-columns: 1fr;
        }

        .btn-add {
            grid-column: span 1;
        }

        .user-admin-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .user-actions {
            flex-direction: row;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ==================== EVENT LISTENERS ====================

// Update auth buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update auth buttons
    updateUIForLogout();
    
    // Add click handlers to existing buttons
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.onclick = showLoginModal;
    }
    
    if (registerBtn) {
        registerBtn.onclick = showLoginModal;
    }
    
    // Add filter button functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent;
            if (filter === 'All Vehicles') {
                // Show all vehicles - reset display
            } else if (filter === 'Luxury Cars') {
                // Filter luxury cars
            } else if (filter === 'Sports Cars') {
                // Filter sports cars
            } else if (filter === 'Super Bikes') {
                // Filter bikes
            }
        });
    });
    
    console.log('DSA Vehicle Auction System initialized');
    console.log('Data Structures: Linked Lists (Users, Vehicles)');
    console.log('Algorithms: Quick Sort, Bubble Sort, Selection Sort, Linear Search, Binary Search');
});