import OpenAI from 'openai';

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
  private async makeRequest(prompt: string, maxTokens: number = 500): Promise<string> {
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
}

export const openaiService = new OpenAIService();
export default openaiService;
