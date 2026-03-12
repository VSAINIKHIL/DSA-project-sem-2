import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Console-based Vehicle Auction System
 * Inspired by the vacation rental booking system structure.
 */
public class VehicleAuctionApp {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Vehicle> vehicles = new ArrayList<>();
    private static List<User> users = new ArrayList<>();
    private static List<Bid> bids = new ArrayList<>();
    private static User currentUser = null;
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter DATETIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public static void main(String[] args) {
        initializeSampleData();
        showLoadingScreen();

        while (true) {
            if (currentUser == null) {
                showMainMenu();
            } else {
                showUserMenu();
            }
        }
    }

    private static void showLoadingScreen() {
        System.out.println("\n✦ VEHICLE AUCTION HOUSE ✦");
        System.out.println("Bid on your dream car!");
        try {
            Thread.sleep(500); // Simulate loading
        } catch (InterruptedException e) {
            // ignore
        }
    }

    // ==================== MENUS ====================

    private static void showMainMenu() {
        System.out.println("\n╔════════════════════════════╗");
        System.out.println("║       MAIN MENU           ║");
        System.out.println("╠════════════════════════════╣");
        System.out.println("║ 1. Login                   ║");
        System.out.println("║ 2. Register                ║");
        System.out.println("║ 3. Browse Vehicles         ║");
        System.out.println("║ 4. Exit                    ║");
        System.out.println("╚════════════════════════════╝");
        System.out.print("Choose option: ");

        String choice = scanner.nextLine();
        switch (choice) {
            case "1": login(); break;
            case "2": register(); break;
            case "3": browseVehicles(false); break;
            case "4": System.out.println("Thank you for using Vehicle Auction House. Goodbye!"); System.exit(0);
            default: System.out.println("Invalid option. Try again.");
        }
    }

    private static void showUserMenu() {
        System.out.println("\n╔════════════════════════════╗");
        System.out.println("║       USER MENU            ║");
        System.out.println("╠════════════════════════════╣");
        System.out.println("║ 1. Browse Vehicles         ║");
        System.out.println("║ 2. My Bids                 ║");
        System.out.println("║ 3. Place a Bid             ║");
        System.out.println("║ 4. " + (currentUser.isAdmin() ? "Admin Panel" : "Logout") + "           ║");
        System.out.println("║ 5. Exit                    ║");
        System.out.println("╚════════════════════════════╝");
        System.out.print("Choose option: ");

        String choice = scanner.nextLine();
        switch (choice) {
            case "1": browseVehicles(true); break;
            case "2": viewMyBids(); break;
            case "3": placeBid(); break;
            case "4":
                if (currentUser.isAdmin()) {
                    adminPanel();
                } else {
                    logout();
                }
                break;
            case "5": System.out.println("Thank you for using Vehicle Auction House. Goodbye!"); System.exit(0);
            default: System.out.println("Invalid option. Try again.");
        }
    }

    private static void adminPanel() {
        System.out.println("\n╔════════════════════════════╗");
        System.out.println("║       ADMIN PANEL          ║");
        System.out.println("╠════════════════════════════╣");
        System.out.println("║ 1. Add New Vehicle         ║");
        System.out.println("║ 2. View All Bids           ║");
        System.out.println("║ 3. View All Users          ║");
        System.out.println("║ 4. Back to User Menu       ║");
        System.out.println("╚════════════════════════════╝");
        System.out.print("Choose option: ");

        String choice = scanner.nextLine();
        switch (choice) {
            case "1": addVehicle(); break;
            case "2": viewAllBids(); break;
            case "3": viewAllUsers(); break;
            case "4": return;
            default: System.out.println("Invalid option.");
        }
    }

    // ==================== AUTHENTICATION ====================

    private static void login() {
        System.out.print("Username: ");
        String username = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();

        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                currentUser = user;
                System.out.println("Welcome back, " + username + "!");
                return;
            }
        }
        System.out.println("Invalid credentials.");
    }

    private static void register() {
        System.out.print("Choose username: ");
        String username = scanner.nextLine();
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                System.out.println("Username already taken.");
                return;
            }
        }
        System.out.print("Password: ");
        String password = scanner.nextLine();
        System.out.print("Email: ");
        String email = scanner.nextLine();

        boolean isAdmin = users.isEmpty(); // first user becomes admin
        User newUser = new User(username, password, email, isAdmin);
        users.add(newUser);
        System.out.println("Registration successful! Please login.");
    }

    private static void logout() {
        currentUser = null;
        System.out.println("Logged out.");
    }

    // ==================== VEHICLE BROWSING ====================

    private static void browseVehicles(boolean showBidOption) {
        if (vehicles.isEmpty()) {
            System.out.println("No vehicles available for auction.");
            return;
        }

        System.out.println("\n--- Vehicles on Auction ---");
        for (int i = 0; i < vehicles.size(); i++) {
            Vehicle v = vehicles.get(i);
            String status = v.getAuctionEndDate().isBefore(LocalDate.now()) ? "ENDED" : "ACTIVE";
            System.out.printf("%d. %d %s %s | Starting bid: $%.2f | Current bid: $%.2f | Ends: %s | %s\n",
                    i + 1, v.getYear(), v.getMake(), v.getModel(),
                    v.getStartingBid(), v.getCurrentBid(), v.getAuctionEndDate(), status);
        }

        if (showBidOption && currentUser != null) {
            System.out.print("\nEnter vehicle number to view details (or 0 to go back): ");
            try {
                int choice = Integer.parseInt(scanner.nextLine());
                if (choice > 0 && choice <= vehicles.size()) {
                    showVehicleDetails(vehicles.get(choice - 1));
                }
            } catch (NumberFormatException e) {
                // ignore
            }
        }
    }

    private static void showVehicleDetails(Vehicle v) {
        System.out.println("\n✦ " + v.getYear() + " " + v.getMake() + " " + v.getModel() + " ✦");
        System.out.println("Description: " + v.getDescription());
        System.out.println("Starting bid: $" + v.getStartingBid());
        System.out.println("Current bid: $" + v.getCurrentBid());
        System.out.println("Auction ends: " + v.getAuctionEndDate());
        if (v.getAuctionEndDate().isBefore(LocalDate.now())) {
            System.out.println("This auction has ended.");
        } else {
            System.out.println("Auction is active.");
        }

        if (currentUser != null && !v.getAuctionEndDate().isBefore(LocalDate.now())) {
            System.out.println("\nOptions:");
            System.out.println("1. Place a bid on this vehicle");
            System.out.println("2. Go back");
            System.out.print("Choose: ");
            String opt = scanner.nextLine();
            if ("1".equals(opt)) {
                placeBidOnVehicle(v);
            }
        }
    }

    // ==================== BIDDING ====================

    private static void placeBid() {
        browseVehicles(true); // Let user pick from list
    }

    private static void placeBidOnVehicle(Vehicle vehicle) {
        if (vehicle.getAuctionEndDate().isBefore(LocalDate.now())) {
            System.out.println("This auction has already ended. You cannot bid.");
            return;
        }

        System.out.println("\n--- Placing bid on " + vehicle.getYear() + " " + vehicle.getMake() + " " + vehicle.getModel() + " ---");
        System.out.println("Current highest bid: $" + vehicle.getCurrentBid());
        System.out.print("Enter your bid amount ($): ");

        try {
            double amount = Double.parseDouble(scanner.nextLine());
            if (amount <= vehicle.getCurrentBid()) {
                System.out.println("Your bid must be higher than the current bid of $" + vehicle.getCurrentBid());
                return;
            }
            if (amount <= 0) {
                System.out.println("Bid must be positive.");
                return;
            }

            System.out.print("Confirm bid of $" + amount + "? (yes/no): ");
            String confirm = scanner.nextLine();
            if (confirm.equalsIgnoreCase("yes")) {
                // Update vehicle's current bid
                vehicle.setCurrentBid(amount);
                // Record bid
                Bid bid = new Bid(generateBidId(), vehicle, currentUser, amount, LocalDateTime.now());
                bids.add(bid);
                System.out.println("Bid placed successfully!");
            } else {
                System.out.println("Bid cancelled.");
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid number.");
        }
    }

    private static int generateBidId() {
        return bids.size() + 1;
    }

    private static void viewMyBids() {
        List<Bid> myBids = bids.stream()
                .filter(b -> b.getUser().equals(currentUser))
                .sorted(Comparator.comparing(Bid::getBidTime).reversed())
                .collect(Collectors.toList());

        if (myBids.isEmpty()) {
            System.out.println("You have not placed any bids.");
            return;
        }

        System.out.println("\n--- Your Bids ---");
        for (Bid b : myBids) {
            Vehicle v = b.getVehicle();
            System.out.printf("Bid ID: %d | %d %s %s | Amount: $%.2f | Time: %s | Current highest: $%.2f\n",
                    b.getId(), v.getYear(), v.getMake(), v.getModel(),
                    b.getAmount(), b.getBidTime().format(DATETIME_FORMAT), v.getCurrentBid());
        }
    }

    // ==================== ADMIN FUNCTIONS ====================

    private static void addVehicle() {
        System.out.println("\n--- Add New Vehicle to Auction ---");
        System.out.print("Make: ");
        String make = scanner.nextLine();
        System.out.print("Model: ");
        String model = scanner.nextLine();
        System.out.print("Year: ");
        int year = Integer.parseInt(scanner.nextLine());
        System.out.print("Starting bid: ");
        double startingBid = Double.parseDouble(scanner.nextLine());
        System.out.print("Description: ");
        String description = scanner.nextLine();

        LocalDate endDate = null;
        while (endDate == null) {
            System.out.print("Auction end date (yyyy-mm-dd): ");
            try {
                endDate = LocalDate.parse(scanner.nextLine(), DATE_FORMAT);
                if (endDate.isBefore(LocalDate.now())) {
                    System.out.println("End date cannot be in the past.");
                    endDate = null;
                }
            } catch (DateTimeParseException e) {
                System.out.println("Invalid date format.");
            }
        }

        Vehicle v = new Vehicle(make, model, year, startingBid, startingBid, endDate, description);
        vehicles.add(v);
        System.out.println("Vehicle added to auction successfully!");
    }

    private static void viewAllBids() {
        if (bids.isEmpty()) {
            System.out.println("No bids have been placed yet.");
            return;
        }

        System.out.println("\n--- All Bids ---");
        for (Bid b : bids) {
            Vehicle v = b.getVehicle();
            System.out.printf("Bid ID: %d | %d %s %s | Bidder: %s | Amount: $%.2f | Time: %s\n",
                    b.getId(), v.getYear(), v.getMake(), v.getModel(),
                    b.getUser().getUsername(), b.getAmount(), b.getBidTime().format(DATETIME_FORMAT));
        }
    }

    private static void viewAllUsers() {
        System.out.println("\n--- Registered Users ---");
        for (User u : users) {
            System.out.printf("%s | %s | %s\n", u.getUsername(), u.getEmail(), u.isAdmin() ? "Admin" : "Customer");
        }
    }

    // ==================== INITIALIZATION ====================

    private static void initializeSampleData() {
        // Sample users
        users.add(new User("admin", "admin123", "admin@auctionhouse.com", true));
        users.add(new User("carfan", "pass", "carfan@email.com", false));
        users.add(new User("bidder", "pass", "bidder@email.com", false));

        // Sample vehicles
        vehicles.add(new Vehicle(
                "Tesla", "Model S", 2023,
                50000.00, 50000.00,
                LocalDate.now().plusDays(10),
                "Electric sedan, autopilot, full self-driving capability."
        ));
        vehicles.add(new Vehicle(
                "Ford", "Mustang GT", 2022,
                35000.00, 35500.00,
                LocalDate.now().plusDays(5),
                "V8 engine, leather seats, premium sound system."
        ));
        vehicles.add(new Vehicle(
                "Chevrolet", "Corvette", 2021,
                60000.00, 62000.00,
                LocalDate.now().plusDays(7),
                "Convertible, low mileage, garage kept."
        ));
        vehicles.add(new Vehicle(
                "Honda", "Civic", 2020,
                18000.00, 18250.00,
                LocalDate.now().minusDays(2), // ended
                "Reliable commuter car, good condition."
        ));
        vehicles.add(new Vehicle(
                "BMW", "X5", 2023,
                55000.00, 55000.00,
                LocalDate.now().plusDays(15),
                "Luxury SUV, panoramic roof, heated seats."
        ));

        // Sample bids (for demo)
        // Add some bids to the Mustang and Corvette
        Vehicle mustang = vehicles.get(1);
        Vehicle corvette = vehicles.get(2);
        User carfan = users.get(1);
        User bidder = users.get(2);

        bids.add(new Bid(1, mustang, carfan, 35200.00, LocalDateTime.now().minusDays(1)));
        bids.add(new Bid(2, mustang, bidder, 35500.00, LocalDateTime.now().minusHours(5)));
        mustang.setCurrentBid(35500.00);

        bids.add(new Bid(3, corvette, bidder, 61000.00, LocalDateTime.now().minusDays(2)));
        bids.add(new Bid(4, corvette, carfan, 62000.00, LocalDateTime.now().minusDays(1)));
        corvette.setCurrentBid(62000.00);
    }
}

// ==================== MODEL CLASSES ====================

class Vehicle {
    private static int idCounter = 1;
    private int id;
    private String make;
    private String model;
    private int year;
    private double startingBid;
    private double currentBid;
    private LocalDate auctionEndDate;
    private String description;

    public Vehicle(String make, String model, int year, double startingBid, double currentBid,
                   LocalDate auctionEndDate, String description) {
        this.id = idCounter++;
        this.make = make;
        this.model = model;
        this.year = year;
        this.startingBid = startingBid;
        this.currentBid = currentBid;
        this.auctionEndDate = auctionEndDate;
        this.description = description;
    }

    // Getters and setters
    public int getId() { return id; }
    public String getMake() { return make; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public double getStartingBid() { return startingBid; }
    public double getCurrentBid() { return currentBid; }
    public void setCurrentBid(double currentBid) { this.currentBid = currentBid; }
    public LocalDate getAuctionEndDate() { return auctionEndDate; }
    public String getDescription() { return description; }
}

class User {
    private static int idCounter = 1;
    private int id;
    private String username;
    private String password; // In real app, never store plain text
    private String email;
    private boolean isAdmin;

    public User(String username, String password, String email, boolean isAdmin) {
        this.id = idCounter++;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public boolean isAdmin() { return isAdmin; }
}

class Bid {
    private int id;
    private Vehicle vehicle;
    private User user;
    private double amount;
    private LocalDateTime bidTime;

    public Bid(int id, Vehicle vehicle, User user, double amount, LocalDateTime bidTime) {
        this.id = id;
        this.vehicle = vehicle;
        this.user = user;
        this.amount = amount;
        this.bidTime = bidTime;
    }

    public int getId() { return id; }
    public Vehicle getVehicle() { return vehicle; }
    public User getUser() { return user; }
    public double getAmount() { return amount; }
    public LocalDateTime getBidTime() { return bidTime; }
}