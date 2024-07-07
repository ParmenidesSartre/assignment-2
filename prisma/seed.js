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
    role: 'Doctor',
  },
  {
    email: 'thirteen@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Remy Hadley (Thirteen)',
    role: 'Doctor',
  },
  {
    email: 'lawrence.kutner@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Lawrence Kutner',
    role: 'Doctor',
  },
  {
    email: 'chris.taub@example.com',
    password: '$2a$10$hrWU3/0l9dVsh3oTpXG6suF3khFVRb14OpK4BL.TKyIkB4ZDDebi2',
    name: 'Chris Taub',
    role: 'Doctor',
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


  const medicalRecords = [
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[0].id, // Gregory House
      diagnosis: 'Common Cold',
      treatmentPlan: 'Rest and hydration, Vitamin C',
      medications: 'Vitamin C 500mg daily',
      followUp: new Date('2024-07-10T10:00:00Z'),
      notes: 'Patient is advised to avoid strenuous activities.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[1].id, // Lisa Cuddy
      diagnosis: 'Sprained Ankle',
      treatmentPlan: 'Rest, Ice, Compression, Elevation',
      medications: 'Ibuprofen 400mg as needed',
      followUp: new Date('2024-07-12T10:00:00Z'),
      notes: 'Patient is advised to use crutches.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[2].id, // James Wilson
      diagnosis: 'Back Pain',
      treatmentPlan: 'Physical therapy, pain management',
      medications: 'Paracetamol 500mg as needed',
      followUp: new Date('2024-07-15T10:00:00Z'),
      notes: 'Patient is advised to follow a strict physical therapy regimen.',
      allergies: 'Penicillin',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[3].id, // Eric Foreman
      diagnosis: 'Migraine',
      treatmentPlan: 'Rest in a dark room, hydration, pain relief',
      medications: 'Sumatriptan 50mg as needed',
      followUp: new Date('2024-07-20T10:00:00Z'),
      notes: 'Patient is advised to avoid bright lights and loud noises.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[4].id, // Allison Cameron
      diagnosis: 'Asthma',
      treatmentPlan: 'Inhaler use as needed, avoid triggers',
      medications: 'Albuterol inhaler as needed',
      followUp: new Date('2024-07-25T10:00:00Z'),
      notes: 'Patient is advised to carry inhaler at all times.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[5].id, // Robert Chase
      diagnosis: 'Allergic Rhinitis',
      treatmentPlan: 'Avoid allergens, use nasal spray',
      medications: 'Fluticasone nasal spray daily',
      followUp: new Date('2024-07-30T10:00:00Z'),
      notes: 'Patient is advised to monitor symptoms and avoid allergens.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[6].id, // Remy Hadley (Thirteen)
      diagnosis: 'Hypertension',
      treatmentPlan: 'Lifestyle changes, medication',
      medications: 'Lisinopril 10mg daily',
      followUp: new Date('2024-08-05T10:00:00Z'),
      notes: 'Patient is advised to monitor blood pressure regularly.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[7].id, // Lawrence Kutner
      diagnosis: 'Diabetes Mellitus Type 2',
      treatmentPlan: 'Dietary changes, exercise, medication',
      medications: 'Metformin 500mg twice daily',
      followUp: new Date('2024-08-10T10:00:00Z'),
      notes: 'Patient is advised to monitor blood sugar levels regularly.',
      allergies: 'None',
    },
    {
      patientId: createdUsers[9].id, // Amelia Warner
      doctorId: createdUsers[8].id, // Chris Taub
      diagnosis: 'Hyperlipidemia',
      treatmentPlan: 'Dietary changes, medication',
      medications: 'Atorvastatin 20mg daily',
      followUp: new Date('2024-08-15T10:00:00Z'),
      notes: 'Patient is advised to follow a low-fat diet.',
      allergies: 'None',
    },
  ];
  

  for (const record of medicalRecords) {
    await prisma.medicalRecord.create({
      data: record,
    });
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
