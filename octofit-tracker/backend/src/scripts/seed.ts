/**
 * Seed the octofit_db database with test data
 * 
 * This script populates the OctoFit Tracker database with realistic sample data
 * for testing and development purposes.
 * 
 * Usage: npm run seed
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const sampleUsers = [
  {
    username: 'alex_runner',
    email: 'alex@example.com',
    profile: {
      firstName: 'Alex',
      lastName: 'Johnson',
      bio: 'Marathon enthusiast',
    },
  },
  {
    username: 'samantha_fit',
    email: 'samantha@example.com',
    profile: {
      firstName: 'Samantha',
      lastName: 'Lee',
      bio: 'CrossFit addict',
    },
  },
  {
    username: 'mike_gym',
    email: 'mike@example.com',
    profile: {
      firstName: 'Mike',
      lastName: 'Chen',
      bio: 'Weight training expert',
    },
  },
  {
    username: 'jordan_yoga',
    email: 'jordan@example.com',
    profile: {
      firstName: 'Jordan',
      lastName: 'Smith',
      bio: 'Yoga instructor and wellness coach',
    },
  },
];

const sampleActivities = [
  { type: 'Running', duration: 45, distance: 7.5, calories: 620 },
  { type: 'Cycling', duration: 60, distance: 25, calories: 480 },
  { type: 'Swimming', duration: 40, distance: 1.5, calories: 420 },
  { type: 'Weight Training', duration: 90, calories: 510 },
  { type: 'HIIT', duration: 30, calories: 380 },
  { type: 'Yoga', duration: 60, calories: 240 },
  { type: 'Hiking', duration: 120, distance: 8, calories: 720 },
];

const sampleWorkouts = [
  {
    title: 'Morning Run',
    description: 'Easy pace 5K run',
    exercices: ['warm-up jog', '5K run', 'cool-down walk'],
    difficulty: 'easy',
  },
  {
    title: 'HIIT Blast',
    description: 'High-intensity interval training',
    exercices: ['burpees', 'mountain climbers', 'jump squats', 'push-ups'],
    difficulty: 'hard',
  },
  {
    title: 'Upper Body Strength',
    description: 'Focus on chest, shoulders, and arms',
    exercices: ['bench press', 'shoulder press', 'barbell rows', 'bicep curls'],
    difficulty: 'medium',
  },
  {
    title: 'Beginner Yoga',
    description: 'Gentle yoga for flexibility',
    exercices: ['sun salutation', 'cat-cow', 'warrior poses', 'child pose'],
    difficulty: 'easy',
  },
  {
    title: 'Cycling Endurance',
    description: 'Long-distance cycling session',
    exercices: ['warm-up ride', 'steady-state cycling', 'cool-down'],
    difficulty: 'medium',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to octofit_db');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create teams
    console.log('🏆 Creating teams...');
    const team1 = await Team.create({
      name: 'Cardio Crusaders',
      description: 'A team focused on running and endurance',
      leaderId: createdUsers[0]._id,
      members: [createdUsers[0]._id, createdUsers[1]._id],
    });

    const team2 = await Team.create({
      name: 'Strength Squad',
      description: 'Building muscle and power',
      leaderId: createdUsers[2]._id,
      members: [createdUsers[2]._id, createdUsers[3]._id],
    });
    console.log('✅ Created 2 teams');

    // Create activities
    console.log('🏃 Creating activities...');
    const activitiesToCreate = [];
    for (let i = 0; i < createdUsers.length; i++) {
      for (let j = 0; j < 3; j++) {
        const activityTemplate =
          sampleActivities[Math.floor(Math.random() * sampleActivities.length)];
        activitiesToCreate.push({
          userId: createdUsers[i]._id,
          type: activityTemplate.type,
          duration: activityTemplate.duration,
          distance: activityTemplate.distance,
          calories: activityTemplate.calories,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        });
      }
    }
    await Activity.insertMany(activitiesToCreate);
    console.log(`✅ Created ${activitiesToCreate.length} activities`);

    // Create leaderboard entries
    console.log('📊 Creating leaderboard entries...');
    const leaderboardEntries = createdUsers.map((user, index) => ({
      userId: user._id,
      teamId: index < 2 ? team1._id : team2._id,
      points: Math.floor(Math.random() * 5000) + 1000,
      rank: index + 1,
    }));
    await Leaderboard.insertMany(leaderboardEntries);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create workouts
    console.log('💪 Creating workouts...');
    const workoutsToCreate = [];
    for (let i = 0; i < createdUsers.length; i++) {
      for (let j = 0; j < 2; j++) {
        const workoutTemplate =
          sampleWorkouts[Math.floor(Math.random() * sampleWorkouts.length)];
        workoutsToCreate.push({
          userId: createdUsers[i]._id,
          title: workoutTemplate.title,
          description: workoutTemplate.description,
          exercices: workoutTemplate.exercices,
          difficulty: workoutTemplate.difficulty,
        });
      }
    }
    await Workout.insertMany(workoutsToCreate);
    console.log(`✅ Created ${workoutsToCreate.length} workouts`);

    console.log('\n✨ Database seed completed successfully!');
    console.log(`📍 Database: octofit_db`);
    console.log(`📈 Sample data: Users (${createdUsers.length}), Teams (2), Activities (${activitiesToCreate.length}), Workouts (${workoutsToCreate.length})`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run seed script
seedDatabase();
