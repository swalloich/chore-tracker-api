const swaggerAutogen = require('swagger-autogen')()

/*
 * live url: fantastic-parakeet-ogz0.onrender.com
 * local url: localhost:8080
 */
const doc = {
  info: {
    title: 'Chore Tracker API',
    description: 'API for tracking chores',
  },
  host: 'fantastic-parakeet-ogz0.onrender.com',
  schemes: ['https'],
  definitions: {
    NewChore: {
      $name: 'Take out the trash',
      collectionId: 'collection_id',
      description: 'The trash needs to be taken out',
      frequency: '1w',
      $nextDue: '3000-02-09T19:00:00-07:00',
      $currentAssignee: 'user_id',
      $assignedUsers: ['user_id'],
    },
    Chore: {
      name: 'Take out the trash',
      collectionId: 'collection_id',
      description: 'The trash needs to be taken out',
      frequency: '1w',
      nextDue: '3000-02-09T19:00:00-07:00',
      currentAssignee: 'user_id',
      assignedUsers: ['user_id'],
    },
    NewCollection: {
      $name: 'Kitchen Chores',
      description: 'Chores for the kitchen',
      chores: ['chore_id'],
    },
    Collection: {
      name: 'Kitchen Chores',
      description: 'Chores for the kitchen',
      chores: ['chore_id'],
    },
    NewUser: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'john.doe@example.com',
      $password: 'password',
    },
    User: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
    },
  },
}

const outputFile = './swagger_output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)
