import users from './users'

let data = [
    {
        id: 1,
        roomId: 'ccbf9ef2-5756-4e48-908e-84654ec2ac6d',
        participants: [
            users.get(1),
            users.get(2)
        ],
    },
    {
        id: 2,
        roomId: 'c539ca30-4e64-444d-acdf-47ed45c8b565',
        participants: [
            users.get(1),
            users.get(3)
        ],
    },
    {
        id: 3,
        roomId: '697de16c-6922-4068-8023-369c3747119a',
        participants: [
            users.get(1),
            users.get(4)
        ],
    },
    {
        id: 4,
        roomId: '472efb0f-e862-44f2-ad7b-2fcb637353c3',
        participants: [
            users.get(1),
            users.get(5)
        ],
    },
    {
        id: 5,
        roomId: '5832fac9-f5a8-4168-90bf-e991b336ebf5',
        participants: [
            users.get(1),
            users.get(6)
        ],
    },
]

data.get = function(id) {
    return this.find(c => c.id === id)
}

export default data