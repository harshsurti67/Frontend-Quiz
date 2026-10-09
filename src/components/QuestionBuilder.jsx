import React, { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { OPTION_LETTERS } from '../data/constants';

const GENERATED_PERSONAL_QUESTIONS_BANK = [
  {
    text: "What is {name}'s all-time favorite food?",
    options: ["Pizza", "Spicy Biryani", "Cheeseburger", "Pasta"],
    correctIndex: 1,
  },
  {
    text: "Where is {name}'s dream vacation destination?",
    options: ["Tokyo, Japan", "Swiss Alps", "Iceland Lights", "Bali Beach"],
    correctIndex: 0,
  },
  {
    text: "Which movie could {name} rewatch 10 times?",
    options: ["Interstellar", "The Dark Knight", "Inception", "Avengers Endgame"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s biggest pet peeve?",
    options: ["Chronic lateness", "Dishonesty & fake vibes", "Loud chewing", "People texting while talking"],
    correctIndex: 1,
  },
  {
    text: "How does {name} take caffeine in the morning?",
    options: ["Black Espresso", "Sweet Iced Latte", "Hot Masala Chai", "Matcha Green Tea"],
    correctIndex: 1,
  },
  {
    text: "What time of the day is {name}'s peak energy state?",
    options: ["Late Night Owl (12-3 AM)", "Early Sunrise (6 AM)", "Golden Hour Sunset (5 PM)", "High Noon Lunchtime (12 PM)"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s primary personality vibe?",
    options: ["Chill & Ambivert", "Wild Extrovert", "Quiet Introvert", "Workaholic Thinker"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s most used emoji in chat?",
    options: ["💀 Skull", "😂 Laughing Crying", "👀 Side Eyes", "🔥 Fire"],
    correctIndex: 0,
  },
  {
    text: "How many alarms does {name} set to wake up?",
    options: ["1 Alarm", "5+ Alarms", "No Alarm", "10 Alarms"],
    correctIndex: 1,
  },
  {
    text: "What is the best way to cheer {name} up when down?",
    options: ["Bring good food & snacks", "Long drive with great music", "Sit together in quiet comfort", "Go outside and party"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite music genre?",
    options: ["Hip-Hop/Rap", "Pop", "Rock", "EDM"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do on a perfect weekend?",
    options: ["Sleep all day", "Go on an adventure", "Hang out with friends", "Work on a project"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s biggest fear?",
    options: ["Heights", "Failure", "Being alone", "Spiders"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle stress?",
    options: ["Exercise", "Eat comfort food", "Sleep", "Talk to friends"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite season?",
    options: ["Winter", "Summer", "Spring", "Autumn"],
    correctIndex: 2,
  },
  {
    text: "What kind of books does {name} prefer?",
    options: ["Fiction", "Non-fiction", "Self-help", "No books"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s go-to comfort movie?",
    options: ["Harry Potter", "Friends TV Show", "The Office", "Disney movies"],
    correctIndex: 1,
  },
  {
    text: "How would {name} describe their fashion sense?",
    options: ["Trendy", "Casual", "Formal", "Don't care"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite holiday?",
    options: ["Christmas", "New Year", "Birthday", "Diwali"],
    correctIndex: 2,
  },
  {
    text: "What does {name} value most in friendships?",
    options: ["Loyalty", "Humor", "Honesty", "Fun"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite sport to watch?",
    options: ["Cricket", "Football", "Basketball", "Tennis"],
    correctIndex: 0,
  },
  {
    text: "How does {name} spend their free time?",
    options: ["Gaming", "Reading", "Social media", "Outdoor activities"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite dessert?",
    options: ["Ice cream", "Chocolate cake", "Gulab jamun", "Pie"],
    correctIndex: 2,
  },
  {
    text: "What type of traveler is {name}?",
    options: ["Planner", "Spontaneous", "Luxury", "Budget"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s biggest strength?",
    options: ["Creativity", "Logic", "Empathy", "Leadership"],
    correctIndex: 0,
  },
  {
    text: "How does {name} celebrate achievements?",
    options: ["Party hard", "Treat themselves", "Share with family", "Quiet celebration"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite color?",
    options: ["Blue", "Black", "Red", "Green"],
    correctIndex: 1,
  },
  {
    text: "What kind of phone does {name} prefer?",
    options: ["iPhone", "Android", "Doesn't matter", "No phone"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s morning routine like?",
    options: ["Quick & efficient", "Slow & relaxed", "Chaotic", "No routine"],
    correctIndex: 0,
  },
  {
    text: "What does {name} order at a coffee shop?",
    options: ["Black coffee", "Frappe", "Latte", "Tea"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite social media platform?",
    options: ["Instagram", "Twitter/X", "LinkedIn", "TikTok"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle disagreements?",
    options: ["Confront directly", "Avoid conflict", "Compromise", "Listen first"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s dream car?",
    options: ["Tesla", "BMW", "Mercedes", "Audi"],
    correctIndex: 0,
  },
  {
    text: "What type of learner is {name}?",
    options: ["Visual", "Auditory", "Kinesthetic", "Reading/writing"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite TV show genre?",
    options: ["Drama", "Comedy", "Thriller", "Reality"],
    correctIndex: 1,
  },
  {
    text: "How does {name} stay organized?",
    options: ["To-do lists", "Calendar", "Mental notes", "Not organized"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s biggest regret?",
    options: ["Not taking risks", "Not studying enough", "Lost friendships", "No regrets"],
    correctIndex: 3,
  },
  {
    text: "What kind of gifts does {name} like receiving?",
    options: ["Experiences", "Practical items", "Surprise gifts", "Money"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite childhood memory?",
    options: ["Family vacations", "School friends", "Playing sports", "Learning something new"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle criticism?",
    options: ["Take it constructively", "Get defensive", "Ignore it", "Learn from it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cuisine?",
    options: ["Indian", "Chinese", "Italian", "Mexican"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they won the lottery?",
    options: ["Invest", "Travel the world", "Buy a house", "Help family"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite outdoor activity?",
    options: ["Hiking", "Swimming", "Cycling", "Running"],
    correctIndex: 0,
  },
  {
    text: "How does {name} make important decisions?",
    options: ["Logic", "Gut feeling", "Advice from others", "Pros/cons list"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite animal?",
    options: ["Dog", "Cat", "Bird", "Fish"],
    correctIndex: 0,
  },
  {
    text: "What kind of parties does {name} enjoy?",
    options: ["House parties", "Clubbing", "Dinner parties", "No parties"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite board game?",
    options: ["Chess", "Monopoly", "Scrabble", "Uno"],
    correctIndex: 1,
  },
  {
    text: "How does {name} express love?",
    options: ["Words of affirmation", "Acts of service", "Quality time", "Gifts"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite weather?",
    options: ["Sunny", "Rainy", "Cloudy", "Snowy"],
    correctIndex: 0,
  },
  {
    text: "What would {name}'s superpower be?",
    options: ["Flying", "Invisibility", "Mind reading", "Time travel"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite way to exercise?",
    options: ["Gym", "Running", "Yoga", "Sports"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being bored?",
    options: ["Scroll social media", "Call friends", "Learn something new", "Sleep"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite snack?",
    options: ["Chips", "Chocolate", "Fruits", "Nuts"],
    correctIndex: 1,
  },
  {
    text: "What kind of movies does {name} dislike?",
    options: ["Horror", "Romance", "Action", "Comedy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s biggest achievement?",
    options: ["Academic", "Career", "Personal", "Still working on it"],
    correctIndex: 3,
  },
  {
    text: "How does {name} spend their birthday?",
    options: ["Big party", "Family dinner", "Trip", "Quiet day"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite app?",
    options: ["WhatsApp", "Instagram", "YouTube", "Spotify"],
    correctIndex: 2,
  },
  {
    text: "What kind of person is {name} in a group?",
    options: ["Leader", "Follower", "Peacemaker", "Joker"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite drink (non-alcoholic)?",
    options: ["Soda", "Juice", "Water", "Milkshake"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle money?",
    options: ["Saver", "Spender", "Investor", "Careful"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite subject in school?",
    options: ["Math", "Science", "English", "History"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do on a rainy day?",
    options: ["Read a book", "Watch movies", "Cook", "Sleep"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite clothing brand?",
    options: ["Nike", "Zara", "H&M", "Local brands"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle success?",
    options: ["Stay humble", "Celebrate loudly", "Share with others", "Keep working"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite time of day?",
    options: ["Morning", "Afternoon", "Evening", "Night"],
    correctIndex: 3,
  },
  {
    text: "What kind of videos does {name} watch?",
    options: ["Educational", "Entertainment", "Vlogs", "Tutorials"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite fruit?",
    options: ["Mango", "Apple", "Banana", "Orange"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle disappointment?",
    options: ["Stay positive", "Get upset", "Learn from it", "Distract themselves"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite restaurant type?",
    options: ["Fast food", "Fine dining", "Casual dining", "Street food"],
    correctIndex: 2,
  },
  {
    text: "What would {name} name their pet?",
    options: ["Max", "Luna", "Charlie", "Bella"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle deadlines?",
    options: ["Early finisher", "Last minute", "On time", "Procrastinator"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite hobby?",
    options: ["Gaming", "Cooking", "Photography", "Reading"],
    correctIndex: 2,
  },
  {
    text: "What kind of music does {name} dislike?",
    options: ["Classical", "Heavy metal", "Country", "Pop"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite holiday activity?",
    options: ["Decorating", "Shopping", "Traveling", "Relaxing"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle compliments?",
    options: ["Accept gracefully", "Get shy", "Deflect", "Return them"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of art?",
    options: ["Painting", "Music", "Photography", "Sculpture"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they had a free day?",
    options: ["Sleep", "Explore city", "Meet friends", "Learn something"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of pizza?",
    options: ["Pepperoni", "Margherita", "BBQ Chicken", "Veggie"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle change?",
    options: ["Embrace it", "Resist it", "Adapt slowly", "Ignore it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite cartoon character?",
    options: ["SpongeBob", "Tom & Jerry", "Doraemon", "Pokemon"],
    correctIndex: 2,
  },
  {
    text: "What kind of learner is {name} in groups?",
    options: ["Leader", "Observer", "Contributor", "Listener"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite way to relax?",
    options: ["Meditation", "Music", "TV", "Nature"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they were invisible for a day?",
    options: ["Prank people", "Listen to conversations", "Help secretly", "Explore places"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite type of sandwich?",
    options: ["Grilled cheese", "Club", "BLT", "Veggie"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the center of attention?",
    options: ["Loves it", "Hates it", "Doesn't mind", "Depends on situation"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite childhood cartoon?",
    options: ["Tom & Jerry", "Doraemon", "Pokemon", "Scooby-Doo"],
    correctIndex: 1,
  },
  {
    text: "What kind of person is {name} in relationships?",
    options: ["Romantic", "Practical", "Independent", "Dependent"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of ice cream?",
    options: ["Chocolate", "Vanilla", "Strawberry", "Mint"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being wrong?",
    options: ["Admit it quickly", "Defend position", "Stay silent", "Learn from it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of video game?",
    options: ["Action", "Sports", "Puzzle", "RPG"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do on a beach day?",
    options: ["Swim", "Sunbathe", "Play volleyball", "Build sandcastles"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of chocolate?",
    options: ["Dark", "Milk", "White", "No preference"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle surprises?",
    options: ["Love them", "Hate them", "Depends", "Neutral"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of bread?",
    options: ["White", "Whole wheat", "Sourdough", "Multigrain"],
    correctIndex: 2,
  },
  {
    text: "What would {name} do if they could time travel?",
    options: ["Visit past", "See future", "Fix mistakes", "Meet ancestors"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite type of tea?",
    options: ["Green", "Black", "Herbal", "Masala chai"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle competition?",
    options: ["Competitive", "Casual", "Avoids it", "Supportive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cookie?",
    options: ["Chocolate chip", "Oreo", "Sugar", "Gingerbread"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they had unlimited money?",
    options: ["Buy everything", "Help others", "Invest", "Travel"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of salad?",
    options: ["Caesar", "Greek", "Garden", "Fruit"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being alone?",
    options: ["Enjoys it", "Hates it", "Depends", "Needs company"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of soup?",
    options: ["Tomato", "Chicken noodle", "Vegetable", "Miso"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could fly?",
    options: ["Travel everywhere", "Save people", "Have fun", "Show off"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cheese?",
    options: ["Cheddar", "Mozzarella", "Parmesan", "Brie"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle compliments from strangers?",
    options: ["Accept happily", "Get suspicious", "Feel awkward", "Ignore"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pasta?",
    options: ["Spaghetti", "Penne", "Macaroni", "Fusilli"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could talk to animals?",
    options: ["Understand pets", "Help wildlife", "Have conversations", "Learn secrets"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of juice?",
    options: ["Orange", "Apple", "Mango", "Mixed fruit"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being interrupted?",
    options: ["Let it go", "Speak up", "Get annoyed", "Wait patiently"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seafood?",
    options: ["Shrimp", "Fish", "Crab", "Lobster"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could live anywhere?",
    options: ["Beach house", "Mountain cabin", "City apartment", "Countryside"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of nut?",
    options: ["Almond", "Cashew", "Walnut", "Peanut"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being misunderstood?",
    options: ["Explain clearly", "Let it go", "Get frustrated", "Write it down"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of berry?",
    options: ["Strawberry", "Blueberry", "Raspberry", "Blackberry"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they had a clone?",
    options: ["Double productivity", "Send to work", "Hang out together", "Confuse people"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cereal?",
    options: ["Cornflakes", "Oats", "Fruit loops", "Granola"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle waiting in line?",
    options: ["Patiently", "Annoyed", "Distracted", "Find shortest line"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of flower?",
    options: ["Rose", "Sunflower", "Tulip", "Lily"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could read minds?",
    options: ["Use for good", "Stay away from it", "Have fun", "Learn secrets"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cake?",
    options: ["Chocolate", "Vanilla", "Red velvet", "Carrot"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the oldest in a group?",
    options: ["Take charge", "Feel responsible", "Act young", "Stay neutral"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of meat?",
    options: ["Chicken", "Beef", "Pork", "Fish"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could stop time?",
    options: ["Sleep more", "Get work done", "Enjoy moments", "Prank people"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite type of vegetable?",
    options: ["Broccoli", "Carrot", "Spinach", "Potato"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the youngest in a group?",
    options: ["Learn from others", "Try to lead", "Feel left out", "Enjoy attention"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of sauce?",
    options: ["Ketchup", "Hot sauce", "Mayo", "Soy sauce"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could teleport?",
    options: ["Travel daily", "Visit family", "Save commute time", "Explore world"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of spice?",
    options: ["Chili", "Pepper", "Cumin", "Turmeric"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being in the spotlight?",
    options: ["Shine brightly", "Get nervous", "Stay calm", "Avoid it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of shellfish?",
    options: ["Shrimp", "Crab", "Lobster", "Mussels"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could speak all languages?",
    options: ["Travel everywhere", "Help people", "Learn cultures", "Show off"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of herb?",
    options: ["Basil", "Mint", "Cilantro", "Rosemary"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being underestimated?",
    options: ["Prove them wrong", "Ignore it", "Get motivated", "Feel discouraged"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of citrus fruit?",
    options: ["Orange", "Lemon", "Lime", "Grapefruit"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could control weather?",
    options: ["Make it sunny always", "Bring rain for farms", "Seasonal balance", "Snow days"],
    correctIndex: 2,
  },
  {
    text: "What is {name}'s favorite type of root vegetable?",
    options: ["Carrot", "Potato", "Radish", "Beet"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being overestimated?",
    options: ["Work harder", "Be honest", "Enjoy confidence", "Feel pressure"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of melon?",
    options: ["Watermelon", "Cantaloupe", "Honeydew", "Muskmelon"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could live forever?",
    options: ["Learn everything", "See the future", "Help generations", "Get bored"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of stone fruit?",
    options: ["Peach", "Plum", "Cherry", "Apricot"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the smartest in the room?",
    options: ["Help others", "Show off", "Stay humble", "Stay quiet"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of legume?",
    options: ["Lentils", "Chickpeas", "Beans", "Peas"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could change one thing about the world?",
    options: ["End hunger", "World peace", "Better education", "Clean environment"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of grain?",
    options: ["Rice", "Wheat", "Quinoa", "Oats"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the funniest person in the group?",
    options: ["Entertain everyone", "Stay humble", "Make more jokes", "Be serious sometimes"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seed?",
    options: ["Sunflower", "Pumpkin", "Sesame", "Chia"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could meet anyone from history?",
    options: ["Einstein", "Gandhi", "Shakespeare", "Da Vinci"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of oil?",
    options: ["Olive", "Coconut", "Sesame", "Mustard"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most attractive person?",
    options: ["Stay humble", "Use it wisely", "Enjoy attention", "Ignore it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of vinegar?",
    options: ["Balsamic", "Apple cider", "White", "Rice"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could have any pet?",
    options: ["Dog", "Cat", "Exotic animal", "All animals"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite type of sweetener?",
    options: ["Sugar", "Honey", "Stevia", "Maple syrup"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being the richest person?",
    options: ["Help others", "Invest", "Enjoy life", "Stay humble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of flour?",
    options: ["All-purpose", "Whole wheat", "Almond", "Coconut"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about themselves?",
    options: ["Nothing", "Be taller", "Be smarter", "Be healthier"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seasoning?",
    options: ["Salt", "Pepper", "Garlic powder", "Onion powder"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being the most talented?",
    options: ["Work harder", "Stay humble", "Share knowledge", "Rest on laurels"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of condiment?",
    options: ["Ketchup", "Mustard", "Mayo", "Hot sauce"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change the past?",
    options: ["Fix mistakes", "Keep it same", "Learn from it", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of spread?",
    options: ["Butter", "Jam", "Peanut butter", "Nutella"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most experienced?",
    options: ["Mentor others", "Stay humble", "Share wisdom", "Lead confidently"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of dip?",
    options: ["Hummus", "Guacamole", "Salsa", "Ranch"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could see the future?",
    options: ["Prepare for it", "Change bad things", "Stay curious", "Ignore it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of dressing?",
    options: ["Ranch", "Italian", "Vinaigrette", "Caesar"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being the most popular?",
    options: ["Stay grounded", "Enjoy it", "Help others", "Use influence wisely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of syrup?",
    options: ["Maple", "Chocolate", "Strawberry", "Honey"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one law?",
    options: ["Better education", "Free healthcare", "Environmental protection", "Equality"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of jam?",
    options: ["Strawberry", "Raspberry", "Blueberry", "Mixed fruit"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most respected?",
    options: ["Earn it daily", "Stay humble", "Lead by example", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of jelly?",
    options: ["Grape", "Strawberry", "Apple", "Orange"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one rule of physics?",
    options: ["Fly", "Teleport", "Time travel", "Infinite energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of preserve?",
    options: ["Jam", "Jelly", "Marmalade", "Chutney"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most loved?",
    options: ["Return love", "Stay humble", "Cherish it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pickle?",
    options: ["Dill", "Sweet", "Spicy", "Sour"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about nature?",
    options: ["More trees", "Cleaner oceans", "Better weather", "More animals"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of relish?",
    options: ["Sweet", "Spicy", "Sour", "Savory"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most feared?",
    options: ["Be kind", "Use power wisely", "Change perception", "Stay humble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of chutney?",
    options: ["Mint", "Tamarind", "Coconut", "Tomato"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about society?",
    options: ["More kindness", "Less greed", "Better education", "Equality for all"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of salsa?",
    options: ["Mild", "Medium", "Hot", "Extra hot"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being the most powerful?",
    options: ["Help others", "Stay humble", "Use wisely", "Share power"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pesto?",
    options: ["Basil", "Sun-dried tomato", "Spinach", "Walnut"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about technology?",
    options: ["Less screen time", "Better AI", "More connection", "Less distraction"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of tapenade?",
    options: ["Olive", "Sun-dried tomato", "Roasted pepper", "Mixed"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most influential?",
    options: ["Use for good", "Stay humble", "Inspire others", "Lead responsibly"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of hummus?",
    options: ["Classic", "Red pepper", "Garlic", "Lemon"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about the universe?",
    options: ["More life", "More stars", "More peace", "More wonder"],
    correctIndex: 3,
  },
  {
    text: "What is {name}'s favorite type of baba ganoush?",
    options: ["Smoky", "Creamy", "Spicy", "Herbed"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most knowledgeable?",
    options: ["Share knowledge", "Stay humble", "Keep learning", "Teach others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of tzatziki?",
    options: ["Garlic", "Dill", "Cucumber", "Lemon"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about humanity?",
    options: ["More love", "Less hate", "More understanding", "More compassion"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of guacamole?",
    options: ["Classic", "Spicy", "Mango", "Corn"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most creative?",
    options: ["Create more", "Stay humble", "Inspire others", "Share ideas"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pico de gallo?",
    options: ["Traditional", "Spicy", "Mild", "Fruity"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about themselves physically?",
    options: ["Nothing", "Better health", "More energy", "Better sleep"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of chimichurri?",
    options: ["Classic", "Spicy", "Herbed", "Citrus"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most athletic?",
    options: ["Stay fit", "Inspire others", "Stay humble", "Compete"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of romesco?",
    options: ["Classic", "Spicy", "Smoky", "Nutty"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about themselves mentally?",
    options: ["Nothing", "Better focus", "Less anxiety", "More confidence"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of aioli?",
    options: ["Garlic", "Saffron", "Herb", "Spicy"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most artistic?",
    options: ["Create more", "Share art", "Stay humble", "Inspire others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of remoulade?",
    options: ["Classic", "Spicy", "Herbed", "Citrus"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their life?",
    options: ["Nothing", "More time", "More money", "More travel"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of tartar sauce?",
    options: ["Classic", "Spicy", "Herbed", "Lemon"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most musical?",
    options: ["Make music", "Share music", "Stay humble", "Inspire others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cocktail sauce?",
    options: ["Classic", "Spicy", "Horseradish", "Citrus"],
    correctIndex: 2,
  },
  {
    text: "What would {name} do if they could change one thing about their career?",
    options: ["Nothing", "More money", "Better balance", "More impact"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of hollandaise?",
    options: ["Classic", "Lemon", "Herbed", "Light"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most successful?",
    options: ["Stay humble", "Help others", "Keep growing", "Enjoy success"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of bearnaise?",
    options: ["Classic", "Herbed", "Tarragon", "Light"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their relationships?",
    options: ["Nothing", "More time", "Better communication", "More understanding"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of bechamel?",
    options: ["Classic", "Cheesy", "Herbed", "Nutmeg"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the happiest?",
    options: ["Spread joy", "Stay humble", "Cherish moments", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of veloute?",
    options: ["Chicken", "Fish", "Vegetable", "Classic"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their family?",
    options: ["Nothing", "More time", "Better communication", "More love"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of espagnole?",
    options: ["Classic", "Rich", "Herbed", "Wine"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the luckiest?",
    options: ["Share luck", "Stay humble", "Use wisely", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of tomato sauce?",
    options: ["Marinara", "Bolognese", "Arrabbiata", "Pomodoro"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their friends?",
    options: ["Nothing", "More time", "Better connection", "More fun"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cream sauce?",
    options: ["Alfredo", "Carbonara", "Mushroom", "Garlic"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the wisest?",
    options: ["Share wisdom", "Stay humble", "Keep learning", "Guide others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of butter sauce?",
    options: ["Lemon", "Garlic", "Herb", "Wine"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their health?",
    options: ["Nothing", "Better fitness", "Better sleep", "Less stress"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of wine sauce?",
    options: ["Red", "White", "Rose", "Fortified"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the bravest?",
    options: ["Protect others", "Stay humble", "Face fears", "Inspire courage"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pan sauce?",
    options: ["Classic", "Herbed", "Creamy", "Spicy"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their future?",
    options: ["Nothing", "More certainty", "More adventure", "More peace"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of gravy?",
    options: ["Beef", "Chicken", "Turkey", "Vegetarian"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the kindest?",
    options: ["Spread kindness", "Stay humble", "Help everyone", "Inspire kindness"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of jus?",
    options: ["Beef", "Chicken", "Lamb", "Vegetable"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their past?",
    options: ["Nothing", "Learn more", "Less mistakes", "More memories"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of glaze?",
    options: ["Sweet", "Savory", "Spicy", "Citrus"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most patient?",
    options: ["Help others", "Stay calm", "Teach patience", "Wait wisely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of reduction?",
    options: ["Balsamic", "Wine", "Fruit", "Vinegar"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their personality?",
    options: ["Nothing", "More confident", "More outgoing", "More relaxed"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of coulis?",
    options: ["Fruit", "Vegetable", "Berry", "Tomato"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most determined?",
    options: ["Achieve goals", "Stay humble", "Inspire others", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of compote?",
    options: ["Berry", "Stone fruit", "Apple", "Mixed"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their habits?",
    options: ["Nothing", "Better sleep", "More exercise", "Less screen time"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of curd?",
    options: ["Lemon", "Lime", "Coconut", "Passion fruit"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most ambitious?",
    options: ["Achieve dreams", "Stay humble", "Inspire others", "Help others succeed"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of custard?",
    options: ["Vanilla", "Chocolate", "Fruit", "Spiced"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their environment?",
    options: ["Nothing", "Cleaner", "Greener", "Quieter"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pudding?",
    options: ["Chocolate", "Vanilla", "Bread", "Rice"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most grateful?",
    options: ["Express thanks", "Stay humble", "Share gratitude", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of mousse?",
    options: ["Chocolate", "Fruit", "Coffee", "Lemon"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their community?",
    options: ["Nothing", "More connection", "More safety", "More support"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of parfait?",
    options: ["Yogurt", "Fruit", "Granola", "Chocolate"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most optimistic?",
    options: ["Spread hope", "Stay realistic", "Inspire others", "Stay positive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of trifle?",
    options: ["Classic", "Chocolate", "Fruit", "Boozy"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their country?",
    options: ["Nothing", "Better leadership", "More unity", "Less corruption"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of creme brulee?",
    options: ["Classic", "Chocolate", "Fruit", "Coffee"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most resilient?",
    options: ["Overcome challenges", "Stay humble", "Inspire others", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of panna cotta?",
    options: ["Vanilla", "Fruit", "Coffee", "Chocolate"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about the world economy?",
    options: ["Nothing", "More equality", "Less poverty", "Better distribution"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of creme caramel?",
    options: ["Classic", "Coffee", "Fruit", "Spiced"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most adaptable?",
    options: ["Adjust easily", "Stay true", "Help others adapt", "Lead change"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of souffle?",
    options: ["Chocolate", "Cheese", "Fruit", "Savory"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about education?",
    options: ["Nothing", "More practical", "More accessible", "More creative"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of meringue?",
    options: ["Classic", "Italian", "Swiss", "French"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most reliable?",
    options: ["Keep promises", "Stay humble", "Help others", "Lead by example"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pavlova?",
    options: ["Classic", "Fruit", "Chocolate", "Passion fruit"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about healthcare?",
    options: ["Nothing", "More accessible", "More affordable", "Better quality"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of macaron?",
    options: ["Vanilla", "Chocolate", "Fruit", "Rose"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most trustworthy?",
    options: ["Keep secrets", "Stay honest", "Help others", "Build trust"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of eclairs?",
    options: ["Chocolate", "Coffee", "Fruit", "Vanilla"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about transportation?",
    options: ["Nothing", "Faster", "Greener", "More accessible"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of profiteroles?",
    options: ["Chocolate", "Caramel", "Fruit", "Coffee"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most loyal?",
    options: ["Stay true", "Support others", "Stay humble", "Build bonds"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cannoli?",
    options: ["Classic", "Chocolate", "Pistachio", "Fruit"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about communication?",
    options: ["Nothing", "More honest", "More kind", "More understanding"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of baklava?",
    options: ["Classic", "Pistachio", "Walnut", "Honey"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most generous?",
    options: ["Give freely", "Stay humble", "Inspire giving", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of tiramisu?",
    options: ["Classic", "Fruit", "Chocolate", "Coffee"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about entertainment?",
    options: ["Nothing", "More variety", "More quality", "More accessible"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of cheesecake?",
    options: ["New York", "Fruit", "Chocolate", "No-bake"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most compassionate?",
    options: ["Help everyone", "Stay humble", "Inspire compassion", "Share love"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of brownie?",
    options: ["Fudgy", "Cakey", "With nuts", "With frosting"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about social media?",
    options: ["Nothing", "Less toxic", "More authentic", "More connection"],
    correctIndex: 1,
  },
  {
    text: "What is {name}'s favorite type of cookie dough?",
    options: ["Chocolate chip", "Oreo", "Sugar", "Peanut butter"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most peaceful?",
    options: ["Spread peace", "Stay calm", "Inspire peace", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of fudge?",
    options: ["Chocolate", "Walnut", "Peanut butter", "Marshmallow"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about work-life balance?",
    options: ["Nothing", "More balance", "Flexible hours", "Remote work"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of toffee?",
    options: ["Butter", "Chocolate", "Nut", "Fruit"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most joyful?",
    options: ["Spread joy", "Stay humble", "Inspire joy", "Celebrate life"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of brittle?",
    options: ["Peanut", "Almond", "Sesame", "Coconut"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about personal growth?",
    options: ["Nothing", "More learning", "More growth", "More wisdom"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of praline?",
    options: ["Pecan", "Almond", "Hazelnut", "Walnut"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most confident?",
    options: ["Stay humble", "Inspire confidence", "Help others", "Lead boldly"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of nougat?",
    options: ["Classic", "Fruit", "Nut", "Chocolate"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about spirituality?",
    options: ["Nothing", "More peace", "More understanding", "More connection"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of marzipan?",
    options: ["Classic", "Chocolate", "Fruit", "Rose"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most authentic?",
    options: ["Stay true", "Inspire authenticity", "Help others", "Be real"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of fondant?",
    options: ["Classic", "Chocolate", "Fruit", "Flavored"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about creativity?",
    options: ["Nothing", "More expression", "More freedom", "More appreciation"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of ganache?",
    options: ["Dark chocolate", "Milk chocolate", "White chocolate", "Flavored"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most passionate?",
    options: ["Pursue dreams", "Stay humble", "Inspire passion", "Share enthusiasm"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of buttercream?",
    options: ["Classic", "Swiss", "Italian", "French"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about adventure?",
    options: ["Nothing", "More travel", "More excitement", "More discovery"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of royal icing?",
    options: ["Classic", "Flavored", "Colored", "Textured"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most adventurous?",
    options: ["Explore everything", "Stay safe", "Inspire adventure", "Share discoveries"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of glaze for donuts?",
    options: ["Chocolate", "Vanilla", "Strawberry", "Maple"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about relaxation?",
    options: ["Nothing", "More time", "Better quality", "More methods"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of filling for pastries?",
    options: ["Cream", "Fruit", "Chocolate", "Cheese"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most curious?",
    options: ["Learn everything", "Stay humble", "Inspire curiosity", "Share knowledge"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of topping for ice cream?",
    options: ["Sprinkles", "Nuts", "Fruit", "Sauce"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about celebration?",
    options: ["Nothing", "More frequent", "More meaningful", "More inclusive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of crust for pie?",
    options: ["Flaky", "Graham cracker", "Oreo", "Nut"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most enthusiastic?",
    options: ["Spread energy", "Stay grounded", "Inspire enthusiasm", "Share excitement"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of crust for pizza?",
    options: ["Thin", "Thick", "Stuffed", "Cauliflower"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about tradition?",
    options: ["Nothing", "More meaningful", "More flexible", "More inclusive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of bread for sandwich?",
    options: ["White", "Whole wheat", "Sourdough", "Multigrain"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being the most supportive?",
    options: ["Support everyone", "Stay humble", "Inspire support", "Be there for others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pasta for salad?",
    options: ["Penne", "Rotini", "Fusilli", "Farfalle"],
    correctIndex: 1,
  },
  {
    text: "What would {name} do if they could change one thing about innovation?",
    options: ["Nothing", "More breakthroughs", "More accessibility", "More impact"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of rice for dishes?",
    options: ["Basmati", "Jasmine", "Brown", "Arborio"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most understanding?",
    options: ["Understand everyone", "Stay humble", "Inspire understanding", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of noodle for soup?",
    options: ["Egg", "Rice", "Udon", "Soba"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about progress?",
    options: ["Nothing", "Faster", "Better quality", "More inclusive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of potato for cooking?",
    options: ["Russet", "Yukon Gold", "Red", "Sweet"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being the most empathetic?",
    options: ["Feel for everyone", "Stay balanced", "Inspire empathy", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of onion for cooking?",
    options: ["Yellow", "Red", "White", "Sweet"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about connection?",
    options: ["Nothing", "More meaningful", "More frequent", "More genuine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pepper for cooking?",
    options: ["Bell", "Jalapeno", "Serrano", "Habanero"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most sincere?",
    options: ["Be honest", "Stay humble", "Inspire sincerity", "Build trust"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of mushroom for cooking?",
    options: ["Button", "Portobello", "Shiitake", "Oyster"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about trust?",
    options: ["Nothing", "More trust", "Less betrayal", "More honesty"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of herb for cooking?",
    options: ["Basil", "Parsley", "Cilantro", "Rosemary"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most genuine?",
    options: ["Be real", "Stay humble", "Inspire authenticity", "Build connections"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of spice for cooking?",
    options: ["Salt", "Pepper", "Cumin", "Paprika"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about love?",
    options: ["Nothing", "More love", "More understanding", "More compassion"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of oil for cooking?",
    options: ["Olive", "Vegetable", "Canola", "Coconut"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most thoughtful?",
    options: ["Think of everyone", "Stay humble", "Inspire thoughtfulness", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of vinegar for cooking?",
    options: ["Balsamic", "Apple cider", "White", "Rice"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about friendship?",
    options: ["Nothing", "More meaningful", "More lasting", "More supportive"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of sweetener for cooking?",
    options: ["Sugar", "Honey", "Maple syrup", "Agave"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most considerate?",
    options: ["Consider everyone", "Stay humble", "Inspire consideration", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of flour for baking?",
    options: ["All-purpose", "Bread", "Cake", "Pastry"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about family?",
    options: ["Nothing", "More time", "More love", "More understanding"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of leavening agent?",
    options: ["Baking powder", "Baking soda", "Yeast", "None"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most caring?",
    options: ["Care for everyone", "Stay humble", "Inspire caring", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of fat for baking?",
    options: ["Butter", "Oil", "Shortening", "Coconut oil"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about community?",
    options: ["Nothing", "More connection", "More support", "More unity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of egg for cooking?",
    options: ["Chicken", "Duck", "Quail", "None"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most nurturing?",
    options: ["Nurture everyone", "Stay humble", "Inspire nurturing", "Help others grow"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of dairy product?",
    options: ["Milk", "Cheese", "Yogurt", "Butter"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about society?",
    options: ["Nothing", "More kindness", "Less judgment", "More acceptance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of meat for cooking?",
    options: ["Chicken", "Beef", "Pork", "Lamb"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most encouraging?",
    options: ["Encourage everyone", "Stay humble", "Inspire encouragement", "Help others succeed"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seafood for cooking?",
    options: ["Fish", "Shrimp", "Crab", "Lobster"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about the world?",
    options: ["Nothing", "More peace", "More love", "More understanding"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of vegetable for cooking?",
    options: ["Broccoli", "Carrot", "Spinach", "Bell pepper"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most inspiring?",
    options: ["Inspire everyone", "Stay humble", "Share inspiration", "Help others grow"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of fruit for cooking?",
    options: ["Apple", "Berry", "Citrus", "Stone fruit"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about humanity?",
    options: ["Nothing", "More compassion", "Less hate", "More love"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of nut for cooking?",
    options: ["Almond", "Walnut", "Pecan", "Cashew"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most motivating?",
    options: ["Motivate everyone", "Stay humble", "Share motivation", "Help others succeed"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seed for cooking?",
    options: ["Sunflower", "Pumpkin", "Sesame", "Chia"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about life?",
    options: ["Nothing", "More meaning", "More joy", "More purpose"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of grain for cooking?",
    options: ["Rice", "Wheat", "Quinoa", "Oats"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most uplifting?",
    options: ["Uplift everyone", "Stay humble", "Share positivity", "Help others rise"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of legume for cooking?",
    options: ["Lentils", "Chickpeas", "Beans", "Peas"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about themselves?",
    options: ["Nothing", "More confidence", "More peace", "More love"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of bean for cooking?",
    options: ["Black", "Kidney", "Pinto", "Navy"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most positive?",
    options: ["Stay positive", "Inspire positivity", "Share optimism", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of pea for cooking?",
    options: ["Green", "Split", "Snow", "Sugar snap"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their future?",
    options: ["Nothing", "More certainty", "More adventure", "More peace"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of lentil for cooking?",
    options: ["Green", "Red", "Brown", "Black"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most hopeful?",
    options: ["Stay hopeful", "Inspire hope", "Share optimism", "Help others believe"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of chickpea for cooking?",
    options: ["Garbanzo", "Desi", "Kabuli", "Green"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their past?",
    options: ["Nothing", "Learn from it", "Accept it", "Cherish it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of soy product?",
    options: ["Tofu", "Tempeh", "Edamame", "Soy milk"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most faithful?",
    options: ["Stay faithful", "Inspire faith", "Build trust", "Support others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of seitan?",
    options: ["Classic", "Smoked", "Spiced", "Herbed"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their present?",
    options: ["Nothing", "More joy", "More peace", "More gratitude"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based milk?",
    options: ["Almond", "Soy", "Oat", "Coconut"],
    correctIndex: 2,
  },
  {
    text: "How does {name} handle being the most devoted?",
    options: ["Stay devoted", "Inspire devotion", "Build commitment", "Support others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cheese?",
    options: ["Cashew", "Almond", "Coconut", "Soy"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their dreams?",
    options: ["Nothing", "Pursue them", "Make them real", "Share them"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based yogurt?",
    options: ["Coconut", "Almond", "Soy", "Oat"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most committed?",
    options: ["Stay committed", "Inspire commitment", "Build trust", "Support others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based meat?",
    options: ["Beyond", "Impossible", "Tofu-based", "Seitan"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their goals?",
    options: ["Nothing", "Achieve them", "Set higher", "Share them"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based egg?",
    options: ["Flax", "Chia", "Aquafaba", "Commercial"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most dedicated?",
    options: ["Stay dedicated", "Inspire dedication", "Build commitment", "Support others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based butter?",
    options: ["Coconut", "Olive oil", "Nut-based", "Seed-based"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their aspirations?",
    options: ["Nothing", "Pursue them", "Achieve them", "Inspire others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cream?",
    options: ["Coconut", "Cashew", "Oat", "Soy"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most passionate about their interests?",
    options: ["Pursue passions", "Stay humble", "Inspire others", "Share knowledge"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based milk for coffee?",
    options: ["Oat", "Almond", "Soy", "Coconut"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their hobbies?",
    options: ["Nothing", "More time", "More variety", "More mastery"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based protein?",
    options: ["Tofu", "Tempeh", "Seitan", "Legumes"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most enthusiastic about life?",
    options: ["Live enthusiastically", "Stay humble", "Inspire others", "Share joy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based snack?",
    options: ["Nuts", "Fruit", "Energy bars", "Veggie chips"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their skills?",
    options: ["Nothing", "Learn more", "Master them", "Teach them"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based dessert?",
    options: ["Fruit-based", "Nut-based", "Coconut-based", "Chocolate"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most excited about new experiences?",
    options: ["Embrace them", "Stay humble", "Share excitement", "Inspire others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based meal?",
    options: ["Buddha bowl", "Stir-fry", "Curry", "Salad"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their talents?",
    options: ["Nothing", "Develop them", "Share them", "Use them wisely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based breakfast?",
    options: ["Smoothie bowl", "Overnight oats", "Tofu scramble", "Avocado toast"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most curious about the world?",
    options: ["Explore everything", "Stay humble", "Share discoveries", "Inspire curiosity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lunch?",
    options: ["Salad", "Wrap", "Bowl", "Sandwich"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their abilities?",
    options: ["Nothing", "Improve them", "Add new ones", "Share them"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based dinner?",
    options: ["Pasta", "Curry", "Stir-fry", "Bowl"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most interested in learning?",
    options: ["Learn everything", "Stay humble", "Share knowledge", "Inspire learning"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based comfort food?",
    options: ["Mac and cheese", "Pizza", "Burger", "Fried chicken"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their potential?",
    options: ["Nothing", "Realize it", "Maximize it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based party food?",
    options: ["Dips", "Skewers", "Sliders", "Tacos"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most eager to grow?",
    options: ["Grow constantly", "Stay humble", "Inspire growth", "Help others grow"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based holiday food?",
    options: ["Roast", "Stuffing", "Pie", "Cookies"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their purpose?",
    options: ["Nothing", "Find it", "Live it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based festival food?",
    options: ["Street food", "Fair food", "Traditional", "Modern"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most driven to succeed?",
    options: ["Succeed with purpose", "Stay humble", "Inspire success", "Help others succeed"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based street food?",
    options: ["Tacos", "Noodles", "Falafel", "Burger"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their legacy?",
    options: ["Nothing", "Build it", "Leave a good one", "Inspire others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based fast food?",
    options: ["Burger", "Pizza", "Tacos", "Sandwich"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most motivated to help?",
    options: ["Help everyone", "Stay humble", "Inspire helping", "Support others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based fine dining?",
    options: ["Tasting menu", "A la carte", "Chef's table", "Omakase"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their impact?",
    options: ["Nothing", "Increase it", "Make it positive", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based casual dining?",
    options: ["Cafe", "Bistro", "Diner", "Food truck"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most inspired to create?",
    options: ["Create constantly", "Stay humble", "Inspire creation", "Share creations"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based ethnic cuisine?",
    options: ["Indian", "Thai", "Mexican", "Italian"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their influence?",
    options: ["Nothing", "Use it wisely", "Increase it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based fusion cuisine?",
    options: ["Asian-Mexican", "Italian-Indian", "Mediterranean-Asian", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most encouraged to try new things?",
    options: ["Try everything", "Stay safe", "Inspire others", "Share experiences"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based traditional cuisine?",
    options: ["Mediterranean", "Asian", "Indian", "Latin American"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their journey?",
    options: ["Nothing", "Enjoy it more", "Learn from it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based modern cuisine?",
    options: ["Molecular", "Farm-to-table", "Fusion", "Minimalist"],
    correctIndex: 1,
  },
  {
    text: "How does {name} handle being the most excited about life's possibilities?",
    options: ["Explore all possibilities", "Stay grounded", "Inspire others", "Share excitement"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based comfort cuisine?",
    options: ["Home-style", "Soul food", "Nostalgic", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their path?",
    options: ["Nothing", "Stay on it", "Adjust it", "Enjoy it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based innovative cuisine?",
    options: ["Lab-grown", "3D printed", "AI-created", "Sustainable"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most grateful for life?",
    options: ["Express gratitude daily", "Stay humble", "Inspire gratitude", "Share blessings"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based sustainable cuisine?",
    options: ["Zero waste", "Local", "Seasonal", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their destiny?",
    options: ["Nothing", "Believe in it", "Create it", "Embrace it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based ethical cuisine?",
    options: ["Vegan", "Cruelty-free", "Fair trade", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most blessed in life?",
    options: ["Count blessings", "Stay humble", "Share blessings", "Help others"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based conscious cuisine?",
    options: ["Mindful", "Intentional", "Aware", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their calling?",
    options: ["Nothing", "Follow it", "Find it", "Live it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based mindful cuisine?",
    options: ["Meditative", "Intentional", "Present", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most fulfilled in life?",
    options: ["Live fully", "Stay humble", "Inspire fulfillment", "Help others find it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based intentional cuisine?",
    options: ["Purposeful", "Meaningful", "Deliberate", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their mission?",
    options: ["Nothing", "Pursue it", "Complete it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based purposeful cuisine?",
    options: ["Mission-driven", "Value-based", "Impact-focused", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most aligned in life?",
    options: ["Stay aligned", "Stay humble", "Inspire alignment", "Help others align"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based value-based cuisine?",
    options: ["Ethical", "Sustainable", "Conscious", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their vision?",
    options: ["Nothing", "See it clearly", "Live it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based impact-focused cuisine?",
    options: ["Community", "Environment", "Health", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most centered in life?",
    options: ["Stay centered", "Stay humble", "Inspire centeredness", "Help others find center"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based community-focused cuisine?",
    options: ["Local", "Shared", "Collaborative", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their balance?",
    options: ["Nothing", "Find it", "Maintain it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based environment-focused cuisine?",
    options: ["Sustainable", "Zero waste", "Local", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most grounded in life?",
    options: ["Stay grounded", "Stay humble", "Inspire groundedness", "Help others ground"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based health-focused cuisine?",
    options: ["Nutrient-dense", "Balanced", "Healing", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their harmony?",
    options: ["Nothing", "Find it", "Create it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based wellness-focused cuisine?",
    options: ["Nourishing", "Healing", "Balancing", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most peaceful in life?",
    options: ["Stay peaceful", "Stay humble", "Inspire peace", "Help others find peace"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based joy-focused cuisine?",
    options: ["Celebratory", "Fun", "Delightful", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their serenity?",
    options: ["Nothing", "Find it", "Maintain it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based love-focused cuisine?",
    options: ["Made with love", "Shared with love", "Celebrates love", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most content in life?",
    options: ["Stay content", "Stay humble", "Inspire contentment", "Help others find contentment"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based connection-focused cuisine?",
    options: ["Shared meals", "Community", "Family", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their happiness?",
    options: ["Nothing", "Find it", "Create it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based celebration-focused cuisine?",
    options: ["Festive", "Joyful", "Memorable", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most joyful in life?",
    options: ["Stay joyful", "Stay humble", "Inspire joy", "Help others find joy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gratitude-focused cuisine?",
    options: ["Thankful", "Appreciative", "Blessed", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bliss?",
    options: ["Nothing", "Find it", "Live it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based mindfulness-focused cuisine?",
    options: ["Present", "Aware", "Intentional", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most blissful in life?",
    options: ["Stay blissful", "Stay humble", "Inspire bliss", "Help others find bliss"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based presence-focused cuisine?",
    options: ["In the moment", "Mindful", "Aware", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their enlightenment?",
    options: ["Nothing", "Seek it", "Find it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based awareness-focused cuisine?",
    options: ["Conscious", "Mindful", "Awake", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most enlightened in life?",
    options: ["Stay enlightened", "Stay humble", "Inspire enlightenment", "Help others find enlightenment"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based awakening-focused cuisine?",
    options: ["Transformative", "Elevating", "Expanding", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their transcendence?",
    options: ["Nothing", "Experience it", "Embrace it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based transformation-focused cuisine?",
    options: ["Life-changing", "Growth-oriented", "Evolving", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most transcendent in life?",
    options: ["Stay transcendent", "Stay humble", "Inspire transcendence", "Help others transcend"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based evolution-focused cuisine?",
    options: ["Growing", "Changing", "Becoming", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their infinity?",
    options: ["Nothing", "Embrace it", "Live it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based eternity-focused cuisine?",
    options: ["Timeless", "Infinite", "Eternal", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most infinite in spirit?",
    options: ["Stay infinite", "Stay humble", "Inspire infinity", "Help others find infinity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based universe-focused cuisine?",
    options: ["Cosmic", "Universal", "Galactic", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their cosmos?",
    options: ["Nothing", "Explore it", "Understand it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cosmic-focused cuisine?",
    options: ["Stellar", "Planetary", "Universal", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most cosmic in spirit?",
    options: ["Stay cosmic", "Stay humble", "Inspire cosmos", "Help others find cosmos"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based stellar-focused cuisine?",
    options: ["Star-like", "Bright", "Radiant", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their galaxy?",
    options: ["Nothing", "Explore it", "Understand it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based planetary-focused cuisine?",
    options: ["Earth-focused", "Mars-focused", "Venus-focused", "All planets"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most planetary in spirit?",
    options: ["Stay grounded", "Stay humble", "Inspire grounding", "Help others ground"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based solar-focused cuisine?",
    options: ["Sun-powered", "Light-filled", "Warm", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their solar system?",
    options: ["Nothing", "Explore it", "Understand it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lunar-focused cuisine?",
    options: ["Moon-inspired", "Cyclical", "Mystical", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most lunar in spirit?",
    options: ["Stay cyclical", "Stay humble", "Inspire cycles", "Help others find rhythm"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based stellar-remnant-focused cuisine?",
    options: ["Neutron star", "Black hole", "White dwarf", "Supernova"],
    correctIndex: 0,
  },
  {
    text: "What would {name} do if they could change one thing about their constellation?",
    options: ["Nothing", "Follow it", "Understand it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nebula-focused cuisine?",
    options: ["Colorful", "Mysterious", "Beautiful", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most nebulous in spirit?",
    options: ["Stay mysterious", "Stay humble", "Inspire wonder", "Help others wonder"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based galaxy-cluster-focused cuisine?",
    options: ["Massive", "Connected", "Gravitational", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their universe?",
    options: ["Nothing", "Understand it", "Explore it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based multiverse-focused cuisine?",
    options: ["Parallel", "Infinite", "Connected", "All of the above"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most multiversal in spirit?",
    options: ["Stay infinite", "Stay humble", "Inspire infinity", "Help others find infinity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based dimension-focused cuisine?",
    options: ["3D", "4D", "5D", "All dimensions"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their reality?",
    options: ["Nothing", "Understand it", "Shape it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based quantum-focused cuisine?",
    options: ["Entangled", "Superposed", "Uncertain", "All quantum"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most quantum in spirit?",
    options: ["Stay entangled", "Stay humble", "Inspire connection", "Help others connect"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based relativity-focused cuisine?",
    options: ["Relative", "Time-bending", "Space-warping", "All relative"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their existence?",
    options: ["Nothing", "Understand it", "Embrace it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based consciousness-focused cuisine?",
    options: ["Aware", "Awake", "Lucid", "All conscious"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most conscious in spirit?",
    options: ["Stay awake", "Stay humble", "Inspire awareness", "Help others awaken"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based perception-focused cuisine?",
    options: ["Clear", "Sharp", "Insightful", "All perceptive"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their awareness?",
    options: ["Nothing", "Expand it", "Deepen it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based intuition-focused cuisine?",
    options: ["Intuitive", "Instinctive", "Gut-feeling", "All intuitive"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most intuitive in spirit?",
    options: ["Trust intuition", "Stay humble", "Inspire intuition", "Help others trust gut"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based insight-focused cuisine?",
    options: ["Deep", "Profound", "Transformative", "All insightful"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their wisdom?",
    options: ["Nothing", "Seek it", "Find it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based understanding-focused cuisine?",
    options: ["Deep", "Comprehensive", "Empathic", "All understanding"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most understanding in spirit?",
    options: ["Understand all", "Stay humble", "Inspire understanding", "Help others understand"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based compassion-focused cuisine?",
    options: ["Compassionate", "Kind", "Loving", "All compassionate"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their love?",
    options: ["Nothing", "Deepen it", "Expand it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based kindness-focused cuisine?",
    options: ["Kind", "Gentle", "Caring", "All kind"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most kind in spirit?",
    options: ["Be kind always", "Stay humble", "Inspire kindness", "Help others be kind"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gentleness-focused cuisine?",
    options: ["Gentle", "Soft", "Tender", "All gentle"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their tenderness?",
    options: ["Nothing", "Embrace it", "Express it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based caring-focused cuisine?",
    options: ["Caring", "Nurturing", "Supportive", "All caring"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most caring in spirit?",
    options: ["Care for all", "Stay humble", "Inspire caring", "Help others care"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nurturing-focused cuisine?",
    options: ["Nurturing", "Growth-oriented", "Supportive", "All nurturing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their support?",
    options: ["Nothing", "Give it", "Receive it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based supportive-focused cuisine?",
    options: ["Supportive", "Encouraging", "Uplifting", "All supportive"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most supportive in spirit?",
    options: ["Support all", "Stay humble", "Inspire support", "Help others support"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based encouraging-focused cuisine?",
    options: ["Encouraging", "Motivating", "Inspiring", "All encouraging"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their encouragement?",
    options: ["Nothing", "Give it", "Receive it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based uplifting-focused cuisine?",
    options: ["Uplifting", "Elevating", "Raising", "All uplifting"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most uplifting in spirit?",
    options: ["Uplift all", "Stay humble", "Inspire uplift", "Help others uplift"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based elevating-focused cuisine?",
    options: ["Elevating", "Raising", "Ascending", "All elevating"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their elevation?",
    options: ["Nothing", "Seek it", "Find it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based raising-focused cuisine?",
    options: ["Raising", "Lifting", "Growing", "All raising"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most raised in spirit?",
    options: ["Stay raised", "Stay humble", "Inspire raising", "Help others rise"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based growing-focused cuisine?",
    options: ["Growing", "Evolving", "Expanding", "All growing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their growth?",
    options: ["Nothing", "Embrace it", "Accelerate it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based evolving-focused cuisine?",
    options: ["Evolving", "Changing", "Becoming", "All evolving"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most evolved in spirit?",
    options: ["Stay evolved", "Stay humble", "Inspire evolution", "Help others evolve"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based becoming-focused cuisine?",
    options: ["Becoming", "Transforming", "Changing", "All becoming"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their becoming?",
    options: ["Nothing", "Embrace it", "Accelerate it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based transforming-focused cuisine?",
    options: ["Transforming", "Changing", "Evolving", "All transforming"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most transformed in spirit?",
    options: ["Stay transformed", "Stay humble", "Inspire transformation", "Help others transform"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based changing-focused cuisine?",
    options: ["Changing", "Adapting", "Flowing", "All changing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their change?",
    options: ["Nothing", "Embrace it", "Direct it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based adapting-focused cuisine?",
    options: ["Adapting", "Adjusting", "Flexing", "All adapting"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most adaptable in spirit?",
    options: ["Stay adaptable", "Stay humble", "Inspire adaptation", "Help others adapt"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based adjusting-focused cuisine?",
    options: ["Adjusting", "Calibrating", "Tuning", "All adjusting"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their adjustment?",
    options: ["Nothing", "Make it", "Accept it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based flexing-focused cuisine?",
    options: ["Flexing", "Bending", "Yielding", "All flexing"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most flexible in spirit?",
    options: ["Stay flexible", "Stay humble", "Inspire flexibility", "Help others be flexible"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bending-focused cuisine?",
    options: ["Bending", "Yielding", "Flowing", "All bending"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bending?",
    options: ["Nothing", "Embrace it", "Direct it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based yielding-focused cuisine?",
    options: ["Yielding", "Surrendering", "Accepting", "All yielding"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most yielding in spirit?",
    options: ["Yield wisely", "Stay humble", "Inspire yielding", "Help others yield wisely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based surrendering-focused cuisine?",
    options: ["Surrendering", "Letting go", "Releasing", "All surrendering"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their surrender?",
    options: ["Nothing", "Embrace it", "Practice it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based releasing-focused cuisine?",
    options: ["Releasing", "Letting go", "Freeing", "All releasing"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most released in spirit?",
    options: ["Stay released", "Stay humble", "Inspire release", "Help others release"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based freeing-focused cuisine?",
    options: ["Freeing", "Liberating", "Unbinding", "All freeing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their freedom?",
    options: ["Nothing", "Embrace it", "Protect it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based liberating-focused cuisine?",
    options: ["Liberating", "Freeing", "Unshackling", "All liberating"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most liberated in spirit?",
    options: ["Stay liberated", "Stay humble", "Inspire liberation", "Help others liberate"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based unshackling-focused cuisine?",
    options: ["Unshackling", "Unbinding", "Unchaining", "All unshackling"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their shackles?",
    options: ["Nothing", "Break them", "Release them", "Share freedom"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based unbinding-focused cuisine?",
    options: ["Unbinding", "Untying", "Unleashing", "All unbinding"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most unbound in spirit?",
    options: ["Stay unbound", "Stay humble", "Inspire freedom", "Help others unbind"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based unleashing-focused cuisine?",
    options: ["Unleashing", "Releasing", "Expressing", "All unleashing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their leash?",
    options: ["Nothing", "Remove it", "Break it", "Share freedom"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based expressing-focused cuisine?",
    options: ["Expressing", "Sharing", "Communicating", "All expressing"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most expressive in spirit?",
    options: ["Express freely", "Stay humble", "Inspire expression", "Help others express"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based sharing-focused cuisine?",
    options: ["Sharing", "Giving", "Contributing", "All sharing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their sharing?",
    options: ["Nothing", "Share more", "Share wisely", "Share freely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based giving-focused cuisine?",
    options: ["Giving", "Contributing", "Offering", "All giving"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most giving in spirit?",
    options: ["Give freely", "Stay humble", "Inspire giving", "Help others give"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based contributing-focused cuisine?",
    options: ["Contributing", "Adding", "Enhancing", "All contributing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their contribution?",
    options: ["Nothing", "Contribute more", "Contribute wisely", "Contribute freely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based adding-focused cuisine?",
    options: ["Adding", "Enhancing", "Improving", "All adding"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most additive in spirit?",
    options: ["Add value", "Stay humble", "Inspire addition", "Help others add value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based enhancing-focused cuisine?",
    options: ["Enhancing", "Improving", "Elevating", "All enhancing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their enhancement?",
    options: ["Nothing", "Enhance more", "Enhance wisely", "Enhance freely"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based improving-focused cuisine?",
    options: ["Improving", "Bettering", "Upgrading", "All improving"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most improved in spirit?",
    options: ["Keep improving", "Stay humble", "Inspire improvement", "Help others improve"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bettering-focused cuisine?",
    options: ["Bettering", "Improving", "Upgrading", "All bettering"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their betterment?",
    options: ["Nothing", "Seek it", "Find it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based upgrading-focused cuisine?",
    options: ["Upgrading", "Elevating", "Advancing", "All upgrading"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most upgraded in spirit?",
    options: ["Keep upgrading", "Stay humble", "Inspire upgrade", "Help others upgrade"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based elevating-focused cuisine?",
    options: ["Elevating", "Raising", "Lifting", "All elevating"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their elevation?",
    options: ["Nothing", "Seek it", "Find it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based raising-focused cuisine?",
    options: ["Raising", "Lifting", "Elevating", "All raising"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most raised in spirit?",
    options: ["Stay raised", "Stay humble", "Inspire raising", "Help others rise"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lifting-focused cuisine?",
    options: ["Lifting", "Raising", "Elevating", "All lifting"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their lifting?",
    options: ["Nothing", "Lift others", "Lift self", "Share lifting"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based advancing-focused cuisine?",
    options: ["Advancing", "Progressing", "Moving forward", "All advancing"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most advanced in spirit?",
    options: ["Keep advancing", "Stay humble", "Inspire progress", "Help others advance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based progressing-focused cuisine?",
    options: ["Progressing", "Moving forward", "Advancing", "All progressing"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their progress?",
    options: ["Nothing", "Make progress", "Celebrate progress", "Share progress"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based moving-forward-focused cuisine?",
    options: ["Moving forward", "Advancing", "Progressing", "All moving forward"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most forward-moving in spirit?",
    options: ["Move forward", "Stay humble", "Inspire progress", "Help others move forward"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based momentum-focused cuisine?",
    options: ["Momentum", "Energy", "Drive", "All momentum"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their momentum?",
    options: ["Nothing", "Build it", "Maintain it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based energy-focused cuisine?",
    options: ["Energy", "Vitality", "Vigor", "All energy"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most energetic in spirit?",
    options: ["Stay energetic", "Stay humble", "Inspire energy", "Help others energize"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based vitality-focused cuisine?",
    options: ["Vitality", "Life force", "Prana", "All vitality"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their vitality?",
    options: ["Nothing", "Boost it", "Maintain it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based vigor-focused cuisine?",
    options: ["Vigor", "Strength", "Power", "All vigor"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most vigorous in spirit?",
    options: ["Stay vigorous", "Stay humble", "Inspire vigor", "Help others vitalize"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based strength-focused cuisine?",
    options: ["Strength", "Power", "Force", "All strength"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their strength?",
    options: ["Nothing", "Build it", "Use it wisely", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based power-focused cuisine?",
    options: ["Power", "Strength", "Authority", "All power"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most powerful in spirit?",
    options: ["Use power wisely", "Stay humble", "Inspire power", "Help others empower"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based force-focused cuisine?",
    options: ["Force", "Power", "Strength", "All force"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their force?",
    options: ["Nothing", "Use it wisely", "Channel it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based authority-focused cuisine?",
    options: ["Authority", "Leadership", "Influence", "All authority"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most authoritative in spirit?",
    options: ["Lead wisely", "Stay humble", "Inspire leadership", "Help others lead"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based leadership-focused cuisine?",
    options: ["Leadership", "Guidance", "Direction", "All leadership"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their leadership?",
    options: ["Nothing", "Lead well", "Serve others", "Share wisdom"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based guidance-focused cuisine?",
    options: ["Guidance", "Direction", "Wisdom", "All guidance"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most guiding in spirit?",
    options: ["Guide wisely", "Stay humble", "Inspire guidance", "Help others find their way"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based direction-focused cuisine?",
    options: ["Direction", "Path", "Way", "All direction"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their direction?",
    options: ["Nothing", "Find it", "Follow it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based path-focused cuisine?",
    options: ["Path", "Way", "Journey", "All path"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most path-focused in spirit?",
    options: ["Stay on path", "Stay humble", "Inspire path", "Help others find their path"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based way-focused cuisine?",
    options: ["Way", "Path", "Journey", "All way"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their way?",
    options: ["Nothing", "Find it", "Follow it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based journey-focused cuisine?",
    options: ["Journey", "Path", "Way", "All journey"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most journey-focused in spirit?",
    options: ["Enjoy journey", "Stay humble", "Inspire journey", "Help others on their journey"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based destination-focused cuisine?",
    options: ["Destination", "Goal", "Target", "All destination"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their destination?",
    options: ["Nothing", "Reach it", "Enjoy it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based goal-focused cuisine?",
    options: ["Goal", "Target", "Objective", "All goal"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most goal-focused in spirit?",
    options: ["Achieve goals", "Stay humble", "Inspire goals", "Help others achieve"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based target-focused cuisine?",
    options: ["Target", "Goal", "Objective", "All target"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their target?",
    options: ["Nothing", "Hit it", "Aim high", "Share success"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based objective-focused cuisine?",
    options: ["Objective", "Goal", "Target", "All objective"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most objective-focused in spirit?",
    options: ["Stay objective", "Stay humble", "Inspire objectivity", "Help others stay objective"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based purpose-focused cuisine?",
    options: ["Purpose", "Meaning", "Reason", "All purpose"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their purpose?",
    options: ["Nothing", "Find it", "Live it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based meaning-focused cuisine?",
    options: ["Meaning", "Purpose", "Significance", "All meaning"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most meaning-focused in spirit?",
    options: ["Find meaning", "Stay humble", "Inspire meaning", "Help others find meaning"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based significance-focused cuisine?",
    options: ["Significance", "Meaning", "Importance", "All significance"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their significance?",
    options: ["Nothing", "Recognize it", "Embrace it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based importance-focused cuisine?",
    options: ["Importance", "Significance", "Value", "All importance"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most important in spirit?",
    options: ["Stay humble", "Recognize value", "Inspire importance", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based value-focused cuisine?",
    options: ["Value", "Worth", "Significance", "All value"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their value?",
    options: ["Nothing", "Recognize it", "Increase it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based worth-focused cuisine?",
    options: ["Worth", "Value", "Significance", "All worth"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most worthy in spirit?",
    options: ["Stay worthy", "Stay humble", "Inspire worth", "Help others recognize worth"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based treasure-focused cuisine?",
    options: ["Treasure", "Value", "Worth", "All treasure"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their treasure?",
    options: ["Nothing", "Cherish it", "Protect it", "Share it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gem-focused cuisine?",
    options: ["Gem", "Jewel", "Treasure", "All gem"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most gem-like in spirit?",
    options: ["Shine bright", "Stay humble", "Inspire brilliance", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based jewel-focused cuisine?",
    options: ["Jewel", "Gem", "Treasure", "All jewel"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their jewel?",
    options: ["Nothing", "Polish it", "Protect it", "Share its brilliance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based diamond-focused cuisine?",
    options: ["Diamond", "Gem", "Jewel", "All diamond"],
    correctIndex: 0,
  },
  {
    text: "How does {name} handle being the most diamond-like in spirit?",
    options: ["Shine bright", "Stay strong", "Inspire brilliance", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gold-focused cuisine?",
    options: ["Gold", "Precious", "Valuable", "All gold"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their gold?",
    options: ["Nothing", "Cherish it", "Protect it", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based silver-focused cuisine?",
    options: ["Silver", "Precious", "Valuable", "All silver"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most silver-like in spirit?",
    options: ["Shine bright", "Stay pure", "Inspire purity", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bronze-focused cuisine?",
    options: ["Bronze", "Strong", "Durable", "All bronze"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bronze?",
    options: ["Nothing", "Polish it", "Strengthen it", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based platinum-focused cuisine?",
    options: ["Platinum", "Rare", "Precious", "All platinum"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most platinum-like in spirit?",
    options: ["Stay rare", "Stay precious", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based titanium-focused cuisine?",
    options: ["Titanium", "Strong", "Light", "All titanium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their titanium?",
    options: ["Nothing", "Strengthen it", "Lighten it", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based steel-focused cuisine?",
    options: ["Steel", "Strong", "Durable", "All steel"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most steel-like in spirit?",
    options: ["Stay strong", "Stay durable", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based iron-focused cuisine?",
    options: ["Iron", "Strong", "Essential", "All iron"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their iron?",
    options: ["Nothing", "Strengthen it", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based copper-focused cuisine?",
    options: ["Copper", "Conductive", "Essential", "All copper"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most copper-like in spirit?",
    options: ["Conduct well", "Stay essential", "Inspire conductivity", "Help others conduct"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based aluminum-focused cuisine?",
    options: ["Aluminum", "Light", "Versatile", "All aluminum"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their aluminum?",
    options: ["Nothing", "Lighten it", "Versatilize it", "Share its versatility"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based carbon-focused cuisine?",
    options: ["Carbon", "Essential", "Life-giving", "All carbon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most carbon-like in spirit?",
    options: ["Stay essential", "Stay life-giving", "Inspire life", "Help others live"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based oxygen-focused cuisine?",
    options: ["Oxygen", "Essential", "Life-giving", "All oxygen"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their oxygen?",
    options: ["Nothing", "Breathe it", "Share it", "Cherish it"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nitrogen-focused cuisine?",
    options: ["Nitrogen", "Essential", "Building block", "All nitrogen"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most nitrogen-like in spirit?",
    options: ["Stay essential", "Stay building", "Inspire growth", "Help others grow"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based hydrogen-focused cuisine?",
    options: ["Hydrogen", "Light", "Energy", "All hydrogen"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their hydrogen?",
    options: ["Nothing", "Lighten up", "Energize", "Share energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based helium-focused cuisine?",
    options: ["Helium", "Light", "Floating", "All helium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most helium-like in spirit?",
    options: ["Stay light", "Stay floating", "Inspire lightness", "Help others lighten up"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lithium-focused cuisine?",
    options: ["Lithium", "Light", "Energizing", "All lithium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their lithium?",
    options: ["Nothing", "Lighten up", "Energize", "Share energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based beryllium-focused cuisine?",
    options: ["Beryllium", "Light", "Strong", "All beryllium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most beryllium-like in spirit?",
    options: ["Stay light", "Stay strong", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based boron-focused cuisine?",
    options: ["Boron", "Essential", "Building", "All boron"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their boron?",
    options: ["Nothing", "Build with it", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based carbon-focused cuisine?",
    options: ["Carbon", "Life", "Essential", "All carbon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most carbon-based in spirit?",
    options: ["Stay alive", "Stay essential", "Inspire life", "Help others live"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nitrogen-focused cuisine?",
    options: ["Nitrogen", "Growth", "Essential", "All nitrogen"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their nitrogen?",
    options: ["Nothing", "Grow with it", "Use it wisely", "Share its growth"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based oxygen-focused cuisine?",
    options: ["Oxygen", "Life", "Breath", "All oxygen"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most oxygen-based in spirit?",
    options: ["Breathe life", "Stay alive", "Inspire life", "Help others breathe"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based fluorine-focused cuisine?",
    options: ["Fluorine", "Essential", "Protective", "All fluorine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their fluorine?",
    options: ["Nothing", "Protect with it", "Use it wisely", "Share its protection"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based neon-focused cuisine?",
    options: ["Neon", "Bright", "Shining", "All neon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most neon-like in spirit?",
    options: ["Shine bright", "Stay colorful", "Inspire brightness", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based sodium-focused cuisine?",
    options: ["Sodium", "Essential", "Balancing", "All sodium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their sodium?",
    options: ["Nothing", "Balance with it", "Use it wisely", "Share its balance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based magnesium-focused cuisine?",
    options: ["Magnesium", "Essential", "Relaxing", "All magnesium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most magnesium-like in spirit?",
    options: ["Stay relaxed", "Stay essential", "Inspire relaxation", "Help others relax"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based aluminum-focused cuisine?",
    options: ["Aluminum", "Light", "Versatile", "All aluminum"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their aluminum?",
    options: ["Nothing", "Lighten with it", "Versatilize with it", "Share its versatility"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based silicon-focused cuisine?",
    options: ["Silicon", "Tech", "Essential", "All silicon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most silicon-like in spirit?",
    options: ["Stay tech-savvy", "Stay essential", "Inspire innovation", "Help others innovate"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based phosphorus-focused cuisine?",
    options: ["Phosphorus", "Energy", "Essential", "All phosphorus"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their phosphorus?",
    options: ["Nothing", "Energize with it", "Use it wisely", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based sulfur-focused cuisine?",
    options: ["Sulfur", "Essential", "Protective", "All sulfur"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most sulfur-like in spirit?",
    options: ["Stay protective", "Stay essential", "Inspire protection", "Help others protect"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based chlorine-focused cuisine?",
    options: ["Chlorine", "Cleaning", "Essential", "All chlorine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their chlorine?",
    options: ["Nothing", "Clean with it", "Use it wisely", "Share its cleanliness"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based argon-focused cuisine?",
    options: ["Argon", "Noble", "Inert", "All argon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most argon-like in spirit?",
    options: ["Stay noble", "Stay inert", "Inspire nobility", "Help others stay noble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based potassium-focused cuisine?",
    options: ["Potassium", "Essential", "Balancing", "All potassium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their potassium?",
    options: ["Nothing", "Balance with it", "Use it wisely", "Share its balance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based calcium-focused cuisine?",
    options: ["Calcium", "Strong", "Essential", "All calcium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most calcium-like in spirit?",
    options: ["Stay strong", "Stay essential", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based scandium-focused cuisine?",
    options: ["Scandium", "Rare", "Essential", "All scandium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their scandium?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based titanium-focused cuisine?",
    options: ["Titanium", "Strong", "Light", "All titanium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most titanium-like in spirit?",
    options: ["Stay strong", "Stay light", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based vanadium-focused cuisine?",
    options: ["Vanadium", "Strong", "Essential", "All vanadium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their vanadium?",
    options: ["Nothing", "Strengthen with it", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based chromium-focused cuisine?",
    options: ["Chromium", "Shiny", "Strong", "All chromium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most chromium-like in spirit?",
    options: ["Stay shiny", "Stay strong", "Inspire brilliance", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based manganese-focused cuisine?",
    options: ["Manganese", "Essential", "Strong", "All manganese"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their manganese?",
    options: ["Nothing", "Strengthen with it", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based iron-focused cuisine?",
    options: ["Iron", "Strong", "Essential", "All iron"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most iron-like in spirit?",
    options: ["Stay strong", "Stay essential", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cobalt-focused cuisine?",
    options: ["Cobalt", "Blue", "Essential", "All cobalt"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their cobalt?",
    options: ["Nothing", "Color with it", "Use it wisely", "Share its beauty"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nickel-focused cuisine?",
    options: ["Nickel", "Strong", "Shiny", "All nickel"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most nickel-like in spirit?",
    options: ["Stay shiny", "Stay strong", "Inspire brilliance", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based copper-focused cuisine?",
    options: ["Copper", "Conductive", "Essential", "All copper"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their copper?",
    options: ["Nothing", "Conduct with it", "Use it wisely", "Share its conductivity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based zinc-focused cuisine?",
    options: ["Zinc", "Essential", "Protective", "All zinc"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most zinc-like in spirit?",
    options: ["Stay protective", "Stay essential", "Inspire protection", "Help others protect"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gallium-focused cuisine?",
    options: ["Gallium", "Melting", "Unique", "All gallium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their gallium?",
    options: ["Nothing", "Melt with it", "Embrace its uniqueness", "Share its wonder"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based germanium-focused cuisine?",
    options: ["Germanium", "Semiconductor", "Essential", "All germanium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most germanium-like in spirit?",
    options: ["Stay conductive", "Stay essential", "Inspire conductivity", "Help others conduct"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based arsenic-focused cuisine?",
    options: ["Arsenic", "Toxic", "Dangerous", "All arsenic"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their arsenic?",
    options: ["Nothing", "Avoid it", "Transform it", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based selenium-focused cuisine?",
    options: ["Selenium", "Essential", "Protective", "All selenium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most selenium-like in spirit?",
    options: ["Stay protective", "Stay essential", "Inspire protection", "Help others protect"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bromine-focused cuisine?",
    options: ["Bromine", "Liquid", "Essential", "All bromine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bromine?",
    options: ["Nothing", "Flow with it", "Use it wisely", "Share its fluidity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based krypton-focused cuisine?",
    options: ["Krypton", "Noble", "Inert", "All krypton"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most krypton-like in spirit?",
    options: ["Stay noble", "Stay inert", "Inspire nobility", "Help others stay noble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based rubidium-focused cuisine?",
    options: ["Rubidium", "Reactive", "Essential", "All rubidium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their rubidium?",
    options: ["Nothing", "React with it", "Use it wisely", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based strontium-focused cuisine?",
    options: ["Strontium", "Red", "Essential", "All strontium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most strontium-like in spirit?",
    options: ["Stay fiery", "Stay essential", "Inspire passion", "Help others ignite"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based yttrium-focused cuisine?",
    options: ["Yttrium", "Rare", "Essential", "All yttrium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their yttrium?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based zirconium-focused cuisine?",
    options: ["Zirconium", "Strong", "Essential", "All zirconium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most zirconium-like in spirit?",
    options: ["Stay strong", "Stay essential", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based niobium-focused cuisine?",
    options: ["Niobium", "Strong", "Essential", "All niobium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their niobium?",
    options: ["Nothing", "Strengthen with it", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based molybdenum-focused cuisine?",
    options: ["Molybdenum", "Strong", "Essential", "All molybdenum"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most molybdenum-like in spirit?",
    options: ["Stay strong", "Stay essential", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based technetium-focused cuisine?",
    options: ["Technetium", "Radioactive", "Artificial", "All technetium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their technetium?",
    options: ["Nothing", "Handle with care", "Transform it", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based ruthenium-focused cuisine?",
    options: ["Ruthenium", "Rare", "Essential", "All ruthenium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most ruthenium-like in spirit?",
    options: ["Stay rare", "Stay essential", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based rhodium-focused cuisine?",
    options: ["Rhodium", "Rare", "Precious", "All rhodium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their rhodium?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based palladium-focused cuisine?",
    options: ["Palladium", "Rare", "Precious", "All palladium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most palladium-like in spirit?",
    options: ["Stay rare", "Stay precious", "Inspire value", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based silver-focused cuisine?",
    options: ["Silver", "Precious", "Shiny", "All silver"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their silver?",
    options: ["Nothing", "Polish it", "Protect it", "Share its brilliance"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cadmium-focused cuisine?",
    options: ["Cadmium", "Toxic", "Soft", "All cadmium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most cadmium-like in spirit?",
    options: ["Stay soft", "Stay aware", "Inspire gentleness", "Help others be gentle"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based indium-focused cuisine?",
    options: ["Indium", "Soft", "Rare", "All indium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their indium?",
    options: ["Nothing", "Cherish its softness", "Use it wisely", "Share its gentleness"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based tin-focused cuisine?",
    options: ["Tin", "Soft", "Essential", "All tin"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most tin-like in spirit?",
    options: ["Stay soft", "Stay essential", "Inspire gentleness", "Help others be gentle"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based antimony-focused cuisine?",
    options: ["Antimony", "Toxic", "Essential", "All antimony"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their antimony?",
    options: ["Nothing", "Handle with care", "Use it wisely", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based tellurium-focused cuisine?",
    options: ["Tellurium", "Rare", "Essential", "All tellurium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most tellurium-like in spirit?",
    options: ["Stay rare", "Stay essential", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based iodine-focused cuisine?",
    options: ["Iodine", "Essential", "Purple", "All iodine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their iodine?",
    options: ["Nothing", "Use it wisely", "Cherish its color", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based xenon-focused cuisine?",
    options: ["Xenon", "Noble", "Inert", "All xenon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most xenon-like in spirit?",
    options: ["Stay noble", "Stay inert", "Inspire nobility", "Help others stay noble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cesium-focused cuisine?",
    options: ["Cesium", "Reactive", "Liquid", "All cesium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their cesium?",
    options: ["Nothing", "Flow with it", "Use it wisely", "Share its fluidity"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based barium-focused cuisine?",
    options: ["Barium", "Heavy", "Essential", "All barium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most barium-like in spirit?",
    options: ["Stay grounded", "Stay essential", "Inspire grounding", "Help others ground"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lanthanum-focused cuisine?",
    options: ["Lanthanum", "Rare", "Essential", "All lanthanum"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their lanthanum?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based cerium-focused cuisine?",
    options: ["Cerium", "Rare", "Essential", "All cerium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most cerium-like in spirit?",
    options: ["Stay rare", "Stay essential", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based praseodymium-focused cuisine?",
    options: ["Praseodymium", "Rare", "Essential", "All praseodymium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their praseodymium?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based neodymium-focused cuisine?",
    options: ["Neodymium", "Rare", "Magnetic", "All neodymium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most neodymium-like in spirit?",
    options: ["Stay magnetic", "Stay rare", "Inspire attraction", "Help others attract"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based promethium-focused cuisine?",
    options: ["Promethium", "Radioactive", "Rare", "All promethium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their promethium?",
    options: ["Nothing", "Handle with care", "Transform it", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based samarium-focused cuisine?",
    options: ["Samarium", "Rare", "Magnetic", "All samarium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most samarium-like in spirit?",
    options: ["Stay magnetic", "Stay rare", "Inspire attraction", "Help others attract"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based europium-focused cuisine?",
    options: ["Europium", "Rare", "Red", "All europium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their europium?",
    options: ["Nothing", "Cherish its color", "Use it wisely", "Share its beauty"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gadolinium-focused cuisine?",
    options: ["Gadolinium", "Rare", "Essential", "All gadolinium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most gadolinium-like in spirit?",
    options: ["Stay rare", "Stay essential", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based terbium-focused cuisine?",
    options: ["Terbium", "Rare", "Green", "All terbium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their terbium?",
    options: ["Nothing", "Cherish its color", "Use it wisely", "Share its beauty"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based dysprosium-focused cuisine?",
    options: ["Dysprosium", "Rare", "Magnetic", "All dysprosium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most dysprosium-like in spirit?",
    options: ["Stay magnetic", "Stay rare", "Inspire attraction", "Help others attract"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based holmium-focused cuisine?",
    options: ["Holmium", "Rare", "Magnetic", "All holmium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their holmium?",
    options: ["Nothing", "Use its magnetism", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based erbium-focused cuisine?",
    options: ["Erbium", "Rare", "Pink", "All erbium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most erbium-like in spirit?",
    options: ["Stay rare", "Stay colorful", "Inspire beauty", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based thulium-focused cuisine?",
    options: ["Thulium", "Rare", "Essential", "All thulium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their thulium?",
    options: ["Nothing", "Cherish its rarity", "Use it wisely", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based ytterbium-focused cuisine?",
    options: ["Ytterbium", "Rare", "Essential", "All ytterbium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most ytterbium-like in spirit?",
    options: ["Stay rare", "Stay essential", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lutetium-focused cuisine?",
    options: ["Lutetium", "Rare", "Heavy", "All lutetium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their lutetium?",
    options: ["Nothing", "Cherish its weight", "Use it wisely", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based hafnium-focused cuisine?",
    options: ["Hafnium", "Rare", "Strong", "All hafnium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most hafnium-like in spirit?",
    options: ["Stay strong", "Stay rare", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based tantalum-focused cuisine?",
    options: ["Tantalum", "Rare", "Strong", "All tantalum"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their tantalum?",
    options: ["Nothing", "Strengthen with it", "Cherish its rarity", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based tungsten-focused cuisine?",
    options: ["Tungsten", "Strong", "Heavy", "All tungsten"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most tungsten-like in spirit?",
    options: ["Stay strong", "Stay heavy", "Inspire strength", "Help others strengthen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based rhenium-focused cuisine?",
    options: ["Rhenium", "Rare", "Strong", "All rhenium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their rhenium?",
    options: ["Nothing", "Strengthen with it", "Cherish its rarity", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based osmium-focused cuisine?",
    options: ["Osmium", "Heavy", "Dense", "All osmium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most osmium-like in spirit?",
    options: ["Stay dense", "Stay heavy", "Inspire depth", "Help others deepen"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based iridium-focused cuisine?",
    options: ["Iridium", "Rare", "Strong", "All iridium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their iridium?",
    options: ["Nothing", "Strengthen with it", "Cherish its rarity", "Share its strength"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based platinum-focused cuisine?",
    options: ["Platinum", "Rare", "Precious", "All platinum"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most platinum-like in spirit?",
    options: ["Stay rare", "Stay precious", "Inspire value", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based gold-focused cuisine?",
    options: ["Gold", "Precious", "Valuable", "All gold"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their gold?",
    options: ["Nothing", "Cherish it", "Protect it", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based mercury-focused cuisine?",
    options: ["Mercury", "Liquid", "Toxic", "All mercury"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most mercury-like in spirit?",
    options: ["Stay fluid", "Stay aware", "Inspire adaptability", "Help others adapt"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based thallium-focused cuisine?",
    options: ["Thallium", "Toxic", "Soft", "All thallium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their thallium?",
    options: ["Nothing", "Handle with care", "Transform it", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lead-focused cuisine?",
    options: ["Lead", "Heavy", "Toxic", "All lead"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most lead-like in spirit?",
    options: ["Stay grounded", "Stay aware", "Inspire grounding", "Help others ground"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bismuth-focused cuisine?",
    options: ["Bismuth", "Heavy", "Colorful", "All bismuth"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bismuth?",
    options: ["Nothing", "Cherish its color", "Use it wisely", "Share its beauty"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based polonium-focused cuisine?",
    options: ["Polonium", "Radioactive", "Rare", "All polonium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most polonium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire caution", "Help others stay safe"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based astatine-focused cuisine?",
    options: ["Astatine", "Rare", "Radioactive", "All astatine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their astatine?",
    options: ["Nothing", "Handle with care", "Transform it", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based radon-focused cuisine?",
    options: ["Radon", "Radioactive", "Gas", "All radon"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most radon-like in spirit?",
    options: ["Stay aware", "Stay cautious", "Inspire safety", "Help others stay safe"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based francium-focused cuisine?",
    options: ["Francium", "Rare", "Radioactive", "All francium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their francium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its lesson"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based radium-focused cuisine?",
    options: ["Radium", "Radioactive", "Glowing", "All radium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most radium-like in spirit?",
    options: ["Stay glowing", "Stay aware", "Inspire light", "Help others shine"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based actinium-focused cuisine?",
    options: ["Actinium", "Radioactive", "Rare", "All actinium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their actinium?",
    options: ["Nothing", "Handle with care", "Activate it", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based thorium-focused cuisine?",
    options: ["Thorium", "Radioactive", "Energy", "All thorium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most thorium-like in spirit?",
    options: ["Stay energetic", "Stay aware", "Inspire energy", "Help others energize"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based protactinium-focused cuisine?",
    options: ["Protactinium", "Rare", "Radioactive", "All protactinium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their protactinium?",
    options: ["Nothing", "Handle with care", "Activate it", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based uranium-focused cuisine?",
    options: ["Uranium", "Radioactive", "Energy", "All uranium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most uranium-like in spirit?",
    options: ["Stay energetic", "Stay aware", "Inspire energy", "Help others energize"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based neptunium-focused cuisine?",
    options: ["Neptunium", "Radioactive", "Rare", "All neptunium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their neptunium?",
    options: ["Nothing", "Handle with care", "Activate it", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based plutonium-focused cuisine?",
    options: ["Plutonium", "Radioactive", "Energy", "All plutonium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most plutonium-like in spirit?",
    options: ["Stay energetic", "Stay aware", "Inspire energy", "Help others energize"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based americium-focused cuisine?",
    options: ["Americium", "Radioactive", "Rare", "All americium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their americium?",
    options: ["Nothing", "Handle with care", "Activate it", "Share its energy"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based curium-focused cuisine?",
    options: ["Curium", "Radioactive", "Rare", "All curium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most curium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based berkelium-focused cuisine?",
    options: ["Berkelium", "Radioactive", "Rare", "All berkelium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their berkelium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based californium-focused cuisine?",
    options: ["Californium", "Radioactive", "Rare", "All californium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most californium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based einsteinium-focused cuisine?",
    options: ["Einsteinium", "Radioactive", "Rare", "All einsteinium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their einsteinium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its genius"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based fermium-focused cuisine?",
    options: ["Fermium", "Radioactive", "Rare", "All fermium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most fermium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire rarity", "Help others recognize value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based mendelevium-focused cuisine?",
    options: ["Mendelevium", "Radioactive", "Rare", "All mendelevium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their mendelevium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nobelium-focused cuisine?",
    options: ["Nobelium", "Radioactive", "Rare", "All nobelium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most nobelium-like in spirit?",
    options: ["Stay noble", "Stay rare", "Inspire nobility", "Help others stay noble"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based lawrencium-focused cuisine?",
    options: ["Lawrencium", "Radioactive", "Rare", "All lawrencium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their lawrencium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based rutherfordium-focused cuisine?",
    options: ["Rutherfordium", "Radioactive", "Rare", "All rutherfordium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most rutherfordium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based dubnium-focused cuisine?",
    options: ["Dubnium", "Radioactive", "Rare", "All dubnium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their dubnium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based seaborgium-focused cuisine?",
    options: ["Seaborgium", "Radioactive", "Rare", "All seaborgium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most seaborgium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based bohrium-focused cuisine?",
    options: ["Bohrium", "Radioactive", "Rare", "All bohrium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their bohrium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based hassium-focused cuisine?",
    options: ["Hassium", "Radioactive", "Rare", "All hassium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most hassium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based meitnerium-focused cuisine?",
    options: ["Meitnerium", "Radioactive", "Rare", "All meitnerium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their meitnerium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based darmstadtium-focused cuisine?",
    options: ["Darmstadtium", "Radioactive", "Rare", "All darmstadtium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most darmstadtium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based roentgenium-focused cuisine?",
    options: ["Roentgenium", "Radioactive", "Rare", "All roentgenium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their roentgenium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based copernicium-focused cuisine?",
    options: ["Copernicium", "Radioactive", "Rare", "All copernicium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most copernicium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based nihonium-focused cuisine?",
    options: ["Nihonium", "Radioactive", "Rare", "All nihonium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their nihonium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based flerovium-focused cuisine?",
    options: ["Flerovium", "Radioactive", "Rare", "All flerovium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most flerovium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based moscovium-focused cuisine?",
    options: ["Moscovium", "Radioactive", "Rare", "All moscovium"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their moscovium?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based livermorium-focused cuisine?",
    options: ["Livermorium", "Radioactive", "Rare", "All livermorium"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most livermorium-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based tennessine-focused cuisine?",
    options: ["Tennessine", "Radioactive", "Rare", "All tennessine"],
    correctIndex: 3,
  },
  {
    text: "What would {name} do if they could change one thing about their tennessine?",
    options: ["Nothing", "Handle with care", "Cherish its rarity", "Share its value"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s favorite type of plant-based oganesson-focused cuisine?",
    options: ["Oganesson", "Radioactive", "Rare", "All oganesson"],
    correctIndex: 3,
  },
  {
    text: "How does {name} handle being the most oganesson-like in spirit?",
    options: ["Stay rare", "Stay aware", "Inspire discovery", "Help others discover"],
    correctIndex: 0,
  },
];

export default function QuestionBuilder({ questions, onUpdateQuestion, onProceedToPreview, creatorName, questionCount = 10 }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [validationError, setValidationError] = useState('');

  const currentQ = questions[currentIdx] || { 
    order: currentIdx + 1,
    text: '',
    options: [
      { text: '', is_correct: true, order: 0 },
      { text: '', is_correct: false, order: 1 },
      { text: '', is_correct: false, order: 2 },
      { text: '', is_correct: false, order: 3 },
    ],
  };

  const handleTextChange = (text) => {
    onUpdateQuestion(currentIdx, { ...currentQ, text });
  };

  const handleOptionChange = (optIdx, text) => {
    const newOptions = [...currentQ.options];
    newOptions[optIdx] = { ...newOptions[optIdx], text };
    onUpdateQuestion(currentIdx, { ...currentQ, options: newOptions });
  };

  const handleSetCorrect = (optIdx) => {
    const newOptions = currentQ.options.map((opt, i) => ({
      ...opt,
      is_correct: i === optIdx,
    }));
    onUpdateQuestion(currentIdx, { ...currentQ, options: newOptions });
  };

  // Generate / Auto-fill content FOR THE CURRENT QUESTION
  // Does NOT jump to next question automatically - creator remains on current question!
  const handleAutoFillCurrentQuestion = () => {
    setValidationError('');
    // Select a random question from the bank to show different questions each time
    const randomIndex = Math.floor(Math.random() * GENERATED_PERSONAL_QUESTIONS_BANK.length);
    const template = GENERATED_PERSONAL_QUESTIONS_BANK[randomIndex];
    const personalizedText = template.text.replace(/{name}/g, creatorName || 'Prem');
    const newOptions = template.options.map((optText, i) => ({
      text: optText,
      is_correct: i === template.correctIndex,
      order: i,
    }));

    onUpdateQuestion(currentIdx, {
      order: currentIdx + 1,
      text: personalizedText,
      options: newOptions,
    });
  };

  const validateQuestionIdx = (idx) => {
    const q = questions[idx] || (idx === currentIdx ? currentQ : null);
    if (!q || !q.text?.trim()) return `Please enter a question for Question ${idx + 1}.`;
    for (let i = 0; i < 4; i++) {
      if (!q.options[i]?.text?.trim()) {
        return `Please fill in Option ${OPTION_LETTERS[i]} for Question ${idx + 1}.`;
      }
    }
    if (!q.options.some((o) => o.is_correct)) {
      return `Please select the correct answer for Question ${idx + 1}.`;
    }
    return null;
  };

  // Save & Next Action - advances to next question only when clicked!
  const handleSaveAndNext = () => {
    setValidationError('');
    const error = validateQuestionIdx(currentIdx);
    if (error) {
      setValidationError(error);
      return;
    }

    if (currentIdx < questionCount - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      for (let i = 0; i < questionCount; i++) {
        const err = validateQuestionIdx(i);
        if (err) {
          setValidationError(err);
          setCurrentIdx(i);
          return;
        }
      }
      onProceedToPreview();
    }
  };

  const isQuestionComplete = (idx) => {
    const q = questions[idx];
    if (!q || !q.text?.trim()) return false;
    if (!q.options || q.options.length !== 4) return false;
    return q.options.every((o) => o.text?.trim()) && q.options.some((o) => o.is_correct);
  };

  const completedCount = questions.filter((_, i) => isQuestionComplete(i)).length;
  const allCompleted = questions.length === questionCount && completedCount === questionCount;

  return (
    <div className="glass-panel p-3 p-sm-4 p-md-5">
      {/* Header & Stepper */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '0.06em' }}>
            QUESTION {currentIdx + 1} OF {questionCount}
          </span>
          <span className="badge bg-secondary bg-opacity-25 text-white-50 fs-6 px-3 py-1">
            {completedCount}/{questionCount} Completed
          </span>
        </div>

        {/* Stepper Buttons: 1 ✓  2 ✓  3 ✓ ... */}
        <div className="d-flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
          {Array.from({ length: questionCount }).map((_, i) => {
            const isCompleted = isQuestionComplete(i);
            const isCurrent = currentIdx === i;
            return (
              <button
                key={i}
                type="button"
                className={`stepper-pill ${isCurrent ? 'stepper-current' : isCompleted ? 'stepper-complete' : 'stepper-pending'}`}
                onClick={() => {
                  setValidationError('');
                  setCurrentIdx(i);
                }}
                id={`stepper-q-${i + 1}`}
              >
                <span>{i + 1}</span>
                {isCompleted && <i className="bi bi-check-lg ms-1"></i>}
              </button>
            );
          })}
        </div>
      </div>

      {validationError && (
        <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
          {validationError}
        </Alert>
      )}

      {/* Question Text Input Header with [+ Add Question] Auto-Fill Button positioned ABOVE (Top Right) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <label className="text-white fw-bold fs-5 mb-0 font-heading">
            Question Text <span className="text-danger">*</span>
          </label>

          {/* Button ABOVE Question Text (Top Right) to auto-fill current question */}
          <button
            type="button"
            className="btn-social-primary py-2 px-3 fs-6"
            onClick={handleAutoFillCurrentQuestion}
            id="autofill-current-q-btn"
            title="Auto-fill this question with a sample question & options"
          >
            <i className="bi bi-magic me-1"></i>
            <span>+ Add Question</span>
          </button>
        </div>

        <input
          type="text"
          className="social-input"
          placeholder={`e.g. What is ${creatorName}'s favorite food?`}
          value={currentQ.text}
          onChange={(e) => handleTextChange(e.target.value)}
          id="builder-question-text"
          autoFocus
        />
      </div>

      {/* 4 Options & Correct Answer Selector */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <label className="text-white fw-bold mb-0 font-heading fs-6">
            Options & Correct Answer <span className="text-danger">*</span>
          </label>
          <span className="text-white-50 small">
            Click [ Mark Correct ] on the correct option
          </span>
        </div>

        <Row className="g-2">
          {currentQ.options.map((opt, optIdx) => {
            const letter = OPTION_LETTERS[optIdx];
            return (
              <Col xs={12} key={optIdx}>
                <div className={`builder-option-row ${opt.is_correct ? 'builder-option-correct' : ''}`}>
                  <div className="builder-option-badge">
                    {letter}
                  </div>

                  <input
                    type="text"
                    className="social-input builder-option-input"
                    placeholder={`Option ${letter} text`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    id={`builder-opt-${optIdx}`}
                  />

                  <button
                    type="button"
                    className={`builder-correct-radio-btn ${opt.is_correct ? 'active' : ''}`}
                    onClick={() => handleSetCorrect(optIdx)}
                    id={`builder-set-correct-${optIdx}`}
                  >
                    <i className={`bi ${opt.is_correct ? 'bi-check-circle-fill text-success fs-5' : 'bi-circle text-muted fs-5'}`}></i>
                    <span className="small">
                      {opt.is_correct ? 'Correct Answer' : 'Mark Correct'}
                    </span>
                  </button>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Navigation Footer - Clean Previous / Save & Next */}
      <div className="d-flex align-items-center justify-content-between gap-3 pt-3 border-top border-secondary border-opacity-25 flex-wrap">
        <button
          type="button"
          className="btn-social-secondary py-2 px-4"
          onClick={() => {
            setValidationError('');
            setCurrentIdx((prev) => Math.max(0, prev - 1));
          }}
          disabled={currentIdx === 0}
        >
          <i className="bi bi-arrow-left me-1"></i>
          <span>Previous</span>
        </button>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* Save & Next / Preview Button */}
          {allCompleted ? (
            <button
              type="button"
              className="btn btn-outline-light py-2 px-3 fw-bold rounded-3"
              onClick={onProceedToPreview}
            >
              <i className="bi bi-eye me-1"></i>
              <span>Preview Quiz (10/10)</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-social-primary py-2 px-4 fs-5"
              onClick={handleSaveAndNext}
              id="builder-next-btn"
            >
              {currentIdx === 9 ? (
                <>
                  <span>Preview All 10 Questions</span>
                  <i className="bi bi-check2-all ms-1"></i>
                </>
              ) : (
                <>
                  <span>Save & Next</span>
                  <i className="bi bi-arrow-right ms-1"></i>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
