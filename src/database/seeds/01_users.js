exports.seed = knex => knex('users').del() // Deletes ALL existing entries
    .then(() => knex('users').insert([ // Inserts seed entries
        {
          id: 1, username: 'KimChi1', fullname: 'Lee ', email: 'KCL1@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa'
        },
        {
          id: 2, username: 'KimChi2', fullname: 'Lee ', email: 'KCL2@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa'
        },
        {
          id: 3, username: 'KimChi3', fullname: 'Lee ', email: 'KCL3@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa'
        },
        {
          id: 4, username: 'ichhoa', fullname: 'IH ', email: 'ichhoa@gmail.com', password: '$2a$10$cuWcGRN8.ecx9a1kO/wUo.H4x1tHHfM/8ZwfPR4YEik1viSqUNxGK'
        } // 123456789
      ]));
