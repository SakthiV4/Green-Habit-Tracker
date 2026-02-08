import Groq from 'groq-sdk';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || 'dummy-key';

// Initialize Groq client
// Note: In a real app, use a proxy to hide the key.
const groq = new Groq({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Required for client-side usage
});

const SYSTEM_PROMPT = `You are EcoGuide, an intelligent sustainability assistant for the EcoTrack app.
Your goal is to help users reduce their carbon footprint, adopt sustainable habits, and find eco-friendly alternatives.
Traits: Encouraging, knowledgeable, practical, and concise.

IMPORTANT: You can perform ACTIONS.
If the user says "I drove 10km" or "I ate a burger", you MUST return a JSON object to log it.
Format: { "action": "log_activity", "category": "transport|food|energy|waste|shopping", "type": "string", "amount": "string", "co2": number, "response": "Short confirmation message" }
Example: { "action": "log_activity", "category": "transport", "type": "car commute", "amount": "10km", "co2": 2.5, "response": "Logged 10km driving (2.5kg CO₂)." }

If it's just a normal chat, return plain text as usual.`;

export const TamboAI = {
    /**
     * Send a message to the AI and get a response
     * @param {Array} history - List of message objects {role: 'user'|'assistant', content: string}
     * @param {String} userMessage - The new message from user
     */
    async chat(history, userMessage) {
        try {
            const messages = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history,
                { role: 'user', content: userMessage }
            ];

            const response = await groq.chat.completions.create({
                messages: messages,
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 1000,
            });

            const content = response.choices[0]?.message?.content || "I couldn't generate a response.";

            // Try to parse JSON action if likely
            if (content.trim().startsWith('{')) {
                try {
                    return JSON.parse(content);
                } catch (e) {
                    return content; // Return as text if parse fails
                }
            }

            return content;
        } catch (error) {
            console.error('Tambo AI (Groq) Error:', error);
            return `Connection Error: ${error.message || error.toString()}`;
        }
    },

    /**
     * Generate a personalized weekly challenge
     */
    async generateChallenge(userProfile) {
        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a gamification expert. Respond ONLY with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: `Generate a creative weekly sustainability challenge for a user with footprint: ${userProfile?.totalCarbon || 'average'} kg CO2/year. 
                        Return ONLY valid JSON with keys: title, description, impact (string), difficulty (easy/medium/hard), category (transport/food/energy/waste/shopping).`
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.5,
                max_tokens: 500,
                response_format: { type: 'json_object' } // Groq supports JSON mode
            });

            const text = response.choices[0]?.message?.content;
            return JSON.parse(text);
        } catch (error) {
            console.error('Challenge Gen Error:', error);
            return {
                title: "Meatless Monday",
                description: "Go meat-free for one day to save water and reduce emissions.",
                impact: "Save ~2kg CO2",
                difficulty: "easy",
                category: "food"
            };
        }
    },

    /**
     * Find sustainable alternatives for a product
     */
    async generateAlternatives(productName) {
        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an eco-shopping expert. Respond ONLY with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: `Suggest 3 sustainable alternatives to "${productName}". 
                        Return ONLY valid JSON array with keys: 
                        - name
                        - description
                        - carbonSavings (string, e.g. "20%")
                        - priceRange ($/$$/$$$)
                        - sustainablePrice (number, estimated price of this echo-product)
                        - conventionalPrice (number, estimated price of the standard non-eco product)
                        Wrap the array in an object: { "alternatives": [...] }`
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.5,
                max_tokens: 800,
                response_format: { type: 'json_object' }
            });

            const text = response.choices[0]?.message?.content;
            const data = JSON.parse(text);
            return data.alternatives || [];
        } catch (error) {
            console.error('Alternatives Error:', error);
            // Fallback for alternatives
            return [
                {
                    name: "Bamboo Toothbrush",
                    description: "Biodegradable alternative to plastic brushes.",
                    carbonSavings: "30%",
                    priceRange: "$$",
                    sustainablePrice: 4.50,
                    conventionalPrice: 2.00
                },
                {
                    name: "Glass Container",
                    description: "Reusable and plastic-free storage.",
                    carbonSavings: "15%",
                    priceRange: "$$",
                    sustainablePrice: 12.99,
                    conventionalPrice: 8.99
                },
                {
                    name: "Beeswax Wrap",
                    description: "Natural alternative to plastic cling wrap.",
                    carbonSavings: "25%",
                    priceRange: "$$$",
                    sustainablePrice: 18.00,
                    conventionalPrice: 5.00
                }
            ];
        }
    },

    /**
     * Find sustainable businesses in a specific location
     */
    async findLocalBusinesses(location) {
        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a local guide for sustainable living. Respond ONLY with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: `Find 3 sustainable businesses matching query: "${location}".
                        Logic:
                        1. If query is just a place (e.g. "Chennai"), list diverse eco-businesses there.
                        2. If query asks for specific item (e.g. "Chicken in Irungalur", "Clothes in London"), list ONLY businesses selling that item.
                        
                        Return ONLY valid JSON array with keys: id (number), name, category, rating (4.0-5.0), distance (string), ecoScore (80-100), features (array).
                        Wrap the array in an object: { "businesses": [...] }`
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 1000,
                response_format: { type: 'json_object' }
            });

            const text = response.choices[0]?.message?.content;
            const data = JSON.parse(text);
            return data.businesses || [];
        } catch (error) {
            console.error('Local Biz Error:', error);
            // Fallback mock data so the UI is never empty
            return [
                {
                    id: 1,
                    name: "Green Earth Grocery",
                    category: "Grocery",
                    rating: 4.8,
                    distance: "0.8 km",
                    ecoScore: 95,
                    features: ["Zero Waste", "Organic", "Plastic Free"],
                    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60"
                },
                {
                    id: 2,
                    name: "EcoStyle Boutique",
                    category: "Shopping",
                    rating: 4.5,
                    distance: "1.2 km",
                    ecoScore: 88,
                    features: ["Sustainable Materials", "Fair Trade"],
                    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=60"
                },
                {
                    id: 3,
                    name: "Urban Harvest Cafe",
                    category: "Food",
                    rating: 4.7,
                    distance: "2.1 km",
                    ecoScore: 92,
                    features: ["Farm-to-Table", "Vegan Options"],
                    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60"
                }
            ];
        }
    }
};
