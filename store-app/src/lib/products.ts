import { Product } from './types';

export const products: Product[] = [
  { id: 1, name: "Cyberpunk 2077", category: "games", price: 29.99, oldPrice: 59.99, discount: 50, platform: ["PC", "Steam"], rating: 4.5, ratingCount: 12580, type: "global", isNew: false, icon: "🌆" },
  { id: 2, name: "The Witcher 3: Wild Hunt", category: "games", price: 9.99, oldPrice: 39.99, discount: 75, platform: ["PC", "Steam", "GOG"], rating: 4.8, ratingCount: 28400, type: "global", isNew: false, icon: "⚔️" },
  { id: 3, name: "Elden Ring", category: "games", price: 39.99, oldPrice: 59.99, discount: 33, platform: ["PC", "Steam"], rating: 4.7, ratingCount: 19200, type: "global", isNew: false, icon: "🔮" },
  { id: 4, name: "Baldur's Gate 3", category: "games", price: 44.99, oldPrice: 59.99, discount: 25, platform: ["PC", "Steam"], rating: 4.9, ratingCount: 15600, type: "global", isNew: true, icon: "🐉" },
  { id: 5, name: "Red Dead Redemption 2", category: "games", price: 19.99, oldPrice: 59.99, discount: 67, platform: ["PC", "Rockstar"], rating: 4.6, ratingCount: 22100, type: "global", isNew: false, icon: "🤠" },
  { id: 6, name: "GTA V Premium Edition", category: "games", price: 14.99, oldPrice: 29.99, discount: 50, platform: ["PC", "Rockstar"], rating: 4.4, ratingCount: 45200, type: "global", isNew: false, icon: "🚗" },
  { id: 7, name: "FIFA 25 Ultimate", category: "games", price: 34.99, oldPrice: 69.99, discount: 50, platform: ["PC", "EA Play"], rating: 4.2, ratingCount: 8900, type: "global", isNew: true, icon: "⚽" },
  { id: 8, name: "Hogwarts Legacy", category: "games", price: 24.99, oldPrice: 49.99, discount: 50, platform: ["PC", "Steam"], rating: 4.5, ratingCount: 11200, type: "global", isNew: false, icon: "🧙" },
  { id: 9, name: "Starfield", category: "games", price: 39.99, oldPrice: 69.99, discount: 43, platform: ["PC", "Xbox"], rating: 4.0, ratingCount: 7800, type: "global", isNew: false, icon: "🚀" },
  { id: 10, name: "Call of Duty: MW III", category: "games", price: 29.99, oldPrice: 69.99, discount: 57, platform: ["PC", "Battle.net"], rating: 4.1, ratingCount: 16300, type: "global", isNew: false, icon: "🎯" },

  { id: 11, name: "Windows 11 Pro", category: "software", price: 24.99, oldPrice: 199.99, discount: 87, platform: ["PC"], rating: 4.6, ratingCount: 32100, type: "global", isNew: false, icon: "🪟" },
  { id: 12, name: "Microsoft Office 2024", category: "software", price: 49.99, oldPrice: 149.99, discount: 67, platform: ["PC", "Mac"], rating: 4.7, ratingCount: 18700, type: "global", isNew: true, icon: "📊" },
  { id: 13, name: "Adobe Photoshop CC", category: "software", price: 19.99, oldPrice: 22.99, discount: 13, platform: ["PC", "Mac"], rating: 4.5, ratingCount: 9400, type: "global", isNew: false, icon: "🎨" },
  { id: 14, name: "Norton Antivirus Plus", category: "software", price: 14.99, oldPrice: 49.99, discount: 70, platform: ["PC", "Mac"], rating: 4.3, ratingCount: 6200, type: "global", isNew: false, icon: "🛡️" },
  { id: 15, name: "Ableton Live 12 Suite", category: "software", price: 39.99, oldPrice: 74.99, discount: 47, platform: ["PC", "Mac"], rating: 4.8, ratingCount: 4100, type: "global", isNew: true, icon: "🎵" },
  { id: 16, name: "FL Studio Producer", category: "software", price: 34.99, oldPrice: 99.99, discount: 65, platform: ["PC", "Mac"], rating: 4.6, ratingCount: 7800, type: "global", isNew: false, icon: "🎹" },

  { id: 17, name: "Steam Gift Card $50", category: "giftcards", price: 46.99, oldPrice: 50.00, discount: 6, platform: ["Steam"], rating: 4.9, ratingCount: 52300, type: "global", isNew: false, icon: "🎮" },
  { id: 18, name: "PlayStation Store $50", category: "giftcards", price: 47.49, oldPrice: 50.00, discount: 5, platform: ["PlayStation"], rating: 4.8, ratingCount: 38100, type: "region", isNew: false, icon: "🎯" },
  { id: 19, name: "Xbox Game Pass Ultimate 3M", category: "giftcards", price: 29.99, oldPrice: 44.99, discount: 33, platform: ["Xbox"], rating: 4.7, ratingCount: 21400, type: "global", isNew: false, icon: "🟢" },
  { id: 20, name: "Nintendo eShop $25", category: "giftcards", price: 23.49, oldPrice: 25.00, discount: 6, platform: ["Nintendo"], rating: 4.8, ratingCount: 15600, type: "region", isNew: false, icon: "🍄" },
  { id: 21, name: "Amazon Gift Card $100", category: "giftcards", price: 94.99, oldPrice: 100.00, discount: 5, platform: ["Amazon"], rating: 4.9, ratingCount: 41200, type: "global", isNew: false, icon: "📦" },
  { id: 22, name: "Google Play $50", category: "giftcards", price: 46.99, oldPrice: 50.00, discount: 6, platform: ["Android"], rating: 4.7, ratingCount: 28900, type: "global", isNew: false, icon: "📱" },

  { id: 23, name: "Netflix Premium 3M", category: "subscriptions", price: 24.99, oldPrice: 47.97, discount: 48, platform: ["Multi"], rating: 4.5, ratingCount: 19800, type: "global", isNew: false, icon: "🎬" },
  { id: 24, name: "Spotify Premium 12M", category: "subscriptions", price: 39.99, oldPrice: 119.88, discount: 67, platform: ["Multi"], rating: 4.7, ratingCount: 31200, type: "global", isNew: false, icon: "🎧" },
  { id: 25, name: "YouTube Premium 12M", category: "subscriptions", price: 34.99, oldPrice: 131.88, discount: 73, platform: ["Multi"], rating: 4.6, ratingCount: 14500, type: "global", isNew: false, icon: "▶️" },
  { id: 26, name: "Adobe Creative Cloud 1Y", category: "subscriptions", price: 89.99, oldPrice: 599.88, discount: 85, platform: ["PC", "Mac"], rating: 4.4, ratingCount: 8200, type: "global", isNew: false, icon: "🎯" },
  { id: 27, name: "VPN Premium 2 Years", category: "subscriptions", price: 29.99, oldPrice: 191.76, discount: 84, platform: ["Multi"], rating: 4.5, ratingCount: 11300, type: "global", isNew: true, icon: "🔒" },

  { id: 28, name: "Complete Web Developer", category: "courses", price: 14.99, oldPrice: 199.99, discount: 93, platform: ["Udemy"], rating: 4.7, ratingCount: 42800, type: "global", isNew: false, icon: "💻" },
  { id: 29, name: "Python Mastery Course", category: "courses", price: 12.99, oldPrice: 149.99, discount: 91, platform: ["Udemy"], rating: 4.8, ratingCount: 35600, type: "global", isNew: false, icon: "🐍" },
  { id: 30, name: "AI & Machine Learning", category: "courses", price: 16.99, oldPrice: 199.99, discount: 92, platform: ["Udemy"], rating: 4.6, ratingCount: 18900, type: "global", isNew: true, icon: "🤖" },
  { id: 31, name: "Digital Marketing Pro", category: "courses", price: 11.99, oldPrice: 129.99, discount: 91, platform: ["Udemy"], rating: 4.5, ratingCount: 24100, type: "global", isNew: false, icon: "📈" },
  { id: 32, name: "UI/UX Design Bootcamp", category: "courses", price: 13.99, oldPrice: 179.99, discount: 92, platform: ["Udemy"], rating: 4.7, ratingCount: 16700, type: "global", isNew: false, icon: "🎨" },

  { id: 33, name: "Windows 11 Pro", category: "os", price: 14.99, oldPrice: 199.99, discount: 93, platform: ["PC"], rating: 4.8, ratingCount: 34200, type: "global", isNew: false, icon: "🪟" },
  { id: 34, name: "Windows 11 Home", category: "os", price: 9.99, oldPrice: 139.99, discount: 93, platform: ["PC"], rating: 4.6, ratingCount: 22100, type: "global", isNew: false, icon: "🪟" },
  { id: 35, name: "Windows 11 LTSC", category: "os", price: 19.99, oldPrice: 249.99, discount: 92, platform: ["PC"], rating: 4.9, ratingCount: 8700, type: "global", isNew: true, icon: "🪟" },
  { id: 36, name: "Windows 10 Pro", category: "os", price: 12.99, oldPrice: 199.99, discount: 94, platform: ["PC"], rating: 4.7, ratingCount: 41500, type: "global", isNew: false, icon: "🪟" },
  { id: 37, name: "Windows 10 Home", category: "os", price: 7.99, oldPrice: 139.99, discount: 94, platform: ["PC"], rating: 4.5, ratingCount: 28900, type: "global", isNew: false, icon: "🪟" },
  { id: 38, name: "Windows 10 LTSC 2021", category: "os", price: 17.99, oldPrice: 249.99, discount: 93, platform: ["PC"], rating: 4.9, ratingCount: 6200, type: "global", isNew: true, icon: "🪟" },
];
