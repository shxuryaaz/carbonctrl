import OpenAI from 'openai';
import { EnvironmentalContext } from './environmentalData';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});

export interface AIResponse {
  content: string;
  type: 'text' | 'quiz' | 'recommendation';
  metadata?: any;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AIInsights {
  carbonFootprint: number;
  recommendations: string[];
  achievements: string[];
  nextGoals: string[];
}

class OpenAIService {
  async makeRequest(prompt: string, maxTokens: number = 500): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert environmental educator and sustainability consultant. Provide helpful, accurate, and engaging responses about environmental topics, climate change, sustainability, and eco-friendly practices. Always be encouraging and educational."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  }

  // AI Tutor - Answer environmental questions
  async askQuestion(question: string): Promise<AIResponse> {
    const prompt = `Answer this environmental question in a friendly, educational way: "${question}". 
    Keep the response under 200 words and include practical tips if relevant.`;
    
    const content = await this.makeRequest(prompt, 300);
    return {
      content,
      type: 'text'
    };
  }

  // Generate personalized quiz questions
  async generateQuiz(topic: string, difficulty: 'easy' | 'medium' | 'hard', userLevel: number): Promise<QuizQuestion[]> {
    const prompt = `Generate 3 ${difficulty} quiz questions about ${topic} for someone at level ${userLevel}. 
    Each question should have 4 multiple choice options. Format as JSON:
    {
      "questions": [
        {
          "question": "Question text",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "Why this answer is correct",
          "difficulty": "${difficulty}"
        }
      ]
    }`;

    try {
      const response = await this.makeRequest(prompt, 800);
      const parsed = JSON.parse(response);
      return parsed.questions || [];
    } catch (error) {
      console.error('Error parsing quiz generation:', error);
      return [];
    }
  }

  // Generate environmental insights and recommendations
  async generateInsights(userActions: any[], userProfile: any): Promise<AIInsights> {
    const actionsSummary = userActions.map(action => `${action.type}: ${action.description}`).join(', ');
    
    const prompt = `Based on these user actions: ${actionsSummary}, and user profile: ${JSON.stringify(userProfile)}, 
    generate personalized environmental insights. Format as JSON:
    {
      "carbonFootprint": estimated_number,
      "recommendations": ["tip1", "tip2", "tip3"],
      "achievements": ["achievement1", "achievement2"],
      "nextGoals": ["goal1", "goal2", "goal3"]
    }`;

    try {
      const response = await this.makeRequest(prompt, 600);
      const parsed = JSON.parse(response);
      return {
        carbonFootprint: parsed.carbonFootprint || 0,
        recommendations: parsed.recommendations || [],
        achievements: parsed.achievements || [],
        nextGoals: parsed.nextGoals || []
      };
    } catch (error) {
      console.error('Error parsing insights:', error);
      return {
        carbonFootprint: 0,
        recommendations: ['Continue your eco-friendly journey!'],
        achievements: ['Great progress so far!'],
        nextGoals: ['Set new environmental goals']
      };
    }
  }

  // Generate contextual insights with real environmental data
  async generateContextualInsights(userProfile: any, environmentalContext: EnvironmentalContext): Promise<AIInsights> {
    const prompt = `Based on user profile: ${JSON.stringify(userProfile)} and current environmental conditions: 
    Weather: ${environmentalContext.weather.condition}, ${environmentalContext.weather.temperature}°C, 
    Air Quality: AQI ${environmentalContext.airQuality.aqi}, 
    Season: ${environmentalContext.season}, Time: ${environmentalContext.timeOfDay},
    Location: ${environmentalContext.location}
    
    Generate personalized environmental insights and recommendations. Return ONLY valid JSON without any markdown formatting or code blocks:
    {
      "carbonFootprint": 150,
      "recommendations": ["contextual_tip1", "contextual_tip2", "contextual_tip3"],
      "achievements": ["achievement1", "achievement2"],
      "nextGoals": ["goal1", "goal2", "goal3"]
    }`;

    try {
      const response = await this.makeRequest(prompt, 800);
      // Clean the response to remove any markdown formatting
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanResponse);
      return {
        carbonFootprint: parsed.carbonFootprint || 0,
        recommendations: parsed.recommendations || [],
        achievements: parsed.achievements || [],
        nextGoals: parsed.nextGoals || []
      };
    } catch (error) {
      console.error('Error parsing contextual insights:', error);
      return {
        carbonFootprint: 0,
        recommendations: ['Continue your eco-friendly journey!'],
        achievements: ['Great progress so far!'],
        nextGoals: ['Set new environmental goals']
      };
    }
  }

  // Generate educational content
  async generateContent(topic: string, contentType: 'article' | 'tips' | 'facts'): Promise<AIResponse> {
    let prompt = '';
    
    switch (contentType) {
      case 'article':
        prompt = `Write a short educational article (150-200 words) about ${topic}. Make it engaging and informative.`;
        break;
      case 'tips':
        prompt = `Provide 5 practical tips for ${topic}. Make them actionable and easy to follow.`;
        break;
      case 'facts':
        prompt = `Share 3 interesting facts about ${topic}. Make them surprising and educational.`;
        break;
    }

    const content = await this.makeRequest(prompt, 400);
    return {
      content,
      type: 'text',
      metadata: { topic, contentType }
    };
  }

  // Generate motivational messages
  async generateMotivation(userProgress: any): Promise<string> {
    const prompt = `Generate a motivational message for someone who has made environmental progress: ${JSON.stringify(userProgress)}. 
    Keep it encouraging and under 100 words.`;

    return await this.makeRequest(prompt, 150);
  }

  // Generate contextual quiz questions with real data
  async generateContextualQuiz(topic: string, environmentalContext: EnvironmentalContext, userLevel: number): Promise<QuizQuestion[]> {
    const prompt = `Generate 3 quiz questions about ${topic} for a user at level ${userLevel}. 
    Use this real environmental data to make questions relevant and current:
    Weather: ${environmentalContext.weather.condition}, ${environmentalContext.weather.temperature}°C
    Air Quality: AQI ${environmentalContext.airQuality.aqi}
    Season: ${environmentalContext.season}
    Location: ${environmentalContext.location}
    
    Return ONLY valid JSON without any markdown formatting or code blocks:
    {
      "questions": [
        {
          "question": "Question text incorporating real data",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "Why this answer is correct with real context",
          "difficulty": "easy"
        }
      ]
    }`;

    try {
      const response = await this.makeRequest(prompt, 1000);
      // Clean the response to remove any markdown formatting
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanResponse);
      return parsed.questions || [];
    } catch (error) {
      console.error('Error parsing contextual quiz:', error);
      return [];
    }
  }

  // Generate smart notifications based on context
  async generateSmartNotifications(userProfile: any, environmentalContext: EnvironmentalContext): Promise<string[]> {
    const prompt = `Generate 3 personalized environmental action reminders for a user with profile: ${JSON.stringify(userProfile)} 
    and current conditions: Weather: ${environmentalContext.weather.condition}, ${environmentalContext.weather.temperature}°C, 
    Air Quality: AQI ${environmentalContext.airQuality.aqi}, Season: ${environmentalContext.season}, 
    Time: ${environmentalContext.timeOfDay}, Location: ${environmentalContext.location}
    
    Make notifications actionable, relevant to current conditions, and encouraging. Return ONLY valid JSON without any markdown formatting or code blocks:
    {
      "notifications": ["notification1", "notification2", "notification3"]
    }`;

    try {
      const response = await this.makeRequest(prompt, 400);
      // Clean the response to remove any markdown formatting
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanResponse);
      return parsed.notifications || [];
    } catch (error) {
      console.error('Error parsing smart notifications:', error);
      return ['Keep up the great environmental work! 🌱'];
    }
  }

  // Generate personalized mission recommendations
  async generatePersonalizedMissions(userProfile: any, environmentalContext: EnvironmentalContext): Promise<any[]> {
    const prompt = `Generate 3 personalized environmental missions for a user with profile: ${JSON.stringify(userProfile)} 
    and current conditions: Weather: ${environmentalContext.weather.condition}, ${environmentalContext.weather.temperature}°C, 
    Air Quality: AQI ${environmentalContext.airQuality.aqi}, Season: ${environmentalContext.season}, 
    Time: ${environmentalContext.timeOfDay}, Location: ${environmentalContext.location}
    
    Make missions feasible for current conditions and user level. Return ONLY valid JSON without any markdown formatting or code blocks:
    {
      "missions": [
        {
          "title": "Mission title",
          "description": "Mission description",
          "difficulty": "easy",
          "points": 50,
          "estimatedTime": "15 minutes",
          "requirements": ["requirement1", "requirement2"],
          "contextualReason": "Why this mission is relevant now"
        }
      ]
    }`;

    try {
      const response = await this.makeRequest(prompt, 800);
      // Clean the response to remove any markdown formatting
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanResponse);
      return parsed.missions || [];
    } catch (error) {
      console.error('Error parsing personalized missions:', error);
      // Return fallback missions
      return [
        {
          title: "Energy Saving Challenge",
          description: "Turn off unnecessary lights and electronics for 1 hour",
          difficulty: "easy",
          points: 30,
          estimatedTime: "5 minutes",
          requirements: ["Access to lights/electronics"],
          contextualReason: "Perfect for current weather conditions"
        },
        {
          title: "Recycling Mission",
          description: "Sort and recycle 5 items from your home",
          difficulty: "medium",
          points: 50,
          estimatedTime: "10 minutes",
          requirements: ["Recyclable items", "Recycling bins"],
          contextualReason: "Great for improving air quality"
        }
      ];
    }
  }

  // Generate environmental impact analysis
  async generateImpactAnalysis(userActions: any[], environmentalContext: EnvironmentalContext): Promise<string> {
    const actionsSummary = userActions.map(action => `${action.type}: ${action.description}`).join(', ');
    
    const prompt = `Analyze the environmental impact of these user actions: ${actionsSummary}
    in the context of current conditions: Weather: ${environmentalContext.weather.condition}, 
    Air Quality: AQI ${environmentalContext.airQuality.aqi}, Season: ${environmentalContext.season}
    
    Provide a detailed analysis of the positive impact and suggest improvements. Keep it under 200 words.`;

    return await this.makeRequest(prompt, 300);
  }
}

export const openaiService = new OpenAIService();
export default openaiService;
