// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
const users = [
  {
    email: 'gregory.house@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Gregory House',
    role: 'Doctor',
  },
  {
    email: 'lisa.cuddy@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Lisa Cuddy',
    role: 'Doctor',
  },
  {
    email: 'james.wilson@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'James Wilson',
    role: 'Doctor',
  },
  {
    email: 'eric.foreman@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Eric Foreman',
    role: 'Doctor',
  },
  {
    email: 'allison.cameron@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Allison Cameron',
    role: 'Doctor',
  },
  {
    email: 'robert.chase@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Robert Chase',
    role: 'Patient',
  },
  {
    email: 'thirteen@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Remy Hadley (Thirteen)',
    role: 'Patient',
  },
  {
    email: 'lawrence.kutner@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Lawrence Kutner',
    role: 'Patient',
  },
  {
    email: 'chris.taub@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Chris Taub',
    role: 'Patient',
  },
  {
    email: 'amelia.warner@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Amelia Warner',
    role: 'Patient',
  },
];


  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    createdUsers.push(createdUser);
  }


  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
