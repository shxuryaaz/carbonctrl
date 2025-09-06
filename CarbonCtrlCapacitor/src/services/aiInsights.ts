import { openaiService } from './openai';
import { environmentalDataService, EnvironmentalContext } from './environmentalData';
import { UserProfile } from '../context/AuthContext';

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'achievement' | 'goal' | 'notification' | 'mission';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'energy' | 'waste' | 'transport' | 'water' | 'general';
  points?: number;
  estimatedTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  contextual?: boolean;
  timestamp: Date;
}

export interface PersonalizedInsights {
  insights: AIInsight[];
  environmentalContext: EnvironmentalContext;
  carbonFootprintEstimate: number;
  weeklyProgress: {
    actionsCompleted: number;
    pointsEarned: number;
    carbonSaved: number;
  };
  nextActions: string[];
  motivationalMessage: string;
}

export interface SmartNotification {
  id: string;
  message: string;
  type: 'reminder' | 'achievement' | 'tip' | 'challenge';
  priority: 'low' | 'medium' | 'high';
  category: string;
  actionable: boolean;
  timestamp: Date;
  expiresAt?: Date;
}

class AIInsightsService {
  private insightsCache = new Map<string, PersonalizedInsights>();
  private notificationsCache = new Map<string, SmartNotification[]>();

  // Generate comprehensive personalized insights
  async generatePersonalizedInsights(
    userProfile: UserProfile, 
    userLocation: string = 'New York',
    userActions: any[] = []
  ): Promise<PersonalizedInsights> {
    const cacheKey = `${userProfile.uid}-${userLocation}`;
    
    // Check cache first (cache for 1 hour)
    if (this.insightsCache.has(cacheKey)) {
      const cached = this.insightsCache.get(cacheKey)!;
      const cacheAge = Date.now() - cached.environmentalContext.weather.timestamp.getTime();
      if (cacheAge < 3600000) { // 1 hour
        return cached;
      }
    }

    try {
      // Get environmental context
      const environmentalContext = await environmentalDataService.getEnvironmentalContext(userLocation);
      
      // Generate AI insights
      const aiInsights = await openaiService.generateContextualInsights(userProfile, environmentalContext);
      
      // Generate smart notifications (stored for potential future use)
      await openaiService.generateSmartNotifications(userProfile, environmentalContext);
      
      // Generate personalized missions
      const personalizedMissions = await openaiService.generatePersonalizedMissions(userProfile, environmentalContext);
      
      // Generate motivational message
      const motivationalMessage = await openaiService.generateMotivation({
        ecoScore: userProfile.ecoScore,
        level: userProfile.level,
        badges: userProfile.badges
      });

      // Process insights into structured format
      const insights: AIInsight[] = [
        // AI recommendations
        ...aiInsights.recommendations.map((rec, index) => ({
          id: `rec-${index}`,
          type: 'recommendation' as const,
          title: 'AI Recommendation',
          description: rec,
          priority: 'medium' as const,
          category: this.categorizeInsight(rec),
          contextual: true,
          timestamp: new Date()
        })),
        
        // Achievements
        ...aiInsights.achievements.map((ach, index) => ({
          id: `ach-${index}`,
          type: 'achievement' as const,
          title: 'Achievement Unlocked',
          description: ach,
          priority: 'high' as const,
          category: 'general' as const,
          points: 50,
          contextual: false,
          timestamp: new Date()
        })),
        
        // Goals
        ...aiInsights.nextGoals.map((goal, index) => ({
          id: `goal-${index}`,
          type: 'goal' as const,
          title: 'Next Goal',
          description: goal,
          priority: 'medium' as const,
          category: this.categorizeInsight(goal),
          contextual: true,
          timestamp: new Date()
        })),
        
        // Personalized missions
        ...personalizedMissions.map((mission, index) => ({
          id: `mission-${index}`,
          type: 'mission' as const,
          title: mission.title,
          description: mission.description,
          priority: (mission.difficulty === 'easy' ? 'low' : mission.difficulty === 'medium' ? 'medium' : 'high') as 'low' | 'medium' | 'high',
          category: this.categorizeInsight(mission.description),
          points: mission.points,
          estimatedTime: mission.estimatedTime,
          difficulty: mission.difficulty,
          contextual: true,
          timestamp: new Date()
        }))
      ];

      // Calculate weekly progress (mock data for now)
      const weeklyProgress = {
        actionsCompleted: Math.floor(Math.random() * 10) + 5,
        pointsEarned: Math.floor(Math.random() * 200) + 100,
        carbonSaved: Math.floor(Math.random() * 50) + 20
      };

      const result: PersonalizedInsights = {
        insights,
        environmentalContext,
        carbonFootprintEstimate: aiInsights.carbonFootprint,
        weeklyProgress,
        nextActions: aiInsights.nextGoals,
        motivationalMessage
      };

      // Cache the result
      this.insightsCache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Error generating personalized insights:', error);
      return this.getFallbackInsights(userProfile, userLocation);
    }
  }

  // Generate smart notifications
  async generateSmartNotifications(
    userProfile: UserProfile, 
    userLocation: string = 'New York'
  ): Promise<SmartNotification[]> {
    const cacheKey = `${userProfile.uid}-notifications-${userLocation}`;
    
    // Check cache first
    if (this.notificationsCache.has(cacheKey)) {
      const cached = this.notificationsCache.get(cacheKey)!;
      const cacheAge = Date.now() - cached[0]?.timestamp.getTime();
      if (cacheAge < 1800000) { // 30 minutes
        return cached;
      }
    }

    try {
      const environmentalContext = await environmentalDataService.getEnvironmentalContext(userLocation);
      const notifications = await openaiService.generateSmartNotifications(userProfile, environmentalContext);
      
      const smartNotifications: SmartNotification[] = notifications.map((notification, index) => ({
        id: `notif-${index}`,
        message: notification,
        type: this.determineNotificationType(notification),
        priority: this.determineNotificationPriority(notification),
        category: this.categorizeInsight(notification),
        actionable: this.isActionable(notification),
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }));

      // Cache the result
      this.notificationsCache.set(cacheKey, smartNotifications);
      
      return smartNotifications;
    } catch (error) {
      console.error('Error generating smart notifications:', error);
      return [{
        id: 'fallback-notif',
        message: 'Keep up the great environmental work! 🌱',
        type: 'tip',
        priority: 'low',
        category: 'general',
        actionable: false,
        timestamp: new Date()
      }];
    }
  }

  // Get contextual quiz questions
  async getContextualQuiz(
    topic: string, 
    userProfile: UserProfile, 
    userLocation: string = 'New York'
  ): Promise<any[]> {
    try {
      const environmentalContext = await environmentalDataService.getEnvironmentalContext(userLocation);
      return await openaiService.generateContextualQuiz(topic, environmentalContext, userProfile.level);
    } catch (error) {
      console.error('Error generating contextual quiz:', error);
      return [];
    }
  }

  // Get environmental impact analysis
  async getImpactAnalysis(
    userActions: any[], 
    userLocation: string = 'New York'
  ): Promise<string> {
    try {
      const environmentalContext = await environmentalDataService.getEnvironmentalContext(userLocation);
      return await openaiService.generateImpactAnalysis(userActions, environmentalContext);
    } catch (error) {
      console.error('Error generating impact analysis:', error);
      return 'Your environmental actions are making a positive impact! Keep up the great work! 🌱';
    }
  }

  // Get environmental tips based on current conditions
  async getEnvironmentalTips(userLocation: string = 'New York'): Promise<string[]> {
    try {
      const environmentalContext = await environmentalDataService.getEnvironmentalContext(userLocation);
      return environmentalDataService.getEnvironmentalTips(environmentalContext);
    } catch (error) {
      console.error('Error getting environmental tips:', error);
      return ['Continue your eco-friendly journey! 🌱'];
    }
  }

  // Helper methods
  private categorizeInsight(text: string): 'energy' | 'waste' | 'transport' | 'water' | 'general' {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('energy') || lowerText.includes('electricity') || lowerText.includes('power')) {
      return 'energy';
    }
    if (lowerText.includes('waste') || lowerText.includes('recycle') || lowerText.includes('trash')) {
      return 'waste';
    }
    if (lowerText.includes('transport') || lowerText.includes('car') || lowerText.includes('bike') || lowerText.includes('walk')) {
      return 'transport';
    }
    if (lowerText.includes('water') || lowerText.includes('shower') || lowerText.includes('tap')) {
      return 'water';
    }
    return 'general';
  }

  private determineNotificationType(message: string): 'reminder' | 'achievement' | 'tip' | 'challenge' {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('remind') || lowerMessage.includes('don\'t forget')) {
      return 'reminder';
    }
    if (lowerMessage.includes('congrat') || lowerMessage.includes('achievement') || lowerMessage.includes('unlocked')) {
      return 'achievement';
    }
    if (lowerMessage.includes('challenge') || lowerMessage.includes('try')) {
      return 'challenge';
    }
    return 'tip';
  }

  private determineNotificationPriority(message: string): 'low' | 'medium' | 'high' {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('urgent') || lowerMessage.includes('important') || lowerMessage.includes('now')) {
      return 'high';
    }
    if (lowerMessage.includes('consider') || lowerMessage.includes('suggest')) {
      return 'medium';
    }
    return 'low';
  }

  private isActionable(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    const actionWords = ['turn off', 'turn on', 'use', 'try', 'start', 'stop', 'reduce', 'increase', 'switch'];
    return actionWords.some(word => lowerMessage.includes(word));
  }

  private getFallbackInsights(userProfile: UserProfile, userLocation: string): PersonalizedInsights {
    return {
      insights: [
        {
          id: 'fallback-1',
          type: 'recommendation',
          title: 'General Tip',
          description: 'Continue your eco-friendly journey!',
          priority: 'low',
          category: 'general',
          contextual: false,
          timestamp: new Date()
        }
      ],
      environmentalContext: {
        weather: {
          temperature: 20,
          humidity: 50,
          condition: 'Clear',
          windSpeed: 10,
          location: userLocation,
          timestamp: new Date()
        },
        airQuality: {
          aqi: 50,
          pm25: 15,
          pm10: 25,
          o3: 30,
          no2: 20,
          so2: 10,
          co: 2,
          location: userLocation,
          timestamp: new Date()
        },
        season: 'spring',
        timeOfDay: 'afternoon',
        location: userLocation
      },
      carbonFootprintEstimate: 0,
      weeklyProgress: {
        actionsCompleted: 0,
        pointsEarned: 0,
        carbonSaved: 0
      },
      nextActions: ['Set new environmental goals'],
      motivationalMessage: 'Keep up the great environmental work! 🌱'
    };
  }

  // Clear cache (useful for testing or when user location changes)
  clearCache(userId: string): void {
    const insightsKeys = Array.from(this.insightsCache.keys());
    for (const key of insightsKeys) {
      if (key.startsWith(userId)) {
        this.insightsCache.delete(key);
      }
    }
    const notificationsKeys = Array.from(this.notificationsCache.keys());
    for (const key of notificationsKeys) {
      if (key.startsWith(userId)) {
        this.notificationsCache.delete(key);
      }
    }
  }
}

export const aiInsightsService = new AIInsightsService();
export default aiInsightsService;
